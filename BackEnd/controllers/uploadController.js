const listingModel = require("../models/listingModel");
const imageModel = require("../models/imageModel");
const multer = require("multer");
const mongoose = require('mongoose');

const upload = multer({storage: multer.memoryStorage(), limits: { files: 5}})

module.exports.uploadListing = async (req, res) => {
    try {
        //Upload listing
        await listingModel.insertMany({
            user: new mongoose.Types.ObjectId(req.body.user),
            price: req.body.price,
            address: req.body.address,
            startDate: new Date(req.body.startDate),
            endDate: new Date(req.body.endDate),
            desc: req.body.desc
        })

        //Upload images
        const images = req.files
        const idArr = []

        const imageDocs = images.map((image) => {
            const cur = new imageModel();
            cur._id = new mongoose.Types.ObjectId();   
            cur.data = image.buffer;
            cur.contentType = image.mimetype;
            idArr.push(cur._id)
            return cur;
        })
        await imageModel.insertMany(imageDocs);
        await listingModel.updateOne(
            {
                user: new mongoose.Types.ObjectId(req.body.user)
            },
            {
                $set: 
                {
                    img: idArr
                }
            }
        )
        //console.log(idArr)
        console.log("Finished running")
        res.send("Success")
    } catch (err) {
        console.log(err)
    }
}

module.exports.upload = upload;

module.exports.retrieveListing = async (req, res) => {
    try {
        const match = await listingModel.findById(req.body.id)
        if (match === null) {
            
        } else {
            const arrBin = []
            for (const image of match.img) {
                const curImg = await imageModel.findById(image);
                //console.log(curImg.data.toString('base64'))
                arrBin.push([curImg.contentType, curImg.data.toString('base64')])
            }
            console.log(arrBin)
            res.send({price: match.price, img: arrBin})
            console.log("Finished running")
        }
    } catch (err) {
        console.log(err)
    }
}

module.exports.retrieveMany = async (req, res) => {
    try {
        const { date, price, location } = req.body;
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
                console.log(doc)
                const arrBin = []
                for (const image of doc.img) {
                    const curImg = await imageModel.findById(image);
                    //console.log(curImg.data.toString('base64'))
                    arrBin.push([curImg.contentType, curImg.data.toString('base64')])
                }
                allDocs.push({price: doc.price, img: arrBin, id: doc.id, address: doc.address})
                //console.log(allDocs)
                //console.log("Finished running")
            }
            console.log(allDocs)
            res.send({allDocs})
        }
    } catch (err) {
        console.log(err)
    }
}