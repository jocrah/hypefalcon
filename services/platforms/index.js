'use strict'

const platforms = {
    slack: require('./slack')()
}

const unsupportedPlatformError = () => {
    throw Error('platform is not supported')
}

module.exports = platform => platforms[platform] || unsupportedPlatformError()

