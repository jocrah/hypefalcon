'use strict'

const model = require('./schema')

const kudoModel = {
    create(document) {
        return model.create(document)
    }
}

module.exports = () => kudoModel