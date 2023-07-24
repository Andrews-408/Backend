const nodemailer = require('nodemailer')

const sendEmail = async options => {
    // define transport
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        }
    })

    //define the email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: options.email,
        subject: options.subject,
        text : options.message,
        html : options.message
    }


    // actuall send the email

    await transporter.sendMail(mailOptions);
}

module.exports = sendEmail;