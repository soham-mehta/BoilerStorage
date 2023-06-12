const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String
    }
});

const userModel = new mongoose.model("Collection-User", userSchema);

module.exports = userModel;