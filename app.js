'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const actions = require('./actions')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
    .post('/kudos', async (req, res) => {
        await actions.processData(req.body)
        return res.status(200).send()
    })

module.exports = app
