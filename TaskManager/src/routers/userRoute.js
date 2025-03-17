const express = require('express')
const router = new express.Router()
const User = require("../models/user")

//!User Post
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    }catch (e) {
        res.status(400).send(e)    
    }
})

//! get all users
router.get('/users', async(req, res) => {

    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send(e)
    }


})

//! Get one user
router.get('/users/:id', async(req, res) => {
    const _id = req.params.id

    try{
        const user = await User.findById(_id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch (e) {
        res.status(500).send(e)
    }

})

//!Update User
router.patch('/users/:id', async(req, res) => {
    const _id = req.params.id

    const updates = Object.keys(req.body)
    const allowedUpdate = ["name", "email", "password", "age"]
    const isvalidOperation = updates.every((updates)=> allowedUpdate.includes(updates))

    if (!isvalidOperation) {
        return res.status(400).send({ error: "Invalid Update"})
    }

    try {
        const user = await User.findById(_id)

        updatez.forEach((updates) => user[updates] = req.body[updates])

        await user.save()

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    }catch (e) {
        res.status(400).send(e)
    }


})
//!User Delete
router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findByIdAndDelete(_id)

        if (!user){
            return res.status(404).send()
        }
        res.send(user)
    }catch (e) {
        res.status(500).send()
    }
})


module.exports = router

