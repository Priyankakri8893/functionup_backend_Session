const orderModel = require("../models/orderModel")
const userModel = require("../models/userModel")
const productModel = require("../models/productModel")

const createOrder= async function (req, res) {
    // TODO:  1) Header validation. return error if abset
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

    // TODO: 2) User validation
    let user = await userModel.findById(data.userId)
    if(!user) return res.send({status : false, message: "User not found"})

    // TODO: 3) Product validation
    let product = await productModel.findById(data.productId)
    if(!product) return res.send({status: false, message: "Product not found"})

    // TODO: 4) If free app, then dont deduct users balances and set amount to 0
    if(appHeader == 'true') {
        data.amount = 0
        let savedData= await orderModel.create(data)
        return res.send({status: true, data: savedData})
    }

    // TODO: 5) If paid app, then check user's balance. if not enough dont create the order and return an error
    if(appHeader != 'true') {
        if(user.balance < product.price) {
            return res.send({staus: false, message: "user doesn't jave enough balance"})
        } else {
            // TODO: 6) If paid app, then check user's balance. If enough then create and order
            data.amount = product.price
            let savedData= await orderModel.create(data)
            await userModel.findOneAndUpdate({_id:data.userId}, {balance:user.balance - product.price})
            return res.send({status: true, data: savedData})
        }
    }

    


    


}

module.exports.createOrder = createOrder