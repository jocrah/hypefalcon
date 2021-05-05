'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = async text => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel.groupCountByField({ field: 'recipient', limit })
        .then(kudoRanks =>
            kudoRanks.map(kudoRank =>
                `${kudoRank._id} : ${kudoRank.count}`
            ).join('\n')
        )
}