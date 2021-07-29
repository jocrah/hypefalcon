'use strict'

const app = require('./app')
const db = require('./lib/resources/db')
const port = 8000

db.connect().then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})
