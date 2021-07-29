export { }
'use strict'

type Platforms = {
    [key: string]: Function
}

const platforms: Platforms = {
    slack: require('./slack')(),
}

const unsupportedPlatformError = () => {
    throw Error('platform is not supported')
}

module.exports = (platform: string) => platforms[platform] || unsupportedPlatformError()

