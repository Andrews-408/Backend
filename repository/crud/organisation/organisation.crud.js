const Users = require("../../../models/userModel");

async function getAllOrganisations(skip = 0, limit = 50) {
    try {
        const offset = skip * limit;
        const result = await Users.find({role: "Organisation"}).skip(offset).limit(limit);
        return {
            status: "success",
            message: "successfully retrieved organisations",
            results : result.length,
            data: result

        }
    } catch (error) {
        return { status: "error", message: "an error occurred" };
    }
}

async function getOrganisationDetails(req) {
    try {
        const result = await Users.findOne({username: req.params.username, role: 'Organisation'});
        if (result === null) {
            return { status: "success", message: "organisation not found" };
        }
        return {
            status: "success",
            message: "organisation found",
            data: result
        }
    } catch (error) {
        return { status: "error", message: "an error occurred, please try again"}
    }
}

async function updateOrganisationAsVerified(req) {
    try {
        const result = await Users.updateOne(
            {username: req.params.username}, { $set: { isVerified: true }}
        );
        if (result.modifiedCount < 0) {
            return { status: "fail", message: "fail to mark organisation as verified" };
        }
        return {
            status: "success",
            message: "organisation verified",
        }
    } catch (error) {
        return { status: "error", message: "an error occurred, please try again"}
    }
}

async function updateOrganisationAsApproved(req){
    try{
        const result = await Users.updateOne(
            {username: req.params.username} , {$set : {isApproved : true}}
        );
        if (result.modifiedCount < 0) {
            return { status: "fail", message: "fail to approve registration" };
        }
        return {
            status: "success",
            message: "organisation's registration approved",
        }
    }catch(error){
        return { status: "error", message: "an error occurred, please try again"}
    }
}

async function UpdateOrganisation (req){
    try{
        const user = await Users.findOneAndUpdate({username: req.params.username}, req.body, {
            new: true,
            runValidators: true
        })
        if(!user){
            return { status: "success", message: "organisation not found" };
        }

        return {
            status: "success",
            message: "organisation found",
            data: user
        }

    }catch(error){
         return { status: "error", message: "an error occurred, please try again"}
        }
    }

module.exports = {
    getAllOrganisations,
    getOrganisationDetails,
    updateOrganisationAsVerified,
    updateOrganisationAsApproved,
    UpdateOrganisation
}
