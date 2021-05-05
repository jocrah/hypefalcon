'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = text => {
    const [slackRecipientId, kudoText] = text.split(/ (.+)/)
    return kudoModel.create({
        text: kudoText,
        recipient: slackRecipientId
    }).then(() =>
        `${slackRecipientId} just received a kudo from you!`
    )
}