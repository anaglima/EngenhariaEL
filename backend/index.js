const express = require("express");
var cors = require("cors");
const connection = require("./connection");
const userRoute = require("./routes/user");
const constructionRoute = require("./routes/construction");
const materialRoute = require("./routes/material");
//const billRoute = require("./routes/bill");
const dashboardRoute = require("./routes/dashboard");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/user", userRoute);
app.use("/construction", constructionRoute);
app.use("/material", materialRoute);
//app.use("/bill", billRoute);
app.use("/dashboard", dashboardRoute);


module.exports = app;
