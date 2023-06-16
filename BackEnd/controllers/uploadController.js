
const listingModel = require("../models/listingModel");
const multer = require("multer");
const mongoose = require('mongoose');
const userModel = require("../models/userModel");

const upload = multer({ storage: multer.memoryStorage(), limits: { files: 5 } })
const axios = require("axios")
module.exports.upload = upload;

module.exports.uploadListing = async (req, res) => {
    try {
        //Upload images
        const images = req.files

        const imageDocs = images.map((image) => {
            return {
                _id: new mongoose.Types.ObjectId(),
                data: image.buffer,
                contentType: image.mimetype,
            };
            //idArr.push(cur._id)
        })
        //console.log(result)

        //Upload listing
        console.log(req.body.endDate);
        try {
            const result = await listingModel.insertMany({
                user: new mongoose.Types.ObjectId(req.body.user),
                price: req.body.price,
                address: req.body.address,
                startDate: new Date(req.body.startDate),
                endDate: new Date(req.body.endDate),
                phoneNumber: req.body.phoneNumber,
                desc: req.body.desc,
                lat: req.body.lat,
                lon: req.body.lon,
                img: imageDocs
            })
        } catch (err) {
            console.log(req.body.endDate)
        }

        res.send("Success")
    } catch (err) {
        console.log(err)
    }
}

module.exports.editListing = async (req, res) => {
    try {
        const filter = { _id: new mongoose.Types.ObjectId(req.body.id) };
        let update = {}
        if (req.body.changed === 'true') {
            //Upload images
            const images = req.files

            const imageDocs = images.map((image) => {
                return {
                    _id: new mongoose.Types.ObjectId(),
                    data: image.buffer,
                    contentType: image.mimetype,
                };
            })
            update = {
                $set: {
                    price: req.body.price,
                    address: req.body.address,
                    startDate: (req.body.startDate),
                    endDate: (req.body.endDate),
                    phoneNumber: req.body.phoneNumber,
                    desc: req.body.desc,
                    lat: req.body.lat,
                    lon: req.body.lon,
                    img: imageDocs
                }
            };
        } else {
            update = {
                $set: {
                    price: req.body.price,
                    address: req.body.address,
                    startDate: (req.body.startDate),
                    endDate: (req.body.endDate),
                    phoneNumber: req.body.phoneNumber,
                    desc: req.body.desc,
                    lat: req.body.lat,
                    lon: req.body.lon
                }
            };
        }
        await listingModel.updateOne(filter, update);
    } catch (err) {
        console.log(err)
    }
}


module.exports.retrieveListing = async (req, res) => {
    try {
        const match = await listingModel.findById(req.body.id)
        if (match === null) {

        } else {
            const arrBin = []
            for (const image of match.img) {
                arrBin.push([image.contentType, image.data.toString('base64')])
            }
            const owner = await userModel.findById(match.user);
            const startDate = new Date(match.startDate);
            const endDate = new Date(match.endDate);
            const data = {
                price: match.price,
                img: arrBin,
                address: match.address,
                numBoxesLeft: match.desc,
                startDate: `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
                endDate: `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
                ownerName: `${owner.firstName} ${owner.lastName}`,
                contactNumber: match.phoneNumber,
                lon: match.lon,
                lat: match.lat,
                ownerID: owner._id
            }
            res.send({ listing: data, success: true })
        }
    } catch (err) {
        console.log(err)
    }
}

const dist = async (origin, dest) => {
    if (dest.length === 0 || origin.length === 0) {
        return [];
    }
    const url = `https://api.tomtom.com/routing/matrix/2?key=mPKAe08o98VphQ0zNO2fG1l6eUPRVpTh`
    const config = {
        headers: {
            'Content-Type': 'application/json' // Set the desired MIME type here
        }
    };
    const postBody = {
        origins: origin,
        destinations: dest,
        options: {
            departAt: "now",
            routeType: "fastest",
            traffic: "live",
            travelMode: "car",
        }
    }
    try {
        const res = await axios.post(url, postBody);
        let allRoutes = []
        for (const trip of res.data.data) {
            if (trip.detailedError) {
                console.log(trip.detailedError)
                allRoutes.push(-1);
            } else {
                allRoutes.push(trip.routeSummary.lengthInMeters);
            }
        }
        return allRoutes;
    }
    catch (err) {
        console.log(err)
        //console.log(err.response.data.detailedError.details[0])
    }
}

module.exports.retrievePage = async (req, res) => {
    try {
        const { date, price, lat, lon, endDate } = req.body;
        const match = date === "" ? (await listingModel.find(
            {
                price: { $gte: price }
            }).sort([['price', 1], ['startDate', 1]])) : 
            
            (await listingModel.find(
                {
                    price: { $gte: price },
                    startDate: { $gte: date }
                }
            ).sort([['price', 1], ['startDate', 1]]))
        if (match === null) {
            console.log("Error retrieving document")
        } else {
            const allDocs = []
            let origin = [{ point: { latitude: parseFloat(lat), longitude: parseFloat(lon) } }];
            let dest = [];
            for (const doc of match) {
                dest.push({ point: { latitude: parseFloat(doc.lat), longitude: parseFloat(doc.lon) } });
            }
            const allRoutes = await dist(origin, dest);
            let i = 0;
            for (const doc of match) {
                //  console.log(doc)
                const arrBin = []
                for (const image of doc.img) {
                    arrBin.push([image.contentType, image.data.toString('base64')])
                }
                allDocs.push({ price: doc.price, img: arrBin, id: doc.id, address: doc.address, dist: allRoutes[i] })
                i++;
            }
            res.send({ allDocs })
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.retrieveHostListing = async (req, res) => {
    try {
        const { user } = req.body;
        console.log(user)
        const match = await listingModel.find(
            {
                user: (user),
            }
        ).sort([['price', 1], ['startDate', 1]])
        if (match === null) {
            console.log("Error retrieving document")
        } else {
            //console.log(match)
            const allDocs = [];
            for (const doc of match) {
                const arrBin = []
                for (const image of doc.img) {
                    arrBin.push([image.contentType, image.data.toString('base64')])
                }
                allDocs.push({ price: doc.price, img: arrBin, id: doc.id, address: doc.address, startDate: doc.startDate, endDate: doc.endDate, desc: doc.desc, phoneNumber: doc.phoneNumber })
            }
            res.send({ allDocs })
        }
    } catch (err) {
        console.log(err)
    }
}