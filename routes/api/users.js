const express = require('express')
const Router = express.Router()

// User Modal
const User = require('../../models/User')

// @route   GET api/users
// @desc    Get all users
// @access  Public
Router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        users.sort((a, b) => {
            return a.username.localeCompare(b.username)
        })
        res.json(users)
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   POST api/users
// @desc    Create a user
// @access  Public
Router.post('/', async (req, res) => {
    try {
        const newUser = new User({
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.admin
        })
        res.json(await newUser.save())
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   UPDATE api/users
// @desc    Update a user
// @access  Public
Router.post('/:id', async (req, res) => {
    try {
        const updateUser = {
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            admin: req.body.admin
        }
        res.json(await User.findOneAndUpdate(
            { _id: req.params.id },
            updateUser,
            { new: true }
        ))
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

// @route   DELETE api/users
// @desc    Delete a user
// @access  Public
Router.delete('/:id', async (req, res) => {
    try {
        res.json(await User.findOneAndDelete({ _id: req.params.id }))
    } catch(err) {
        res.status(400).json({ msg: err.toString() })
    }
})

module.exports = Router