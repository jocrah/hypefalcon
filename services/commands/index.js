'use strict'

const commands = {
    add: require('./add'),
    replace: require('./replace'),
    delete: require('./delete'),
    user: require('./user'),
    list: require('./list')
}

const commandNotFoundError = () => {
    throw Error('command not found')
}

module.exports = command => commands[command] || commandNotFoundError()