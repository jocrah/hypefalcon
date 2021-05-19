'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ text: kudoId }) =>
    kudoModel.remove({ _id: kudoId }).then(() => 'Kudo successfully rescinded.')
