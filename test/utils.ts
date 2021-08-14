import mongoose from 'mongoose'
import db from '../lib/resources/db'
import config from '../config'
import request from 'supertest'
import app from '../app'
import nock from 'nock'
import { SlackResponse } from '../types'

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
    },
    api: () => {
        return request(app)
    },
    interceptors: {
        mockGetSlackUsers: (response: SlackResponse) => {
            return nock('https://slack.com')
                .post('/api/users.list', { token: config('SLACK_OAUTH_TOKEN') })
                .reply(200, response)
        }
    }
}