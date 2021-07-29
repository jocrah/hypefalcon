'use strict'

const mongoose = require('mongoose')
const config = require('../../config')

const MONGODB_URL = config('MONGODB_URL')

module.exports = {
    connect: (customMongoDBUrl: string) => {
        return mongoose.connect(customMongoDBUrl || MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
    },
    isConnected: (): boolean => mongoose.connection.readyState === 1
}
