const { mongoose } = require("mongoose");

require('dotenv').config();

function db() {
    const mongoose = require("mongoose");

    //mongoose.connect("mongodb://localhost:27017/BoilerAuth")
    //console.log(`mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASSWORD}@boiler-storage-cluster.t4dvdzd.mongodb.net/?retryWrites=true&w=majority`)
    mongoose.connect(`mongodb+srv://${process.env.USER_ID}:${encodeURIComponent(process.env.USER_PASSWORD)}@boiler-storage-cluster.t4dvdzd.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((err) => {
        console.log(err)
        console.log("Failed to connect");
    });
}

module.exports = db;

