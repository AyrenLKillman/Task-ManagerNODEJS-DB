const express = require('express')
const router = new express.Router()
const User = require("../models/user")

//!User created
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user, token})
    }catch (e) {
        res.status(400).send(e)    
    }
})

//! User Login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user , token })
    } catch (e) {
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

        updates.forEach((update) => user[update] = req.body[update])
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

