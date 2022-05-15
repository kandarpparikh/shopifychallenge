const axios = require('axios')
const inventoryModel = require("../models/inventoryModel");
const Str = require('@supercharge/strings');
const { async } = require("rxjs");
const { isNull } = require("util");
const { resourceLimits } = require('worker_threads');

generateInventoryId = () =>{
    console.log(Str.random(5))
    return Str.random(5)
    };

addInventory = (req) => {

    inventoryModel.create(
        {
            quantity : req.body.data.quantity,
            inventoryName: req.body.data.inventoryName,
            inventoryId: generateInventoryId(),
            city: req.body.data.city,
            category: req.body.data.category,
        })
}

getinventory= async(req) => {
    items = await inventoryModel.find();
    return items
}

checkItemExistence= async(req) => {
    var query = {'inventoryId': req.body.data.inventoryId};
    let currentData = await inventoryModel.findOne(query);
    if(isNull(currentData))
    {
        return false
    }
    else
    {
        return true
    }
}

editInventory = async(req) => {
        var query = {'inventoryId': req.body.data.inventoryId};
        console.log(await checkItemExistence(req))
        if(checkItemExistence(req))
        {
            var updatedData = {};
            Object.keys(req.body.data).forEach(key=>{
                updatedData[key] = req.body.data[key];
            })
            inventoryModel.findOneAndUpdate(query, updatedData, function(err, doc) {
                if (err) console.log("error");
                console.log('Succesfully saved.');
            });
        }
        else
        {
            return({'error': "inventoryId does not exist"});
        }
    }

deleteInventory = async(req) => {
    if(await checkItemExistence(req)==false)
    {
        return({'error': "inventoryId does not exist"});
    }
    inventoryModel.findOneAndDelete({ inventoryId: req.body.data.inventoryId }, function(err, doc) {
        if (err) console.log("error");
        console.log('Succesfully saved.');
    });
    
  };

  getWeatherData = async(req) => {
    let apiKey = "109ababf08777ff904ef2192786ef0ea"
    const result = await inventoryModel.find()
    cities = []
    result.forEach(x => {
        if(cities.includes(x.city)==false){
            cities.push(x.city)
        }
    })
    
    temp = {}
    console.log("temp created")

    for(let i=0; i < cities.length;i++){
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${cities[i]}&units=metric&appid=${apiKey}`;
        
        await axios.get(url).then((response) => { 
            temp[cities[i]]=response.data.main.temp;
        });
    }
    return temp
  };

module.exports = {
    addInventory: addInventory,
    getinventory: getinventory,
    editInventory: editInventory,
    deleteInventory: deleteInventory,
    getWeatherData: getWeatherData
  };