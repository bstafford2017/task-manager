import jwt from 'jsonwebtoken'
import Task from '../interfaces/task'
import { response } from '../utils'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const db = new DynamoDB.DocumentClient()

// @route   GET api/tasks
// @desc    Get all tasks
// @access  Private
export const getTasks = async () => {
  try {
    const { Items } = await db
      .scan({
        TableName: process.env.TASKS_TABLE
      })
      .promise()
    return response(200, Items)
  } catch (err) {
    return response(500)
  }
}

// @route   POST api/tasks
// @desc    Create a task
// @access  Private
export const createTask = async (event) => {
  try {
    const { body } = event
    const { title, category, description, important, date } = JSON.parse(body)

    if (!title || !category || !description || !important || !date) {
      return response(400)
    }

    const task: Task = {
      id: uuid(),
      title,
      category,
      description,
      important,
      date
    }
    await db
      .put({
        TableName: process.env.TASKS_TABLE,
        Item: task
      })
      .promise()
    return response(200, task)
  } catch (err) {
    return response(500)
  }
}

// @route   DELETE api/tasks
// @desc    Delete a task
// @access  Private
export const deleteTask = async (event) => {
  try {
    const { pathParameters } = event
    const { id } = pathParameters
    await db
      .delete({
        TableName: process.env.TASKS_TABLE,
        Key: {
          id
        }
      })
      .promise()
    return response(200)
  } catch (err) {
    return response(500)
  }
}
