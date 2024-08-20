const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Import Router
const clothesRoute = require("./routes/clothesRoute");
const inventoryRoute = require("./routes/inventoryRoute");

app.use(bodyParser.json());

//Routes

app.use("/clothes", clothesRoute);
app.use("/inventory", inventoryRoute);

module.exports = app;
