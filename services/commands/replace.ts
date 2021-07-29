export { }
'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ text }: { text: string }) => {
    const [kudoId, kudoText] = text.split(/ (.+)/)
    return kudoModel.updateById(kudoId, {
        text: kudoText
    }).then((kudo: { _id: string }) => `Kudo with id ${kudo._id} successfully updated`)
}