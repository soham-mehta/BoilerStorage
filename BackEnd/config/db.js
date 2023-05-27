const { default: mongoose } = require("mongoose");

function db() {
    const mongoose = require("mongoose");

    mongoose.connect("mongodb://localhost:27017/BoilerAuth")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(() => {
        console.log("Failed to connect");
    });
}

module.exports = db;

