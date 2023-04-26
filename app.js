
const express = require("express");
const morgan = require("morgan");
const donorsRouter = require("./routes/donorsRouter");
const adminRouter = require("./routes/adminRouter")
const app = express();


// MIDDLEWARES
app.use(morgan("dev"));

app.use(express.json());

app.use((req, res, next)=>{
    req.requestTime = new Date().toISOString();
    next();
});


app.use("/api/caretoshare/donors", donorsRouter);
app.use("/api/caretoshare/admins", adminRouter);

module.exports = app;



