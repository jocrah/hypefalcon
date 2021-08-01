import mongoose from 'mongoose'
import db from '../lib/resources/db'
import config from '../config'

const customMongoDBUrl = `${config('MONGODB_URL')}-test`

export default {
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