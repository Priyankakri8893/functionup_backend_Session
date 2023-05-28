const userModel= require("../models/userModel")

const createUser= async function (req, res) {
    let appHeader = req.headers["isFreeAppUser"]
    if(!appHeader) appHeader = req.headers["isfreeappuser"]

    if(!appHeader) return res.send({status: false, message:"The mandatory header is not present"})

    console.log("request header is", appHeader)
    
    let data= req.body

    if(appHeader == 'true') {
        data.isFreeAppUser = true
    } else {
        data.isFreeAppUser = false
    }

    let savedData= await userModel.create(data)
    res.send({status: true, data: savedData})
}

module.exports.createUser= createUser
