import mongoose from 'mongoose'
import config from '../../config'

const MONGODB_URL = config('MONGODB_URL')

export default {
    connect: (customMongoDBUrl?: string) => {
        return mongoose.connect(customMongoDBUrl || MONGODB_URL)
    },
    isConnected: (): boolean => mongoose.connection.readyState === 1
}
