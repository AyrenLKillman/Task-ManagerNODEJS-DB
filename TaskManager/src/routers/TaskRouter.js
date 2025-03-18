const express = require('express')
const router = new express.Router()
const Task = require("../models/task")



//!Task Post
router.post('/tasks', async(req, res) => {
    const task = new Task(req.body)


    try {
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)    
    }
})

//! get all tasks
router.get('/tasks', async(req, res) => {

    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        res.status(500).send(e)
    }
})

//! Get one task
router.get('/tasks/:id', async(req, res) => {
    const _id = req.params.id

    try{
        const task = await Task.findById(_id)

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(500).send(e)
    }
})

//!Update tasks
router.patch('/tasks/:id', async(req, res) => {
    const _id = req.params.id
    const updates = Object.keys(req.body)
    const allowedUpdate = ["Finished", "description"]
    const isvalidOperation = updates.every((updates)=> allowedUpdate.includes(updates))

    if (!isvalidOperation) {
        return res.status(400).send({ error: "Invalid Update"})
    }

    try {
        const task = await Task.findById(_id)

        updates.forEach((update) => task[update] =req.body[update])
        await task.save()

        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    }catch (e) {
        res.status(400).send(e)
    }


})

//!Task Delete
router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findByIdAndDelete(_id)

        if (!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch (e) {
        res.status(500).send()
    }
})

module.exports = router