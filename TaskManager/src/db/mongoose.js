const mongoose = require('mongoose')
const validator = require("validator")

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

})

const Task = mongoose.model('task', {
    Task: {
        type: String,
        required: true
    },
    Finished: {
        type: Boolean,
        default: false
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
    description:{
        type:String,
        required:true,
        trim: true,
    }
})

const taskz = new Task({
    Task: 'walk the fish',
    email: 'test@chez.com',
    password: 'swaws39ruw9j',
    description: "self explanitory"
})


taskz.save().then(() => {
    console.log(taskz)
}).catch((error) => {
    console.log(error)
})
//!11.6 (this is just a massive presentation so dont start server yet)