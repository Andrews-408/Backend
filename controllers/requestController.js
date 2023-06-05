const express = require('express')
const { createNewRequest,getOrganisationRequests,getAllRequests,getRequestDetails,updateRequest,updateRequestStatus,deleteRequest} =require("../repository/crud/request/request.crud")
const router = express.Router()

// Controller for createNewRequest

router.post('/', async(req,res,next) => {
    try{
        const result = await createNewRequest(req);
            if (result.status == "success"){
                return res.status(201).json(result);
                }
            return res.status(400).json(result);
        }
    catch(error){
        next(error)
    }
});

// get all Requests Controller
router.get('/', async(req,res,next) => {
    try {
        const result = await getAllRequests(req.params.skip, req.params.limit);
        if (result.status === "success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);  
    }
});

// get requests from a particular organisation
router.get('/:requestedBy/organisationRequests', async(req,res,next) => {
    try {
        const result = await getOrganisationRequests(req);
    {
        if (result.status === "success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    } catch (error) {
        next (error);    
    }   
});

// get requestDetails
router.get('/:requestId', async(req,res,next) => {
    try {
        const result = await getRequestDetails(req);
        if (result === 'success'){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
        
    }
});

// Controller for UpdateRequest 
router.patch('/:requestId', async(req,res,next) => {
    try {
        const result = await updateRequest(req);
        if (result === "success"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
        
    } catch (error) {
        next(error);
        
    }
});

// update requestStatus by requestId
router.patch("/:requestId/updateStatus", async(req,res,next)=> {
    try{
        const result = await updateRequestStatus(req);
        if (result.status==="success"){
            return res.status(200).json(result)
        }
        return res.status(400).json(result)
    }catch(error){
        next(error)
    }
});

// Controller for deleteRequest

router.delete('/:requestId',async(req,res,next) => {

    try {
        const result = await deleteRequest(req);
        if ( result === "success!") {
            return res.status(200).json(result);
            
        }
        return res.status(400).json(result);
    }
        
     catch (error) {
        next(error);
    }});


    module.exports = router