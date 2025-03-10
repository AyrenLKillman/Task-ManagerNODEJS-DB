const mongoose = require('mongoose')
const validator = require("validator")


const User = mongoose.model('user', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value <  0) {
                throw new Error("age cant be negative")
            }
        }
    },
    email:{
        type: String,
        required:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email not valid')
            }
        }
    },
    password:{
        type:String,
        required:true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error('password cant have "password" in it')
            }
        }
    },
})

module.exports = User