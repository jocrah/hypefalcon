'use strict'

if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development' }

if (process.env.NODE_ENV === 'development') { require('dotenv').config() }

module.exports = (key: string) => {
    if (process.env[key] === undefined) {
        throw new Error(`No config for env variable ${key}`)
    }
    return process.env[key]
}