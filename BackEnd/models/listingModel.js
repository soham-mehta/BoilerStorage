const mongoose = require("mongoose");


const listingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: String,
        required: true
    },
    lon: {
        type: String,
        required: true
    },
    img: {
        type: Array,
        default: []
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        
    }
});

const listingModel = new mongoose.model("Collection-Listing", listingSchema);

module.exports = listingModel;