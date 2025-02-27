const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api', {

})

const User = mongoose.model('user', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
})

const bob = new User({
    name:"bob",
    age:69
})


bob.save().then(() => {
    console.log(bob)
}).catch((error) => {
    console.log(error, "error")
})

//!11.2