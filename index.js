//Importing Required Libraries
const { SMTPServer } = require("smtp-server");
const { simpleParser } = require('mailparser');
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const saveMessage = require('./utils/saveMailToDB');
const User = require('./models/user');


//Database Connection
mongoose.connect(process.env.MONGOURL)
.then(()=>console.log("Database Connected Successfully !!"))
.catch(err=>console.log("Database Connection Error: ",err));

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
                console.warn(`⛔ Email rejected: No user found for ${recipientEmail}`);
                return cb(new Error('550 User not found'));
            }
            return cb();
        })
        .catch(err => {
            console.error("❌ DB Error while checking recipient:", err);
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
            console.error("❌ Failed to parse email:", err);
            cb(err);
        });
    }
});


//Listening Server on Different Ports
server.listen(25, () => {
    console.log("SMTP Server is Online on PORT 25 ...");
})
app.listen(800,()=>{
    console.log("Mail Client Server is Online on PORT 800 ...");
})