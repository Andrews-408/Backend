const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");




dotenv.config({path:"./config.env"});


mongoose
	.connect(process.env.DB, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false

	})
	.then(() =>console.log("Database connection successful!"));


const port = 8080;

const server = app.listen(port, ()=>{
	console.log(`App running on port ${port}....`);
});

process.on('unhandledRejection', err=>{
	console.log(err.name, err.message)
	server.close(()=>{
		process.exit(1)
	})	
})

