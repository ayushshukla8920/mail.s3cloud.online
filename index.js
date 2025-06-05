const { SMTPServer } = require("smtp-server");
const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true, 
    onConnect(session,cb){
        console.log("New Connection: ",session.id);
        cb();
    },
    onMailFrom(address, session, cb){
        console.log("New Mail from: ",address.address," at: ",session.id);
        cb();
    },
    onRcptTo(address, session, cb){
        console.log("Mail at: ",address.address," at: ",session.id);
    },
    onData(stream, session, cb){
        stream.on('data',(data)=>{
            console.log("Data at: ",session.id,"\n",data.toString());
        })
        stream.on('end',cb());
    }
});

server.listen(25,()=>{
    console.log("SMTP Server is Online...");
})