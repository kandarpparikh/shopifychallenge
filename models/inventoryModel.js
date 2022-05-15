var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventory = new mongoose.Schema({
    quantity: {
        type: Number
    },
    inventoryName: {
        type: String
    },
    inventoryId: {
        type: String
    },
    city: {
        type: String
    },
    category: {
        type: String
    }
});

module.exports = mongoose.model("inventory", inventory, "inventory");