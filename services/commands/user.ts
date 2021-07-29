export { }
'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ userId }: { userId: string }) => {
    return kudoModel.fetch({
        query: {
            recipient: userId
        },
        sort: {
            createdAt: -1
        }
    }).then((kudos: Array<{ _id: string, text: string }>) => {
        if (!kudos.length) { return `<@${userId}> currently has no kudos` }

        const title = `<@${userId}>'s *Kudos*`
        const kudoResponse = kudos.map(kudo => `[${kudo._id}] ${kudo.text}`).join('\n')
        return `${title}\n${kudoResponse}`
    })

}