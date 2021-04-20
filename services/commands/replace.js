'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = text => {
    const [kudoId, kudoText] = text.split(/ (.+)/)
    return kudoModel.updateById(kudoId, {
        text: kudoText
    })
}