const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require("./controllers/blogs")

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


app.use(cors())
app.use(express.json())
app.use("/api/blogs", blogsRouter)


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})