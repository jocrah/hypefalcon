'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const { processData } = require('./actions')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
    .post('/kudos', processData)

module.exports = app
