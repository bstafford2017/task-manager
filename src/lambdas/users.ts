import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../interfaces/user'
import { secret } from '../config/index'
import { response } from '../utils'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'

const db = new DynamoDB.DocumentClient()
const userTable = process.env.USERS_TABLE || ''

// @route   GET api/users
// @desc    Get all users
// @access  Private
export const getUsers = async () => {
  try {
    const { Items } = await db
      .scan({
        TableName: userTable
      })
      .promise()
    return response(200, Items)
  } catch (err) {
    console.log('An error has occured error=%s', err)
    return response(500)
  }
}

// @route   POST api/users
// @desc    Create a user
// @access  Public
export const createUser = async (event: any) => {
  try {
    const { body } = event
    const { username, password, firstName, lastName, email } = JSON.parse(body)

    if (!username || !password || !firstName || !lastName || !email) {
      console.log('Invalid request')
      return response(400)
    }

    // Check for unique username
    const { Items: foundUsernames } = await db
      .scan({
        TableName: userTable,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
          ':username': username
        },
        Limit: 1
      })
      .promise()
    if (foundUsernames && foundUsernames.length > 0) {
      console.log('Username already exists')
      return response(400, { message: 'Username already exists' })
    }

    // Check for unique email
    const { Items: foundEmails } = await db
      .scan({
        TableName: userTable,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
          ':email': email
        },
        Limit: 1
      })
      .promise()
    if (foundEmails && foundEmails.length > 0) {
      console.log('Email already exists')
      return response(400, { message: 'Email already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user: User = {
      id: uuid(),
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      admin: false,
      createdOn: Date.now()
    }

    const token = await jwt.sign({ id: user.id }, secret, {
      expiresIn: 3600
    })

    await db
      .put({
        TableName: userTable,
        Item: user
      })
      .promise()
    return response(200, {
      token,
      user
    })
  } catch (err) {
    console.log('An error has occured error=%s', err)
    return response(500)
  }
}

// @route   DELETE api/users
// @desc    Delete a user
// @access  Private
export const deleteUser = async (event: any) => {
  try {
    const { pathParameters } = event
    const { id } = pathParameters
    await db
      .delete({
        TableName: userTable,
        Key: {
          id
        }
      })
      .promise()
    return response(200)
  } catch (err) {
    console.log('An error has occured error=%s', err)
    return response(500)
  }
}
