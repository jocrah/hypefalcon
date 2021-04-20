const express = require('express')
const bodyParser = require('body-parser')
const actions = require('./actions')
const app = express()
const db = require('./lib/resources/db')
const port = 8000

app.use(bodyParser.urlencoded({ extended: true }))
    .post('/kudos', async (req, res) => {
        await actions.processData(req.body)
        return res.status(200).send()
    })

db.connect().then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})
