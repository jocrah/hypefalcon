export { }
'use strict'
const mongoose = require('mongoose')

const db = require('../lib/resources/db')
const config = require('../config')

const customMongoDBUrl = `${config('MONGODB_URL')}-test`

module.exports = {
    dbSetup: async (): Promise<void> => {
        if (!db.isConnected()) {
            await db.connect(customMongoDBUrl)
        }
    },
    tearDown: async (closeConnection = false) => {
        if (!db.isConnected()) {
            await db.connect(customMongoDBUrl)
        }
        await mongoose.connection.dropDatabase()

        closeConnection && await mongoose.disconnect()
    }
}