const express = require("express");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');

const AppError = require('./Utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const router = require("./routes/router");
const cors = require('cors')
const app = express();
const schedule = require('node-schedule')
const {verifyOrganisations} = require("./Utils/sentimentAnalyser")



// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: '*'}))



app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});


// Schedule the verification function to run every day at 12am
const verificationSchedule = schedule.scheduleJob('0 0 * * *', verifyOrganisations);


// routes
app.use("/api/caretoshare", router);



// handling unhandled routes

app.all("*", (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

// handling global errors
app.use(globalErrorHandler)

module.exports = app;



