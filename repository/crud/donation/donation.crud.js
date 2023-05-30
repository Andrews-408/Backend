const Donations = require("../../../models/donationModel");


// get all donations
async function getAllDonations(skip = 0, limit = 50) {
    const offset = skip * limit;
    const result = await Donations.find().skip(offset).limit(limit);
    return {
        status: "success",
        message: "successfully retrieved donations",
        results : result.length,
        data: result

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


// get a user donation
async function getUserDonation(req){
    try{
        const result = await Donations.findOne({donatedBy: req.params.donatedBy})
        if(result === null){
            return {status : "failed" , message: "No donation from this user"}
        }
        return {
            status : "success",
            message: "donations found",
            data : result
        }
    }catch(error){
        return {status : "error" , message : "an error occured, please try again"}
    }
};



// update donation status
async function updateDonationStatus(req){
    try{
        const result = await Donations.updateOne({donationId : req.params.donationId}, {$set : {donationStatus : req.body.donationStatus}});
        if(result === null){
            return {status : "failed" , message : "No donation found"}
        }
        return {
            status : "success",
            message : "donation updated successfully"
        }

    }catch(error){
        return {status : "error" , message: "an error occured, please try again"}
    }
}

module.exports = {
    getAllDonations,
    getDonationDetails,
    getUserDonation,
    updateDonationStatus
}