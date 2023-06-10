
const Users = require('../models/userModel');
const ApiFeatures = require('../Utils/apiFeatures');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');


// creates a new donor
exports.createDonor = catchAsync(async (req, res, next) => {
		const newDonor = await Users.create(req.body);

		
		res.status(201).json({
			status: 'success',
			data : {
				newDonor
			}
		});
	
	}
)



// get all current donors from the database
exports.getAllDonors = catchAsync (async (req, res, next) => {
		// api filtering
		const features = new ApiFeatures(
			Users.find({role: "Donor"}), req.query)
				.filter()
				.sort()
				.setFields()
		const donors =  await features.query;

		// responses
		res.status(200).json({
			status: "success",
			results: donors.length,
			data : {
				donors
			}
		})	
})

// finds a specific donor by username

exports.getDonor = catchAsync( async (req, res, next) => {
	
		const donor = await Users.findOne({username : req.params.username, role: 'Donor'})

		// adding 404 errors
		if(!donor){
			return next(new AppError('Username matches no donor', 404));
		}

		res.status(200).json({
			status: "success",
			data : {
				donor
			}
		})
	}
	)
	


// update a donor details

exports.updateDonor = catchAsync(async (req, res, next) => {
		const user = await Users.findOneAndUpdate({username: req.params.username}, req.body, {
			new: true,
			runValidators: true
		})

		if(!user){
			return next(new AppError('Username matches no donor', 404));
		}
		
		// filter fields after donor updates 
		user.mission = undefined;
		user.organisationName = undefined;
		user.isVerified = undefined;
		user.isApproved = true;
		user.businessCertificate = undefined;
		await user.save({validateBeforeSave: false})

		res.status(200).json({
			status: "success",
			data : {
				user
			}
	})
	
})

// delete donor account

exports.deleteDonorAccount = catchAsync (async(req, res, next) => {
        const result = await Users.updateOne(
            {username: req.params.username} , {$set : {isActive : false}}
        );
        if(result === null){
			return next(new AppError('User not found', 404));
		}

		console.log(result)

		res.status(204).json({
			status: 'success',
			message : 'successfully deactivated user'
		})
       
}
)

exports.activateDonorAccount = catchAsync (async(req, res, next) => {
	const result = await Users.updateOne(
		{username: req.params.username} , {$set : {isActive : true}}
	);
	if(result === null){
		return next(new AppError('User not found', 404));
	}

	res.status(204).json({
		status: 'success',
		message : 'successfully activated user'
	})
   
}
)

