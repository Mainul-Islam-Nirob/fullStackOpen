require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

mongoose
    .connect(config.MONGODB_URI, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true })
    .then(() => {
        logger.info("connected to MongoDB")
    })
    .catch((err) => {
        logger.error("Error connecting to db", err.message)
    })

// Because our server is in localhost port 3001, and our frontend in localhost port 3000, they do not have the same origin.take the middleware to use and allow for requests from all origins
app.use(cors())

// In order to access the data easily, we need the help of the express json - parser
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})