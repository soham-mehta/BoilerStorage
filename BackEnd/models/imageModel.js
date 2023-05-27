const mongoose = require("mongoose");


const imageSchema = new mongoose.Schema({
    _id: { 
        type: mongoose.Types.ObjectId,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
    contentType: {
        type: String,
        required: true
    }
});

const imageModel = new mongoose.model("Collection-Images", imageSchema);

module.exports = imageModel;