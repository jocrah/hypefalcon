import express from 'express'
import db from './lib/resources/db'
import { processData } from './actions'
const app = express()

app.get(['/', '/health'], (req, res) => {
    if (db.isConnected()) {
        return res.sendStatus(200)
    }

    return res.sendStatus(503)
})

app.use(express.urlencoded({ extended: true }))
    .post('/kudos/:platform', processData)

export default app
