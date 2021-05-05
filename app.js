'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const actions = require('./actions')
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
    .post('/kudos', async (req, res) => {
        const response = await actions.processData(req.body)
        return res.status(200).json({
            response_type: 'in_channel',
            text: response
        })
    })

module.exports = app
