const nodemailer = require("nodemailer");
require("dotenv").config()

module.exports = async (email, link, username) => {

    const transporter = nodemailer.createTransport({

        service: 'gmail',

        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
    });
    try {
        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM,
            to: email,
            subject: "Account Verification",
            text: "Welcome",
            html: `
            <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px;">
    <div style="text-align: center;">
        <p style="font-size: 24px;"><b>Rileys Alert</b></p>
        <p style="font-size: 26px; font-weight: 600; padding-top: 30px;">Hi ${username},</p>
        <p style="font-size: 22px;">Please verify your email address<br>now to start using Rileys Alert.</p>
        <a href="${link}" style="display: inline-block; padding: 10px 20px; font-size: 20px; background-color: #FF0000; color: #000000; text-decoration: none; border-radius: 10px; box-shadow: -3px 3px 0px 0px 0px; margin-top: 30px;">Verify Email</a>

        <p style="font-size: 14px; padding-top: 30px;">If you did not enter this email address when signing up for  Rileys Alert,<br>disregard this message.</p>
        <p style="font-size: 14px;">This is a mandatory service email from Rileys Alert</p>
    </div>
</div>

                        `
        });
        return true;
    } catch (error) {
        console.log("email not sent!");
        console.log(error);
        return false;
    }


};
