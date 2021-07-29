export { }
'use strict'
const kudoModel = require('../../models/kudos')()

type KudoRank = {
    count: number,
    _id: string
}

module.exports = async (text: string) => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel.groupCountByField({ field: 'recipient', limit })
        .then((kudoRanks: Array<KudoRank>) => {
            if (!kudoRanks.length) { return 'There are currently no kudos' }

            const title = '*Kudos Leaderboard*'
            const rankResponse = kudoRanks.map(kudoRank =>
                `<@${kudoRank._id}> : ${kudoRank.count}`
            ).join('\n')

            return `${title}\n${rankResponse}`
        }
        )
}