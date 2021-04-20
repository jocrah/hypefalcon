'use strict'

const commands = require('./services/commands')

const processData = async (data) => {
    const text = data.text
    const [command, additionalText] = text.split(/ (.+)/)
    await commands(command)(additionalText)
}

module.exports = {
    processData
}