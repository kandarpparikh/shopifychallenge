const inventoryModel = require("../models/inventoryModel");
const json = require("json");
const Str = require('@supercharge/strings');
const { async } = require("rxjs");
const { isNull } = require("util");

filterProducts = async(req,res) => {
    let filters = {}
    Object.keys(req.body.data).forEach(key=>{
        if(key === "quantity")
        {
            filters[key] = { $gte: req.body.data[key] }
        }
        else{
            filters[key] = req.body.data[key];
        }
    })
    let data = await inventoryModel.find(filters)
    return data
}

module.exports = {
    filterProducts: filterProducts
  };