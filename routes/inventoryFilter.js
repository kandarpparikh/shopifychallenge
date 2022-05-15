const express = require("express");
const { async } = require("rxjs");
const { isNull } = require("util");
const filters = require("../controllers/filters")
const route = express.Router();

route.post("/products", async(req,res) => {
    fetched = await filters.filterProducts(req);
    console.log(fetched)
    res.json(fetched);
});

module.exports = route;