import express from 'express'
import bodyParser from 'body-parser'
import { processData } from './actions'
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
    .post('/kudos/:platform', processData)

module.exports = app
