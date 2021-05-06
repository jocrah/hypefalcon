'use strict'

const commands = require('./services/commands')

const processData = (req, res, next) => {
    const { text } = req.body
    const [command, additionalText] = text.split(/ (.+)/)
    return commands(command)(additionalText)
        .then(response => res.status(200).json({
            response_type: 'in_channel',
            ...response && { text: response }
        }))
        .catch(next)
}

module.exports = {
    processData
}