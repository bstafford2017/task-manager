import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../../config/keys.js'
import auth from '../../middleware/auth.js'

// User Modal
import User from '../../models/User.js'
import { removeSpecialCharacters } from '../utils/specialCharacters.js'

const Router = express.Router()

// @route   GET api/users
// @desc    Get all users
// @access  Private
Router.get('/', auth, async (req, res) => {
  try {
    const users = await User.find()
    users.sort((a, b) => {
      return a.username.localeCompare(b.username)
    })
    res.json(users)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// @route   POST api/users
// @desc    Update a user
// @access  Private
Router.post('/:id', auth, async (req, res) => {
  try {
    req.body = req.body.map((e) => removeSpecialCharacters(e))

    if (Object.values(req.body).some((e) => !e)) {
      return res.status(400).json({ msg: 'Please enter all fields.' })
    }

    const { username, password, firstName, lastName, admin } = req.body

    res.json(
      await User.findOneAndUpdate({ _id: req.params.id }, updateUser, {
        new: true
      })
    )
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
Router.delete('/:id', auth, async (req, res) => {
  try {
    res.json(await User.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

export default Router
