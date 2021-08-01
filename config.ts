if (!process.env.NODE_ENV) { process.env.NODE_ENV = 'development' }

if (process.env.NODE_ENV === 'development') { require('dotenv').config() }

export default (key: string): string => {
    const value = process.env[key]
    if (value === undefined) {
        throw new Error(`No config for env variable ${key}`)
    } else {
        return value
    }
}