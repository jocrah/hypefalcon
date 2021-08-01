import platforms from '../platforms'

type Commands = {
    [key: string]: Function
}

const commands: Commands = {
    add: require('./add').default,
    replace: require('./replace').default,
    delete: require('./delete').default,
    user: require('./user').default,
    list: require('./list').default,
    top: require('./top').default,
    help: require('./help').default
}

const commandNotFoundError = () => {
    throw Error('command not found')
}

const commandsRequiringPlatformId = ['add', 'user']

export default async (payload: { platform: string, textPayload: string, workspaceId: string }) => {
    const { platform, textPayload, workspaceId } = payload
    let userId

    const [command, text] = textPayload.split(/ (.+)/)

    if (commandsRequiringPlatformId.includes(command)) {
        const [handle,] = text.split(/ (.+)/)
        userId = await platforms(platform).getUserId(handle.substring(1))
    }

    return commands[command]({ text, userId, platform, workspaceId }) || commandNotFoundError()
}