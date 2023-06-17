const Requests = require("../../../models/requestModel")



// create a new request by Organization

async function createNewRequest(req){
    try{
        const result = await Requests.create(req.body)
        if (result === null ){
            return{
                status: 'failed',
                message: 'unable to create Request'
            }

        }
        return{
            status: 'success',
            message: 'request created successfully',
            data : result
        };
    }catch(err){
        return {
            status: 'error',
            message: 'An error occurred, Please try again later'
        }
        
    }
};

// get requests from a particular organisation
async function getOrganisationRequests(req){
    try{
        const result = await Requests.find({requestedBy: req.params.requestedBy})
        if (result === null){
            return{
                status: "failed",
                message: "No request found from this Organization"
            }
        }
        return{
            status: "success",
            message: "Request found",
            data: result
        };

    }
    catch(err){
        return{
            status: "error",
            message: "An error has occured, please try again"

        }
            

    }
};

// Get all Organisation requests
async function getAllRequests(skip = 0, limit = 50){
    const offset = skip*limit;
    try{
        const requests = await Requests.find().skip(offset).limit(limit)
        return{
            status:"success",
            message: "Requests successfully loaded",
            results: requests.length,
            data: requests
        }
    }
    catch(err){
        return{
            status: "error",
            message: "An error has occurred , please try again"
        }

    }
    
};

// get Request details
async function getRequestDetails(req){
    try{
        const result = await Requests.findOne({requestId:req.params.requestId})
        if (result === null){
            return{
                status:"failed",
                message: "no details for this request not found"
             }
        }
        return {
            status : "success!",
            message: "request successfully found",
            data: result
        };
    }
    catch(err)
    {
        return{
            status: "error",
            message: "an error has occurred,please try again "
        }
    }
}

// Update Request status
async function approveRequest(req){
    try{
    const result = await Requests.updateOne({requestId: req.params.requestId},{$set: {requestStatus:"In Progress"}})
        if (result === null){
            return{
                status: "failed",
                message: "Failed to update request status"
            }
        }
        return{
            status: "success",
            message: "Successfully updated request status",
        };
    }
    catch(err){
        return{
            status: "error",
            message: "Failed to update status, please try again"
        }
    }
};

// Update Request status
async function acceptRequest(req){
    try{
    const result = await Requests.updateOne({requestId: req.params.requestId},{$set: {requestStatus:"Completed"}})
        if (result === null){
            return{
                status: "failed",
                message: "Failed to update request status"
            }
        }
        return{
            status: "success",
            message: "Successfully updated request status",
        };
    }
    catch(err){
        return{
            status: "error",
            message: "Failed to update status, please try again"
        }
    }
};

// update Request 

async function updateRequest(req){
    try{
            const request = await Requests.updateOne({requestId: req.params.requestId}, req.body,
                {new:true,runValidators: true});

            if (request === null){
                return { 
                    status: "failed",
                    message: "failed to update Request"
                }
            }
            return{
                status: "success",
                message: "Request updated successfully",
                update: request
            };
        
    }
    catch(err){
        return{
            status: "error",
            message: "An error has occurred, please try again"
        }

    }
};

// Delete Requests
async function deleteRequest(req){
    try{
        const request = await Requests.deleteOne({requestId: req.params.requestId})
        if (request === null){
            return{
                status: "failed",
                message: "failed to delete request"
               
            }
        }
        return{
            status: "success!",
            message: "successfully delete request"
            
        };
    }
    catch(err){
        return{
            status: "error",
            message: "an error has occurred, please try again"
        }
    }
};

module.exports = {
    createNewRequest,
    getOrganisationRequests,
    getAllRequests,
    getRequestDetails,
    updateRequest,
    approveRequest,
    acceptRequest,
    deleteRequest
}

