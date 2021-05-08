'use strict'

const commandService = require('./services/commands')

const processData = (req, res, next) => {
    const { team_id: workspaceId, text } = req.body
    const { platform } = req.params

    return commandService({ platform, textPayload: text, workspaceId })
        .then(response => res.status(200).json({
            response_type: 'in_channel',
            ...response && { text: response }
        }))
        .catch(next)
}

module.exports = {
    processData
}