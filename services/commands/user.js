'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = userId => {
    return kudoModel.fetch({
        query: {
            recipient: userId
        },
        sort: {
            createdAt: -1
        }
    })

}