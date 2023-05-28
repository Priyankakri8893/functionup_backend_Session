const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema( {
    productId: {
        type: ObjectId,
        ref: "sabihasProduct"
    }, 
    userId: {
        type: ObjectId,
        ref: "sabihasUsers"
    },
    amount: Number,
    isFreeAppUser: Boolean,
    date: String
}, { timestamps: true });


module.exports = mongoose.model('sabihasOrder', orderSchema)
