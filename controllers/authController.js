const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const sendMail = require("../Utils/email");
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const {promisify} = require('util')

const SignToken = (id) => { 
     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY})
}

const SendToken = (user, res, statusCode) => {
    const token = SignToken(user._id)

    res.status(statusCode).json({
        status: 'success',
        token,
        data : {
            user
        }
    })

}


// user sign up controller
exports.signUp = (model) => { 
    return catchAsync (async (req, res, next) => {
            const user = await model.create({
                email : req.body.email,
                username: req.body.username,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                role : req.body.role
            });

            if(user.role === "Admin" || user.role === "Donor" ){
                user.isApproved = undefined;
                user.isVerified = undefined;
                await user.save({validateBeforeSave : false});
            }



            SendToken(user, res, 201)

    }
    )
}


// user login controller
exports.signIn = (model) => {
        return catchAsync(async (req, res, next) =>{
            const {username, password} = req.body
    
            if(!username || !password){
                return next(new AppError('Provide username and password', 400 ))
            }
            // checks if user exists and password is correct
            const user = await model.findOne({username}).select('+password');

            if(!user || !(await user.correctPassword(password, user.password))){
                return next(new AppError('Incorrect username or password',401))
            }

            if(!user.isActive){
                return next(new AppError('Account is not active', 400))
            }

            SendToken(user, res, 201)

        })}






// protecting routes

exports.protect = (model) => catchAsync(async(req, res, next)=>{
    // get token and check if it's there
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1]
        }
        
        if(!token){
            return next(new AppError('You are not logged in.Please Log in to get access', 401))
        }
    // verifying token
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        
    //checking if user still exist
        const currentUser = await model.findById(decoded.id)
        if(!currentUser){
            return next(new AppError('User with this token does no longer exist', 401))
        }
    //check if user changed password after token was issued
        if(currentUser.passwordChangedAfter(decoded.iat)){
            return next( new AppError('User recently changed Password. Please log in again', 400))
        }
    // GRANT ACCESS TO PROTECTED ROUTE
        req.user = currentUser;
        console.log(req.user)
        next()
})


// resetToken mailing controller

exports.forgotPassword = (model) => catchAsync(async (req,res,next)=>{
    // get user based on posted email
    const user = await model.findOne({email : req.body.email});
    if(!user){
        next(new AppError('There is no user with the provided email address', 404))
    }

    // generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});

    try{
        await sendMail({
            email: user.email,
            subject : 'Your password reset token (valid for 10min)',
            message : resetToken
        })
        res.status(200).json({
            status: 'success',
            message : 'Token sent to email',
            data : {
                user
            }
        })
    }catch(err){
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave : false});
        next( new AppError('There was an error sending email. Try again later!', 500))
    }
    
});

// reset password controller
exports.resetPassword = (model)=>catchAsync(async (req, res, next)=> {
    // get user based on the token
    const hashedToken = crypto
                            .createHash('sha256')
                            .update(req.params.token)
                            .digest('hex')

    const user = await model.findOne({
                                        passwordResetToken : hashedToken, 
                                        passwordResetExpires : {$gt : Date.now()} 
                                    })
    console.log(user)

    // checks if user exist and token not expired
    if(!user){
        return next(new AppError('Token is invalid or has expired', 400))
    }

    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    //update changedPasswordAT property for the user

    //log the user in, send JWT
    SendToken(user, res, 200)

}) 

// delete user
exports.deactivateUser = (model) => catchAsync( async (req, res, next)=>{
    const user = await model.findOneAndUpdate({username: req.params.username}, {isActive : false}, {
        new: true,
        runValidators: true
    })

    SendToken(user, res, 204);
})

