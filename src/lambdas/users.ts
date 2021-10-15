import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { response } from '../utils'
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB.DocumentClient()

// @route   GET api/users
// @desc    Get all users
// @access  Private
export const getUsers = async () => {
  try {
    const { Items } = await db
      .scan({
        TableName: process.env.USERS_TABLE
      })
      .promise()
    return response(200, Items)
  } catch (err) {
    return response(500)
  }
}

// @route   POST api/users
// @desc    Create a user
// @access  Private
export const updateUser = async (event) => {
  try {
    const { body } = event
    const user = JSON.parse(body)
    await db
      .put({
        TableName: process.env.USERS_TABLE,
        Item: user
      })
      .promise()
    return response(200, user)
  } catch (err) {
    return response(500)
  }
}

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
export const deleteUser = async (event) => {
  try {
    const { pathParameters } = event
    const { id } = pathParameters
    await db
      .delete({
        TableName: process.env.USERS_TABLE,
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
