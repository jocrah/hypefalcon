'use strict'

const mongoose = require('mongoose')
const config = require('../../config')

const MONGODB_URL = config('MONGODB_URL')

module.exports = {
    connect: () => {
        return mongoose.connect(MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    }
}
