const userModel = require("../models/userModel");

module.exports.getLogin = async (req, res) => {
    try {
        const match = await userModel.findOne({email: req.body.email})
        res.send({account: match.firstName})
    } catch (err) {
        console.log(err)
        res.send("Invalid credentials")
    }
}
module.exports.postSignUp = async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    try {
        const match = await userModel.findOne({email: email})

        if (match != null) {
            res.send({duplicate: true})
        } else {
            await userModel.insertMany([{email, password, firstName, lastName}])
            res.send({duplicate: false})
        }
    } catch (err) {
        console.log(err)
    }
    
}
module.exports.postLogin = async (req, res) => {
    try {
        const match = await userModel.findOne({email: req.body.email})
        if (match == null) {
            res.send({success: false, notExist: true})
        }
        else if (match.password === req.body.password) {
            res.send({success: true, notExist: false, details: {firstName: match.firstName, lastName: match.lastName, id: match._id, email: match.email}})
        } else {
            res.send({success: false, notExist: false})
        }
    } catch (err) {
        console.log(err)
        res.send("Invalid credentials")
    }
}

module.exports.postAccount = async(req, res) => {
    try {
        const match = await userModel.findById({_id: req.body.id})
        if (match == null) {
            res.send({success: false, notExist: true})
        }
        else {
            res.send({success: true, notExist: false, details: {firstName: match.firstName, lastName: match.lastName, id: match._id, email: match.email}})
        }
    } catch (err) {
        console.log(err)
        res.send("Invalid credentials")
    }
}

module.exports.editAccount = async(req, res) => {
    try {
        const filter = { _id: req.body.id };
        const update = { $set: {firstName: req.body.firstName, lastName: req.body.lastName, email: req.body.email, contactNumber: req.body.contactNumber }};
        if (!req.body.changedEmail) {
            const result = await userModel.updateOne(filter, update);
            res.send({success: true});
        } else {
            const match = await userModel.findOne({email: req.body.email})
            if (match == null) {
                const result = await userModel.updateOne(filter, update);
                res.send({success: true});
            }
            else {
                res.send({success: false});
            }
        }
    } catch (err) {
        console.log(err)
        res.send("Invalid credentials")
    }
}