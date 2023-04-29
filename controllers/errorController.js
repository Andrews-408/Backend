const AppError = require('../Utils/appError')

const sendErrDev = (err, res) => {
    res.status(err.statusCode).json({
        status : err.status,
        error : err,
        message : err.message,
        stack : err.stack
    })
}

const sendErrProd = (err, res) => {
    if(err.isOperational){
        res.status(err.statusCode).json({
            status : err.status,
            message : err.message
        })
    }
    else{
        res.status(500).json({
            status : 'error',
            message: 'something went wrong'
        })
    }
    
}

// handle invalid data in DB
const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return new AppError(message, 400)
}

// handles errors with duplicate fields in the database
const handleDuplicatesDB = err => {
    const message = `Duplicate field value. Please use another value!`
    return new AppError(message, 400)
}

const handleValidationError = err => {
    const errors = Object.values(err.errors).map(val => val.message);
    const message = `Invalid input data. ${errors.join('. ')}`
    return new AppError(message, 400);
}


module.exports = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error'

    if(process.env.NODE_ENV === 'development'){
            sendErrDev(err, res)
        }

    else if(process.env.NODE_ENV === 'production'){
        let error = {...err};

        if (error.name ==='CastError')  error = handleCastErrorDB(error);
        if(error.code === 11000 ) error = handleDuplicatesDB(error);
        if(error.name === 'ValidationError') error = handleValidationError(error)

        sendErrProd(error, res);
    }

}