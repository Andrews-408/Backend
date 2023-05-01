const AppError = require("../Utils/appError");
const catchAsync = require("../Utils/catchAsync");
const sendMail = require("../Utils/email");
const Donors = require("../models/donorModel");
const Admins = require("../models/adminModel");
const jwt = require('jsonwebtoken');
const crypto = require('crypto')
const {promisify} = require('util')

const SignToken = (id) => { 
     return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : process.env.JWT_EXPIRY})
}

exports.signUp = catchAsync (async (req, res, next) => {
    const user = await Donors.create(req.body);

    const token = SignToken(user._id)

    res.status(201).json({
        status: 'success',
        token,
        data : {
            user
        }
    })
})


// controls donor sign in
exports.signIn = catchAsync(async (req, res, next) =>{
    const {username, password} = req.body
    
    if(!username || !password){
        return next(new AppError('Provide username and password', 400 ))
    }
    // checks if user exists and password is correct
    const user = await Donors.findOne({username}).select('+password');

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Incorrect username or password',401))
    }

    const token = SignToken(user._id)

    res.status(200).json({
        status : 'success',
        token,
    })

})

// controls admins sign in

exports.adminSignIn = catchAsync (async (req, res, next) => {
    const {username, password} = req.body;

    // checks if user has provided password and username
    if(!username || !password){
        return next(new AppError('Provide Username and Password', 400))
    }

    const user = await Admins.findOne({username}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError('Invalid username or password', 401))
    }

    const token = SignToken(user._id)

    res.status(200).json({
        status: 'success', 
        token
    })

})


// protecting routes

exports.protect = catchAsync(async(req, res, next)=>{
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
        const freshUser = await Donors.findById(decoded.id)
        if(!freshUser){
            return next(new AppError('User with this token does no longer exist', 401))
        }
    //check if user changed password after token was issued
        if(freshUser.passwordChangedAfter(decoded.iat)){
            return next( new AppError('User recently changed Password. Please log in again'))
        }
    // GRANT ACCESS TO PROTECTED ROUTE
        req.user = freshUser;
        next()
})

exports.forgotPassword = catchAsync(async (req,res,next)=>{
    // get user based on posted email
    const user = await Donors.findOne({email : req.body.email});
    if(!user){
        next(new AppError('There is no user with the provided email address', 404))
    }

    // generate the random reset token
    const resetToken = user.createPasswordResetToken();
    await user.save({validateBeforeSave : false});

    const resetURL = `${req.protocol}://${req.get('host')}/api/caretoshare/donors/resetPassword/${resetToken}`
    
    const message = `Forgot password? Submit a Patch request with your new password and passwordConfirm to: 
                     ${resetURL} . \nIf you didn't forget your password, please ignore this email`
    try{
        await sendMail({
            email: user.email,
            subject : 'Your password reset token (valid for 10min)',
            message
        })
        res.status(200).json({
            status: 'success',
            message : 'Token sent to email'
        })
    }catch(err){
        user.passwordResetToken = undefined
        user.passwordResetExpires = undefined
        await user.save({validateBeforeSave : false});
        next( new AppError('There was an error sending email. Try again later!', 500))
    }
    
});


exports.resetPassword = catchAsync(async (req, res, next)=> {
    // get user based on the token
    const hashedToken = crypto
                            .createHash('sha256')
                            .update(req.params.token)
                            .digest('hex')

    const user = await Donors.findOne({
                                        passwordResetToken : hashedToken, 
                                        passwordResetExpires : {$gt : Date.now()} 
                                    })

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
    const token = SignToken(user._id);

    res.status(200).json({
        status: 'success',
        token
    });

}) 