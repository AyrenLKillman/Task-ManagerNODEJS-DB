const mongoose = require('mongoose')

const Task = mongoose.model('task', {
    Finished: {
        type: Boolean,
        default: false
    },
    description:{
        type:String,
        required:true,
        trim: true,
    }
})

module.exports = Task