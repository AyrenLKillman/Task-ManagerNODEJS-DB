const express = require('express')
const router = new express.Router()
const User = require("../models/user")
const auth = require("../midware/auth")

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

//! logout

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send("this doesnt 100% work just use logout all for now")
    }catch (e) {
        res.status(500).send()
    }
})

//! logout all

router.post('/users/logoutALL', auth, async (req, res) => {
    try {
        req.user.tokens = []
        req.user.save()
        res.send()
    }catch(e) {
        res.status(500).send()
    }
})


//! get your user
router.get('/users/me',auth,async(req, res) => {
    res.send(req.user)
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

