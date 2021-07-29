'use strict'
const platforms = require('../platforms')

type Commands = {
    [key: string]: Function
}

const commands: Commands = {
    add: require('./add'),
    replace: require('./replace'),
    delete: require('./delete'),
    user: require('./user'),
    list: require('./list'),
    top: require('./top'),
    help: require('./help')
}

const commandNotFoundError = () => {
    throw Error('command not found')
}

const commandsRequiringPlatformId = ['add', 'user']

module.exports = async (payload: { platform: string, textPayload: string, workspaceId: string }) => {
    const { platform, textPayload, workspaceId } = payload
    let userId

    const [command, text] = textPayload.split(/ (.+)/)

    if (commandsRequiringPlatformId.includes(command)) {
        const [handle,] = text.split(/ (.+)/)
        userId = await platforms(platform).getUserId(handle.substring(1))
    }

    return commands[command]({ text, userId, platform, workspaceId }) || commandNotFoundError()
}