'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = async text => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel.groupCountByField({ field: 'recipient', limit })
        .then(kudoRanks => {
            if (!kudoRanks.length) { return 'There are currently no kudos' }

            const title = '*Kudos Leaderboard*'
            const rankResponse = kudoRanks.map(kudoRank =>
                `<@${kudoRank._id}> : ${kudoRank.count}`
            ).join('\n')

            return `${title}\n${rankResponse}`
        }
        )
}