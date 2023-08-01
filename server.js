const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
const Users = require("./models/userModel")


dotenv.config({path:"./config.env"});


mongoose
	.connect(process.env.DB, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false

	})
	.then(() =>console.log("Database connection successful!"));




const server = app.listen(process.env.PORT, ()=>{
	console.log(`App running on port ${process.env.PORT}....`);  
});

process.on('unhandledRejection', err=>{
	console.log(err.name, err.message)
	server.close(()=>{
		process.exit(1)
	})	
})

