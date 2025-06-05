const { SMTPServer } = require("smtp-server");
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,
    onConnect(session, cb) {
        console.log("New Connection: ", session.id);
        cb();
    },
    onMailFrom(address, session, cb) {
        console.log("New Mail from: ", address.address, " at: ", session.id);
        cb();
    },
    onRcptTo(address, session, cb) {
        console.log("Mail at: ", address.address, " at: ", session.id);
        cb();
    },
    onData(stream, session, cb) {
        let rawData = "";

        stream.on("data", (chunk) => {
            rawData += chunk.toString(); // Collect full message
        });

        stream.on("end", () => {
            console.log("Data at:", session.id, "\n", rawData); // Log full message
            cb(); // MUST call after reading entire stream
        });

        stream.on("error", (err) => {
            console.error("Stream error:", err);
            cb(err);
        });
    }

});

server.listen(25, () => {
    console.log("SMTP Server is Online...");
})