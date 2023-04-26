
const Donors = require('../models/donorModel');

// create new donors and add to the database
exports.createDonor = async (req, res) => {
	try{
		const newDonor = await Donors.create(req.body);

		res.status(201).json({
			status: 'success',
			data : {
				newDonor
			}
		});
	} catch(err){
		res.status(400).json({
			status: 'fail',
			message: err
		})
	}
}

// get all current donors from the database
exports.getAllDonors = async (req, res) => {
	try {
		const donors = await Donors.find();

		res.status(200).json({
			status: "success",
			results: donors.length,
			data : {
				donors
			}
		})
	}catch(err){
		res.status(404).json({
			status: "fail",
			message : err
		})
	}
}

// finds a specific donor by ID

exports.getDonor = async (req, res) => {
	try{
		const donor = await Donors.findById(req.params.id)

		res.status(200).json({
			status: "success",
			data : {
				donor
			}
		})
	}catch(err){
		res.status(404).json({
			status: "fail",
			message: err
		})
	}
}

