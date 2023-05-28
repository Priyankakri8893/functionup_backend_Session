const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {
    firstName : {
        type: String,
        required: true
    },
    lastName : String,
    mobile : String,
    emailId : String,
    password : String,
    gender : String,
	isDeleted: {
        type: Boolean,
        default: false
    }, //default value is false 
    age : Number
}, { timestamps: true });

module.exports = mongoose.model('User2', userSchema) 
