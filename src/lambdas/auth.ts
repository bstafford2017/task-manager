import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Login from '../interfaces/login'
import User from '../interfaces/user'
import { response, generatePolicy } from '../utils'
import { secret } from '../config/index'
import { DynamoDB } from 'aws-sdk'
import { v4 as uuid } from 'uuid'
import { CustomAuthorizerEvent } from 'aws-lambda'

const db = new DynamoDB.DocumentClient()
const userTable = process.env.USERS_TABLE || ''

// @route   POST api/auth/login
// @desc    Authenticate user
// @access  Public
export const login = async (event: any) => {
  const { body } = event
  const { username, password }: Login = JSON.parse(body)

  if (!username || !password) {
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
      return response(400)
    }

    const storedUser = Items[0]

    const isMatch = await bcrypt.compare(password, storedUser.password)
    if (!isMatch) {
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
    return response(500)
  }
}

export const authenticate = async (event: any) => {
  const { authorizationToken } = event
  if (!authorizationToken) {
    return response(401)
  }

  // Remove 'Bearer '
  const token = authorizationToken.substring(7, authorizationToken.length)
  try {
    const decoded = jwt.verify(token, secret)
    return generatePolicy(token.sub, 'Allow', event.methodArn)
  } catch (err) {
    return response(500)
  }
}
