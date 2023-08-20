const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD
    }
});

const sendWelcomeEmail = (email, name) => {
    transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Thanks for joining in",
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`
    }, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent with info => ", info);
        }
    });
}

const sendCancelationEmail = (email, name) => {
    transporter.sendMail({
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Sorry to see you go!",
        text: `GoodBye ${name}. I hope to see you again`
    }, (err, info) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent with info => ", info);
        }
    });
}

module.exports = { sendWelcomeEmail, sendCancelationEmail };