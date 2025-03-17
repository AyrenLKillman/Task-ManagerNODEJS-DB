const mongoose = require('mongoose')
const validator = require("validator")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
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

userSchema.pre("save" , async function (next) {
    
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8)
    }

    next()
})


const User = mongoose.model('user', userSchema)

module.exports = User