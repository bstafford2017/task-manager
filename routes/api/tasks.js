import express from 'express'
import auth from '../../middleware/auth.js'

// Task Modal
import Task from '../../models/Task.js'

const Router = express.Router()

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
Router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.find()
    tasks.sort((a, b) => {
      return b.date - a.date
    })
    res.json(tasks)
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
Router.post('/', auth, async (req, res) => {
  req.body = req.body.map((e) => removeSpecialCharacters(e))

  if (Object.values(req.body).some((e) => !e)) {
    return res.status(400).json({ msg: 'Please enter all fields.' })
  }

  const { title, category, description, important } = req.body

  try {
    const newTask = new Task({
      title,
      category,
      description,
      important
    })
    res.json(await newTask.save())
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// @route   POST api/tasks
// @desc    Update a task
// @access  Private
Router.post('/:id', auth, async (req, res) => {
  req.body = req.body.map((e) => removeSpecialCharacters(e))

  if (Object.values(req.body).some((e) => !e)) {
    return res.status(400).json({ msg: 'Please enter all fields.' })
  }

  const { title, category, description, important } = req.body

  try {
    const updateTask = {
      title,
      category,
      description,
      important: important === 'Yes' ? true : false
    }
    res.json(
      await Task.findOneAndUpdate({ _id: req.params.id }, updateTask, {
        new: false
      })
    )
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

// @route   DELETE api/tasks
// @desc    Delete a task
// @access  Private
Router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params

  if (!id) {
    return res.status(400).json({ msg: 'Please enter all fields.' })
  }

  try {
    res.json(await Task.findOneAndDelete({ _id: req.params.id }))
  } catch (err) {
    res.status(400).json({ msg: err.message })
  }
})

export default Router
