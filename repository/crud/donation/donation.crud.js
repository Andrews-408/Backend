const Donations = require("../../../models/donationModel");


// create a new donation by user()
async function createNewDonation(req){
   try { 
          const newDonation = await Donations.create({
            donatedBy: req.body.donatedBy,
            donationId: req.body.donationId,
            campaignId: req.body.campaignId,
            donorEmail: req.body.donorEmail,
            organisationEmail: req.body.organisationEmail,
            description: req.body.description,
            location: req.body.location,
            itemPhoto: req.body.itemPhoto,
            quantity: req.body.quantity,
            donatedTo : req.body.donatedTo,
            contact : req.body.contact
          });

        if(newDonation === null){
            return {
                status: 'failed',
                message: 'unable to create donation'
            }
        }
        return {
            status: "success",
            message: "donation created successfully",
            data : newDonation
        };
        }catch(err){
            console.log(err)
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
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Completed"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "Donation accepted successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

// receive donation
async function receiveDonation(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, 
            {$set : {donationStatus : "Received"} , });
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
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
    getCampaignDonations
}