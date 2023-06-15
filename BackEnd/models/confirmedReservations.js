const mongoose = require("mongoose");


const confirmedSchema = new mongoose.Schema({
    boxesRequested: {
        type: Number,
        required: true
    },
    guestID:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    hostID:{
        type: mongoose.Schema.ObjectId,
        required: true
    },
    listingID: {
        type: mongoose.Schema.ObjectId,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
});

const confirmedModel = new mongoose.model("Collection-Confirmed-Reservations", confirmedSchema);

module.exports = confirmedModel;