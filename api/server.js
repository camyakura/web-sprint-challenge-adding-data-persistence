// build your server here and require it from index.js
const express = require('express')

const projectRouter = require('./project/router')

const server = express()

server.use(express.json())

server.use('/api/projects', projectRouter)

module.exports = server