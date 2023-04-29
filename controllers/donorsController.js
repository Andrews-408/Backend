
const Donors = require('../models/donorModel');
const ApiFeatures = require('../Utils/apiFeatures');
const catchAsync = require('../Utils/catchAsync');
const AppError = require('../Utils/appError');


// creates a new donors 
exports.createDonor = catchAsync(async (req, res, next) => {
		const newDonor = await Donors.create(req.body);

		
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
		const features = new ApiFeatures(Donors.find(),req.query).filter().sort().setFields()
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
	
		const donor = await Donors.findOne({username : req.params.username})

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
	
		const updatedDonor = await Donors.findOneAndUpdate({username: req.params.username}, req.body, {
			new: true,
			runValidators: true
		})

		if(!updatedDonor){
			return next(new AppError('Username matches no donor', 404));
		}

		res.status(200).json({
			status: "success",
			data : {
				updatedDonor
			}
	})
	
})

// delete donor account

exports.deleteDonorAccount = catchAsync (async(req, res, next) => {
	
	const donor = await Donors.findOneAndDelete({username: req.params.username})
	if(!donor){
		return next(new AppError('Username matches no donor', 404));
	}
	res.status(204).json({
		status: "Successfully deleted"
	})
	
	}
)

