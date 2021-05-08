'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ userId }) => {
    return kudoModel.fetch({
        query: {
            recipient: userId
        },
        sort: {
            createdAt: -1
        }
    }).then(kudos => {
        if (!kudos.length) { return `<@${userId}> currently has no kudos` }

        const title = `<@${userId}>'s *Kudos*`
        const kudoResponse = kudos.map(kudo => `[${kudo._id}] ${kudo.text}`).join('\n')
        return `${title}\n${kudoResponse}`
    })

}