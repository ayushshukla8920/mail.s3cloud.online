const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    from: String,
    to: String,
    subject: String,
    text: String,
    html: String,
    receivedAt: {
        type: Date,
        default: Date.now
    }
});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    messages: [messageSchema]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
