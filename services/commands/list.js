'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = async text => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel.fetch({
        query: {},
        sort: {
            createdAt: -1
        },
        ...limit && { limit }
    })

}