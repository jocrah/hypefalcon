'use strict'

const commands = require('./services/commands')

const processData = (req, res, next) => {
    const text = req.body.text
    const [command, additionalText] = text.split(/ (.+)/)
    return commands(command)(additionalText)
        .then(response => res.status(200).json({
            response_type: 'in_channel',
            ...response && { text: response }
        }))
}

module.exports = {
    processData
}