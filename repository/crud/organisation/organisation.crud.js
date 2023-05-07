const Organisation = require("../../../models/organisationModel");

async function getAllOrganisations(skip = 0, limit = 50) {
    try {
        const offset = skip * limit;
        const result = await Organisation.find({}).skip(offset).limit(limit);
        return {
            status: "success",
            message: "successfully retrieved organisations",
            data: result
        }
    } catch (error) {
        return { status: "error", message: "an error occurred" };
    }
}

async function getOrganisationDetails(req) {
    try {
        const result = await Organisation.findById(req.params.organisation_id);
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
        const result = await Organisation.updateOne(
            req.params.organisation_id, { $set: { isVerified: true }}
        );
        if (result.nModified < 0) {
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

module.exports = {
    getAllOrganisations,
    getOrganisationDetails,
    updateOrganisationAsVerified
}
