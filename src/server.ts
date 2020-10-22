import {SMTPServer} from "smtp-server";
import {simpleParser} from "mailparser";
import {sendEmail} from "./services/sendMail";

const serverIP = process.env.serverIP;
console.log(serverIP)

const server = new SMTPServer({
    onData(stream, session, callback) {
        simpleParser(stream, {}, async (err, parsed) => {
            if (err){
                console.log("Error:" , err);
            } else {
                const email = "Sender: " + parsed.from?.value + " /Subject: " + parsed.subject + " / Text: " + parsed.text;
                await sendEmail("ksabahi2001@gmail.com", "Email from Curli", email, () => {
                    console.log("Email sent")
                });
                console.log(parsed);
                console.log(parsed.headerLines)
                stream.on("end", callback);
            }
        });
    },
    disabledCommands: ['AUTH']
});

server.listen(25, serverIP, () => {
    console.log("server is up and running")
});