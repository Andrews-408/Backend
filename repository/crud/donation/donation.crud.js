const Donations = require("../../../models/donationModel");
const sendMail = require("../../../Utils/email")


// create a new donation by user()
async function createNewDonation(req){
   try { 
        const newDonation = await Donations.create(req.body);

        if(newDonation === null){
            return {
                status: 'failed',
                message: 'unable to create donation'
            }
        }
        
        await sendMail({
                email: newDonation.organisationEmail,
                subject: `@${newDonation.donatedBy} Expresses Interest in Supporting Your Campaign`,
                message: `<div>
                                <div>Dear ${newDonation.donatedTo}</div>
                                We are thrilled to inform you that @${newDonation.donatedBy} has expressed a keen interest in supporting your campaign! 
                                We want to share this exciting news with you right away.To view the donation details and further engage with @${newDonation.donatedBy}, 
                                please click the link http://localhost:3000/login 
                                Thank you.       
                          </div>
                          `
            });

        return {
            status: "success",
            message: "donation created successfully",
            data : newDonation
        };
        }catch(err){
            return{
                status: "error",
                message: "An error occured, please try again",
            };
        }
    }
        
// get donations for a campaign 
async function getCampaignDonations(req){
    try{
        const result = await Donations.find({campaignId: req.params.campaignId});
        return {
            status: "success",
            message: "successfully retrieved donations",
            results : result.length,
            data: result
            }
        }
        catch(err){
            return{
            status: "error",
            message: "an error has occurred, please try again"
        } 
}
}
// get all donations
async function getAllDonations(skip = 0, limit = 50) {
    const offset = skip * limit;
    try{
        const result = await Donations.find().skip(offset).limit(limit);
        return {
            status: "success",
            message: "successfully retrieved donations",
            results : result.length,
            data: result
    
    }
   
}
    catch(err){
        return{
            status: "error",
            message: "an error has occurred, please try again"
        }

}
}

// get a donation by donationId
async function getDonationDetails(req){
    try{
        const result = await Donations.findOne({donationId: req.params.donationId})
        if(result === null){
            return {status : "failed" , message: "donation not found"}
        }
        return {
            status : "success",
            message: "donation found",
            data : result
        }
    }catch(error){
        return {status : "error" , message : "an error occured, please try again"}
    }
}



// accept donation
async function acceptDonation(req){
    try{
       
        const result = await Donations.findOneAndUpdate({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Accepted"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        

        await sendMail({
            email: result.donorEmail,
            subject: ` Your Donation to Support ${result.donatedTo} has been accepted`,
            message: `
                         <div>
                                <div>Dear ${result.donatedBy}</div>
                                <div>
                                Good news! Your donation attempt to support ${result.donatedTo} has been approved. 
                                We sincerely appreciate your generosity and commitment to our cause.
                                To proceed with the delivery, kindly log in here: http://localhost:3000/login
                                Please provide detailed information about the package to ensure a smooth delivery process.
                                </div>
                                <div>Thank you for making a difference!</div>
                                
                                <div>Best regards,</div>
                                <div>CareToShare </div>
          
                          </div>`
        });


        return {
            status : "success",
            message : "Donation accepted successfully"
        }
    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

// reject donation
async function rejectDonation(req){
    try{
        const result = await Donations.findOneAndUpdate({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Rejected"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        await sendMail({
            email: result.donorEmail,
            subject: 'Donation rejected',
            message: `<p>${result.donatedTo} has rejected your donation. We are sorry for the inconvenience.</p>`
        });

       
        return {
            status : "success",
            message : "Donation rejected successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

//deliver donation
async function deliverDonation(req){
    try{
        const result = await Donations.findOneAndUpdate({donationId : req.params.donationId}, 
            {$set : {delivered : true} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }

        await sendMail({
            email: result.organisationEmail,
            subject: 'Delivery of donation in Progress',
            message: `<p>@${result.donatedBy} has delivered the donation. Thank you.</p>`
        });

        
        return {
            status : "success",
            message : "Donation received successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}


// receive donation
async function receiveDonation(req){
    try{
        const result = await Donations.findOneAndUpdate({donationId : req.params.donationId}, 
            {$set : {received : true} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }

        await sendMail({
            email: result.donorEmail,
            subject: 'Donation received',
            message: `<p>${result.donatedTo} has received your donation. Thank you for your support.</p>`
        });

        
        
        return {
            status : "success",
            message : "Donation received successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}



//update donation
async function updateDonation(req){
    try{
        const donation = await Donations.findOneAndUpdate({donationId: req.params.donationId}, req.body, {
            new: true,
            runValidators: true
        });
        if(donation === null){
            return {status : "failed" , message : "Failed to update donation"}
        }
        return {
            status : "success",
            message : "donation updated successfully",
            update : donation
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}


module.exports = {
    getAllDonations,
    getDonationDetails,
    acceptDonation,
    updateDonation,
    createNewDonation,
    getCampaignDonations,
    receiveDonation,
    deliverDonation,
    rejectDonation
}