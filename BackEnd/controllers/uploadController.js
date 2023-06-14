const listingModel = require("../models/listingModel");
const multer = require("multer");
const mongoose = require('mongoose');
const userModel = require("../models/userModel");

const upload = multer({storage: multer.memoryStorage(), limits: { files: 5}})
const axios = require("axios")
module.exports.upload = upload;

module.exports.uploadListing = async (req, res) => {
    try {
        

        //Upload images
        const images = req.files
        //let idArr = []

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

        /*await imageModel.insertMany(imageDocs);
        await listingModel.updateOne(
            {
                _id: result[0]._id
            },
            {
                $set: 
                {
                    img: idArr
                }
            }
        )*/
        //console.log(idArr)
        //console.log("Finished running")
        res.send("Success")
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
                lat: match.lat
            }
            res.send({listing: data})
            //console.log("Finished running")
        }
    } catch (err) {
        console.log(err)
    }
}

const dist = async (origin, dest) => {
    const url = `https://api.tomtom.com/routing/1/calculateRoute/${origin.lat},${origin.lon}:${dest.lat},${dest.lon}/json?instructionsType=text&language=en-US&vehicleHeading=90&sectionType=traffic&report=effectiveSettings&routeType=eco&traffic=true&avoid=unpavedRoads&travelMode=car&vehicleMaxSpeed=120&vehicleCommercial=false&vehicleEngineType=combustion&key=mPKAe08o98VphQ0zNO2fG1l6eUPRVpTh`
    const res = await axios.get(url)
    return res.data.routes[0].summary.lengthInMeters;
}

module.exports.retrievePage = async (req, res) => {
    try {
        const { date, price, lat, lon } = req.body;
        const match = await listingModel.find(
            {
                price: { $gte: price},
                startDate: { $gte: date}
            }
        ).sort([['price', 1], ['startDate', 1]])
        if (match === null) {
            console.log("Error retrieving document")
        } else {
            const allDocs = []
            for (const doc of match) {
                //  console.log(doc)
                const arrBin = []
                for (const image of doc.img) {
                    arrBin.push([image.contentType, image.data.toString('base64')])
                }
                allDocs.push({price: doc.price, img: arrBin, id: doc.id, address: doc.address})
            }
            //console.log(allDocs)
            res.send({allDocs})
        }
    } catch (err) {
        console.log(err)
    }
    //, dist: await dist({lat, lon}, {lat: doc.lat, lon: doc.lon})
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
            console.log(match)
            const allDocs = []
            for (const doc of match) {
                //  console.log(doc)
                const arrBin = []
                for (const image of doc.img) {
                    arrBin.push([image.contentType, image.data.toString('base64')])
                }
                allDocs.push({price: doc.price, img: arrBin, id: doc.id, address: doc.address, startDate: doc.startDate, endDate: doc.endDate, desc: doc.desc, phoneNumber: doc.phoneNumber })
            }
            console.log(allDocs)
            res.send({allDocs})
        }
    } catch (err) {
        console.log(err)
    }
}