const revModel = require("../models/revservationModel");
const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const listingModel = require("../models/listingModel");

module.exports.uploadReservation = async (req, res) => {
    const { hostID, guestID, listingID, boxesRequested, startDate, endDate } = req.body;

    const result = await revModel.insertMany({
        boxesRequested,
        hostID: new mongoose.Types.ObjectId(hostID),
        guestID: new mongoose.Types.ObjectId(guestID),
        listingID: new mongoose.Types.ObjectId(listingID),
        startDate,
        endDate,
    })
}

module.exports.retrieveReservations = async (req, res) => {
    const { id, isHost } = req.body;
    const filter = isHost ? { hostID: id } : { guestID: id };
    const match = await revModel.find(filter);
    const results = [];
    const user = await userModel.findById(id);
    for (const doc of match) {
        const curListing = await listingModel.find({ _id: doc.listingID });
        results.push({
            name: `${user.firstName} ${user.lastName}`,
            startDate: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
            endDate: `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
            contactNumber: user.contactNumber,
            email: user.email,
            boxesRequested: doc.boxesRequested,
            address: curListing.address,
            id: doc._id,
        })
    }
    res.send({ details: results })
}

module.exports.retrieveOneReservation = async (req, res) => {
    const { revID, isHost } = req.body;
    const match = await revModel.findById(revID);
    const user =  await userModel.findById((isHost ? match.guestID: match.hostID ));
    res.send({ details: {
        name: `${user.firstName} ${user.lastName}`,
        startDate: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
        endDate: `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
        contactNumber: user.contactNumber,
        email: user.email,
        boxesRequested: doc.boxesRequested,
        address: curListing.address,
        id: doc._id,
    }})
}

module.exports.editReservation = async (req, res) => {
    const { confirm, numOfBoxes, revID } = req.body;
    if (!confirm) {
        const result = await revModel.findByIdAndRemove(revID);
    } else {
        
    }
}
