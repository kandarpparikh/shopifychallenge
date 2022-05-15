const express = require("express");
const { async } = require("rxjs");
const { isNull } = require("util");
const inventoryOperations = require("../controllers/inventoryOperations")
const route = express.Router();

route.get("/getallitems",async(req,res)=>{
    data = await inventoryOperations.getinventory(req)
    res.status(200).send(data);
})

route.get("/gettemperatures",async(req,res)=>{
    data = await inventoryOperations.getWeatherData(req)
    console.log(data)
    res.status(200).send(data);
})

route.post("/addinventory", async (req, res) => {
    try {
        let message = await inventoryOperations.addInventory(req)
        res.status(200).send("successfully added inventory");    
      } 
      catch (error) 
      {
        console.log(error);
        res.status(500).send("Error while fetching the inventory.");
      }
    });

route.post("/editinventory", async (req, res) => {
    try {
        let message = await inventoryOperations.editInventory(req)
        res.status(200).send({"message": "successfully edited inventory"});    
        } 
        catch (error) 
        {
            console.log(error);
            res.status(500).send("Error while fetching the inventory.");
        }
    });

route.post("/deleteinventory", async (req, res) => {
    try {
        let message = await inventoryOperations.deleteInventory(req)
        res.status(200).send({"message": "successfully deleted inventory"});    
        } catch (error) {
        console.log(error);
        res.status(500).send("Error while fetching the inventory.");
        }
    });

module.exports = route;