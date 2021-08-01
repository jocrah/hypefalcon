type PlatformFunctions = {
    getUserId: Function
}

type Platforms = {
    [key: string]: PlatformFunctions
}

const platforms: Platforms = {
    slack: require('./slack').default()
}

const unsupportedPlatformError = () => {
    throw Error('platform is not supported')
}

export default (platform: string) => platforms[platform] || unsupportedPlatformError()

