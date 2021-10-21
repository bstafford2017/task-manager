import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Login from '../interfaces/login'
import { response, generatePolicy } from '../utils'
import { secret } from '../config/index'
import { DynamoDB } from 'aws-sdk'

const db = new DynamoDB.DocumentClient()
const userTable = process.env.USERS_TABLE || ''

// @route   POST api/auth/login
// @desc    Authenticate user
// @access  Public
export const login = async (event: any) => {
  const { body } = event
  const { username, password }: Login = JSON.parse(body)

  if (!username || !password) {
    console.log('Invalid request')
    return response(400)
  }

  try {
    const { Items } = await db
      .scan({
        TableName: userTable,
        FilterExpression: 'username = :username and password = :password',
        ExpressionAttributeValues: {
          ':username': username,
          ':password': password
        },
        Limit: 1
      })
      .promise()

    if (!Items || Items.length === 0) {
      console.log('No users matched for username=%s', username)
      return response(400)
    }

    const storedUser = Items[0]

    const isMatch = await bcrypt.compare(password, storedUser.password)
    if (!isMatch) {
      console.log('Password does not match')
      return response(401)
    }

    const token = jwt.sign({ id: storedUser.id }, secret, {
      expiresIn: 3600
    })

    return response(200, {
      token,
      user: storedUser
    })
  } catch (err) {
    console.log('An error has occured error=%s', err)
    return response(500)
  }
}

export const authenticate = async (event: any) => {
  const { authorizationToken } = event
  if (!authorizationToken) {
    console.log('Invalid token')
    return response(401)
  }

  // Remove 'Bearer '
  const token = authorizationToken.substring(7, authorizationToken.length)
  try {
    const decoded = jwt.verify(token, secret)
    return generatePolicy(token.sub, 'Allow', event.methodArn)
  } catch (err) {
    console.log('An error has occured error=%s', err)
    return response(500)
  }
}
