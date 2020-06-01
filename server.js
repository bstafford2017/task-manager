import express from 'express'
import mongoose from 'mongoose'
import path from 'path'
import config from './config/keys.js'

// Route Imports
import authRoutes from './routes/api/auth.js'
import usersRoutes from './routes/api/users.js'
import tasksRoutes from './routes/api/tasks.js'

const app = express()

// Middleware for body parser
app.use(express.json())

// DB Config
const db = config.mongoURI

// Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false)

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.error(err))

// Routes for API
app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/tasks', tasksRoutes)

// Server static asset if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve('client', 'build', 'index.html'))
    })
}

// Setup port
const port = process.env.PORT || 5000

// Listen for requests
app.listen(port, () => console.log(`Server listening on port ${port}`))
