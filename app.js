
const express = require("express");
const morgan = require("morgan");

const AppError = require('./Utils/appError')
const globalErrorHandler = require('./controllers/errorController')

const donorsRouter = require("./routes/donorsRouter");
const cors = require('cors')
const app = express();


// MIDDLEWARES
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});

// routes
app.use("/api/caretoshare/donors", donorsRouter);


// handling unhandled routes

app.all("*", (req, res, next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on the server`, 404))
})

// handling global errors
app.use(globalErrorHandler)

module.exports = app;



