const twilio = require("twilio")

const sendSMS = () => {
    const client = new twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN)
    
    return client.messages
                .create({body: "From careToShare", from: '+13613227940', to: '0247668944'})
                .then(message => console.log("message sent"))
                .catch(error => console.log(error))
}


module.exports = sendSMS