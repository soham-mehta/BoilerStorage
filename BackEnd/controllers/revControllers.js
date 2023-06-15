const revModel = require("../models/revservationModel");
const mongoose = require('mongoose');
const userModel = require("../models/userModel");
const listingModel = require("../models/listingModel");
const confirmedModel = require("../models/confirmedReservations");

module.exports.uploadReservation = async (req, res) => {
    const { guestID, listingID, boxesRequested, startDate, endDate } = req.body;

    try {
        const curListing = await listingModel.findById(listingID);

        const result = await revModel.insertMany({
            boxesRequested,
            hostID: (curListing.user),
            guestID: new mongoose.Types.ObjectId(guestID),
            listingID: new mongoose.Types.ObjectId(listingID),
            startDate,
            endDate,
        })
    } catch (err) {
        console.log(err);
    }
}

module.exports.retrieveReservations = async (req, res) => {
    const { id, isHost } = req.body;
    const filter = isHost ? { hostID: id } : { guestID: id };
    try {
        const match = await revModel.find(filter);
        const results = [];
        for (const doc of match) {
            const curListing = await listingModel.findById(doc.listingID);
            const user = await userModel.findById((isHost ? (doc.guestID) : (doc.hostID)));
            results.push({
                name: `${user.firstName} ${user.lastName}`,
                startDate: doc.startDate,
                endDate: doc.endDate,
                contactNumber: user.contactNumber,
                email: user.email,
                boxesRequested: doc.boxesRequested,
                address: curListing.address,
                id: doc._id,
                maxBoxes: curListing.desc,
            })
        }
        res.send({ details: results })
    } catch (err) {
        console.log(err);
    }
}


module.exports.editReservation = async (req, res) => {
    const { confirm, numOfBoxes, revID } = req.body;
    try {
        if (confirm) {
            const reservation = await revModel.findById(revID);
            const listing = await listingModel.findById(reservation.listingID);
            const filter = { _id: reservation.listingID };
            const update = { desc: (((listing.desc - numOfBoxes) > 0) ? (listing.desc - numOfBoxes) : (0)) }
            const updateListing = await listingModel.findOneAndUpdate(filter, update, { new: true });
            const confirmed = await confirmedModel.insertMany({
                boxesRequested: numOfBoxes,
                hostID: reservation.hostID,
                guestID: reservation.guestID,
                startDate: reservation.startDate,
                endDate: reservation.endDate,
                listingID: reservation.listingID,
            });
        }
        const result = await revModel.findByIdAndRemove(revID);
    } catch (err) {
        console.log(err);
    }
}
