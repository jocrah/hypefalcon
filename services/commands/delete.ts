export { }
'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ text }: { text: string }): string =>
    kudoModel.remove({ _id: text }).then(() => 'Kudo successfully rescinded.')
