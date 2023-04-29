
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");



dotenv.config({path:"./config.env"});


mongoose.connect(process.env.DB, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useFindAndModify: false

}).then(() =>console.log("Database connection successful!"));


const port = 8080;

app.listen(port, ()=>{
	console.log(`App running on port ${port}....`);

});