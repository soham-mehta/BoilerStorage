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
            res.send({success: true, notExist: false, firstName: match.firstName})
        } else {
            res.send({success: false, notExist: false})
        }
    } catch (err) {
        console.log(err)
        res.send("Invalid credentials")
    }
}