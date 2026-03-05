const express = require("express");
const app = express();

app.disable("x-powered-by");
app.use("/", require("./routes"));

module.exports = app;
