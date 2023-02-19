const mailer = require("nodemailer")


async function emailverify(subject, description, email) {
    const transport = mailer.createTransport({
        service: "gmail",
        auth: {
            user: "scincefreak60@gmail.com",
            pass: "xbouxkxndfgoemlv"

        }
    })
    const msg = {

        from: "scincefreak60@gmailcom",
        to: email,
        subject: subject,
        text: description
    }

    transport.sendMail(msg, (error, info) => {
        if (error) {
            return ("error")
        } else {
            return "email sent:" + info.response
        }
    })
}


module.exports = {
    emailverify
}