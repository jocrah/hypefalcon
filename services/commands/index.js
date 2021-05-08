'use strict'
const platforms = require('../platforms')

const commands = {
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

module.exports = async ({ platform, textPayload, workspaceId }) => {
    let userId

    const [command, text] = textPayload.split(/ (.+)/)

    if (commandsRequiringPlatformId.includes(command)) {
        const [handle,] = text.split(/ (.+)/)
        userId = await platforms(platform).getUserId(handle.substring(1))
    }

    return commands[command]({ text, userId, platform, workspaceId }) || commandNotFoundError()
}