'use strict'

const model = require('./schema')

const kudoModel = {
    create(document) {
        return model.create(document)
    },

    updateById(id, update) {
        return model.findByIdAndUpdate(id, update, {
            new: true,
            lean: true
        })
    },

    fetch({ query, sort, limit }) {
        return model.find(query, null, {
            ...sort && { sort },
            ...limit && { limit }
        })
    }
}

module.exports = () => kudoModel