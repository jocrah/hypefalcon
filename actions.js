'use strict'

const commands = require('./services/commands')

const processData = (data) => {
    const text = data.text
    const [command, additionalText] = text.split(/ (.+)/)
    commands(command)(additionalText)
}

module.exports = {
    processData
}