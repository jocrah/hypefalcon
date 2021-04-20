'use strict'

const model = require('./schema')

const kudoModel = {
    create(document) {
        return model.create(document)
    },

    update(query, update) {
        return model.updateOne(query, update)
    }
}

module.exports = () => kudoModel