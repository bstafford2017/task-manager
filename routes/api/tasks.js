const express = require('express')
const Router = express.Router()

// Task Modal
const Task = require('../../models/Task')

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Public
Router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        tasks.sort((a, b) => {
            return a.date - b.date
        })
        res.json(tasks)
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   POST api/tasks
// @desc    Create a task
// @access  Public
Router.post('/', async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            important: req.body.important
        })
        res.json(await newTask.save())
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   UPDATE api/tasks
// @desc    Update a task
// @access  Public
Router.post('/:id', async (req, res) => {
    try {
        const updateTask = {
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            important: req.body.important
        }
        res.json(await Task.findOneAndUpdate(
            { _id: req.params.id },
            updateTask,
            { new: true }
        ))
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   DELETE api/tasks
// @desc    Delete a task
// @access  Public
Router.delete('/:id', async (req, res) => {
    try {
        res.json(await Task.findOneAndDelete({ _id: req.params.id }))
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

module.exports = Router
