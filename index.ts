import app from './app'
import db from './lib/resources/db'
const port = 8000

db.connect().then(() => {
    app.listen(port, () => console.log(`App listening on port ${port}!`))
})
