'use strict'

const model = require('./schema')

const kudoModel = {
    create(document) {
        return model.create(document)
    },

    update(id, update) {
        return model.findByIdAndUpdate(id, update, {
            new: true,
            lean: true
        })
    }
}

module.exports = () => kudoModel