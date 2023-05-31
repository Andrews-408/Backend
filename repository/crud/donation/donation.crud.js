const Donations = require("../../../models/donationModel");


// create a new donation by user()
async function createNewDonation(req){
   try { 
          const newDonation = await Donations.create({
            donatedBy: req.body.donatedBy,
            donationId: req.body.donationId,
            donationType: req.body.donationType,
            description: req.body.description,
            location: req.body.location,
            itemPhoto: req.body.itemPhoto,
            donatedTo : req.body.donatedTo
          });

        if(newDonation === null){
            return {
                status: 'failed',
                message: 'unable to create donation'
            }
        }
        return {
            status: "success!",
            message: "donation created successfully",
            data : newDonation
        };
        }catch(err){
            console.log(err)
            return{
                status: "error",
                message: "An error occured, please try again later",
            };
        }
    }
        

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

//update donation

async function updateDonation(req){
    try{
        const donation = await Donations.findOneAndUpdate({username: req.params.username}, req.body, {
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
    getUserDonation,
    updateDonationStatus,
    updateDonation,
    createNewDonation
}