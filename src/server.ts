import {SMTPServer} from "smtp-server";
import {simpleParser} from "mailparser";

const server = new SMTPServer({
    onData(stream, session, callback) {
        simpleParser(stream, {}, (err, parsed) => {
            if (err){
                console.log("Error:" , err);
            } else {
                console.log(parsed);
                stream.on("end", callback);
            }
        });
    },
    disabledCommands: ['AUTH']
});

server.listen(25, "");