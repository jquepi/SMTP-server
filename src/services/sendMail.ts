import nodeMailer from "nodemailer";
const transporter = nodeMailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'info@curli.ir',
    }
});

export const sendEmail = async (to: string, subject: string, text: string, cb: any) => {
    const mailOptions = { from: process.env.emailAddress, to, subject, text };
    await transporter.sendMail(mailOptions, cb);
}
