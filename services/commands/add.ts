'use strict'
const kudoModel = require('../../models/kudos')()

module.exports = (payload: { text: string, userId: string, platform: string, workspaceId: string }): string => {
    const { text, userId, platform, workspaceId } = payload
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