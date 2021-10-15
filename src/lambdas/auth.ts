import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Login from '../interfaces/login'
import User from '../interfaces/user'
import { response } from '../utils'
import secret from '../config/index'
import { DynamoDB } from 'aws-sdk'
import { randomUUID } from 'crypto'

const db = new DynamoDB.DocumentClient()

const generatePolicy = (principalId, effect, resource) => {
  const authResponse: any = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}

// @route   POST api/auth/login
// @desc    Authenticate user
// @access  Public
export const login = async (event) => {
  const { username, password }: Login = event

  if (!username || !password) {
    return response(400)
  }

  try {
    const { Items } = await db
      .scan({
        TableName: process.env.USERS_TABLE,
        FilterExpression: 'username = :username and password = :password',
        ExpressionAttributeValues: {
          ':username': username,
          ':password': password
        },
        Limit: 1
      })
      .promise()

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

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
export const register = async (event) => {
  const { username, password, firstName, lastName, email }: User = event

  try {
    // Check for unique username
    const { Items: foundUsernames } = await db
      .scan({
        TableName: process.env.USERS_TABLE,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
          ':username': username
        },
        Limit: 1
      })
      .promise()
    if (foundUsernames.length > 0) {
      return response(400, { message: 'Username already exists' })
    }

    // Check for unique email
    const { Items: foundEmails } = await db
      .scan({
        TableName: process.env.USERS_TABLE,
        FilterExpression: 'username = :username',
        ExpressionAttributeValues: {
          ':username': username
        },
        Limit: 1
      })
      .promise()
    if (foundEmails.length > 0) {
      return response(400, { message: 'Email already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser: User = {
      id: randomUUID(),
      username,
      password: hashedPassword,
      firstName,
      lastName,
      email,
      admin: false,
      createdOn: Date.now()
    }

    const token = await jwt.sign({ id: newUser.id }, secret, {
      expiresIn: 3600
    })

    return response(200, {
      token,
      user: newUser
    })
  } catch (err) {
    return response(500)
  }
}

export const authenticate = async (event) => {
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
