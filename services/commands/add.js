'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = ({ text, userId, platform, workspaceId }) => {
    const [, kudoText] = text.split(/ (.+)/)

    return kudoModel.create({
        text: kudoText,
        recipient: userId,
        platform,
        workspace: workspaceId
    }).then(() =>
        `<@${userId}> just received a kudo from you!`
    )
}