const express = require("express");
const mongoose = require("mongoose");
const ATLAS_URI = require("./config");
const cors = require("cors");
const inventoryRoute = require("./routes/inventoryManagementRoutes")
const filterRoute = require("./routes/inventoryFilter")
const app = express();
const port = process.env.PORT || 3001

app.use(express.json());
app.use(cors());

mongoose.connect(ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db = mongoose.connection;
db.on("error", () => {
    console.log("Error while connecting to the database");
});

db.once('open', () => {
    console.log("Database connected");
});

app.use("/inventory", inventoryRoute);
app.use("/filter", filterRoute);

app.listen(port, () => {
    console.log("App is listening on port " + port);
});

module.exports = app;