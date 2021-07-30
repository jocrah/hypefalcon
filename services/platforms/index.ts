type Platforms = {
    [key: string]: Function
}

const platforms: Platforms = {
    slack: require('./slack').default()
}

const unsupportedPlatformError = () => {
    throw Error('platform is not supported')
}

export default (platform: string) => platforms[platform] || unsupportedPlatformError()

