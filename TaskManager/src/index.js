const express = require('express')
require('./db/mongoose')
const Task = require('./models/task')
const userRouter = require("./routers/userRoute")
const taskRouter = require("./routers/TaskRouter")


const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




//?Listening stuff
app.listen(port, () => {
    console.log("server running on port" + port)
})
//!fixing stuff from 12.3 but tentically on 12.4