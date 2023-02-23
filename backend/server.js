require('dotenv').config()
const express = require('express')
const workoutRoutes = require('./routes/workouts')
const userRoutes = require('./routes/user')
const mongoose = require('mongoose')
const requireAuth = require('./middleware/requireAuth')

// express app
const app = express()

// middleware
app.use(express.json())

// authenticate route
// app.use(requireAuth)

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

// connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for req
        app.listen(process.env.PORT, () => {
            console.log("connected to DB & listening on port", process.env.PORT)
        })
    })
    .catch((err) => {
        console.log(err)
    })

