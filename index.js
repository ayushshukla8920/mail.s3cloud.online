//Importing Required Libraries
const { SMTPServer } = require("smtp-server");
const { simpleParser } = require('mailparser');
const express = require('express');
const mongoose = require('mongoose');
const saveMessage = require('./utils/saveMailToDB');
const User = require('./models/user');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();


//Database Connection
mongoose.connect(process.env.MONGOURL)
    .then(() => console.log("Database Connected Successfully !!"))
    .catch(err => console.log("Database Connection Error: ", err));


//SMTP and HTTP Server Setups
const app = express();
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        cb();
    },
    onMailFrom(address, session, cb) {
        cb();
    },
    onRcptTo(address, session, cb) {
        const recipientEmail = address.address.toLowerCase();
        User.findOne({ email: recipientEmail })
            .then(user => {
                if (!user) {
                    console.warn(`Email rejected: No user found for ${recipientEmail}`);
                    return cb(new Error('550 User not found'));
                }
                return cb();
            })
            .catch(err => {
                console.error("DB Error while checking recipient:", err);
                cb(new Error('451 Temporary server error'));
            });
    },
    onData(stream, session, cb) {
        simpleParser(stream)
            .then(async parsed => {
                console.log("📨 Received email:", parsed.subject);
                await saveMessage(parsed);  // Save to DB
                cb();
            })
            .catch(err => {
                console.error("Failed to parse email:", err);
                cb(err);
            });
    }
});


//Express Middlewares
app.use(express.json());
app.use(express.static(path.join(__dirname, 'client/dist')));
app.use(cookieParser());


//HTTP API Routes

//Validate if the user is already logged in...
app.get('/auth', (req, res, next) => {
    const token = req.cookies._authtoken;
    if (token) {
        return res.redirect('/');
    }
    next();
});

//Route for Validating user authorisation
app.get('/check-auth', (req, res) => {
    const authtoken = req.cookies._authtoken;
    try {
        const decoded = jwt.verify(authtoken, process.env.JWTSECRET);
        return res.status(200).json({msg: "OK"});
    } catch (err) {
        res.clearCookie('_authtoken', { httpOnly: true, path: '/' });
        return res.status(401).json({err: "Unauthorised"});
    }
})

app.get('/{*any}', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});

app.post("/api/accounts/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" })
        }
        const result = await User.findOne({ email });
        if (!result) {
            return res.status(400).json({ error: "This account doesn't exists" });
        }
        const isAuthorised = bcrypt.compareSync(password, result.password);
        if (!isAuthorised) {
            return res.status(401).json({ error: "Incorrect password" });
        }
        const token = jwt.sign({ email }, process.env.JWTSECRET);
        res.cookie('_authtoken', token, {
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
        });
        return res.status(200).json({ msg: "Auth Successful" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

app.post("/api/accounts/create", async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ error: "Name,email and password are required" })
        }
        const result = await User.findOne({ email });
        if (result) {
            return res.status(401).json({ error: "This account already exists" });
        }
        const hash = bcrypt.hashSync(password, salt);
        await User.create({ name, email, password: hash });
        const token = jwt.sign({ email }, process.env.JWTSECRET);
        res.cookie('_authtoken', token, {
            httpOnly: true,
            maxAge: 365 * 24 * 60 * 60 * 1000
        });
        return res.status(201).json({ msg: "Creation Successful" });
    }
    catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
});

//Listening Server on Different Ports
server.listen(25, () => {
    console.log("SMTP Server is Online on PORT 25 ...");
})
app.listen(800, () => {
    console.log("Mail Client Server is Online on PORT 800 ...");
})