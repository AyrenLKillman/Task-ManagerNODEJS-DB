const express = require('express')
require('./db/mongoose')
const userRouter = require("./routers/userRoute")
const taskRouter = require("./routers/TaskRouter")



const app = express()
const port = process.env.PORT || 3000

//!Stops All requests
// app.use((req, res, next) => {
//     res.status(503).send('Server is in matenence currently, Try again later')
// })


//!stops GET requests
// app.use((req, res, next) => {
//     if (req.method === 'GET') {
//        res.send('GET requests are disabled')
//     } else {
//         next()
//     }
// })









app.use(express.json())
app.use(userRouter)
app.use(taskRouter)




//?Listening stuff
app.listen(port, () => {
    console.log("server running on port" + port)
})
//!