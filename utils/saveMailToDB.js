const User = require('../models/user');

async function saveMessage(parsedEmail) {
    const { from, to, subject, text, html } = parsedEmail;
    await User.findOneAndUpdate(
        { email: to.text || to.value[0].address },
        {
            $push: {
                messages: {
                    from: from.text || from.value[0].address,
                    to: to.text || to.value[0].address,
                    subject,
                    text,
                    html
                }
            }
        },
        { upsert: true, new: true }
    );
}

module.exports = saveMessage;