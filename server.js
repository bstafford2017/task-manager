const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express()

const users = require('./routes/api/users')
const tasks = require('./routes/api/tasks')

// Middleware for body parser
app.use(express.json())

// DB Config
const db = require('./config/keys').mongoURI

// Make Mongoose use `findOneAndUpdate()`
mongoose.set('useFindAndModify', false);

// Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.error(err))

// Routes for API
app.use('/api/users', users)
app.use('/api/tasks', tasks)

// Server static asset if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server listening on port ${port}`))