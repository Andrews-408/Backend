const express = require('express')
const { createNewRequest,getOneRequest,getAllRequests,getRequestDetails,updateRequest,updateRequestStatus,deleteRequest} =require("../repository/crud/request/request.crud")
const router = express.Router()

// Controller for createNewRequest

router.post('/', async(req,res,next) => {
    try{
        const result = await createNewRequest(req);
            if (result.status == "success!"){
                return res.status(200).json(result);
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
        if (result.status === "success!"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    } catch (error) {
        next(error);
        
    }
});

// Controller for getOneRequest
router.get('/:requestedBy', async(req,res,next) => {
    try {
        const result = await getOneRequest(req.params.requestedBy);
    {
        if (result.status === "success!"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
    }
    } catch (error) {
        next (error);    
    }   
});

// Controller for getRequestDetails

router.get('/:requestId', async(req,res,next) => {
    try {
        const result = await getRequestDetails(req.params.requestId);
        if (result === 'success!'){
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
        const result = await updateRequest(req.params.requestId);
        if (result === "success!"){
            return res.status(200).json(result);
        }
        return res.status(400).json(result);
        
    } catch (error) {
        next(error);
        
    }
});

// Controller for deleteRequest

router.delete('/:requestId',async(req,res,next) => {

    try {
        const result = await deleteRequest(req.params.requestId);
        if ( result === "success!") {
            return res.status(200).json(result);
            
        }
        return res.status(400).json(result);
    }
        
     catch (error) {
        next(error);
    }});