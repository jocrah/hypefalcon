import kudoModel from '../../models/kudos'

export default (payload: { text: string, userId: string, platform: string, workspaceId: string }): Promise<string> => {
    const { text, userId, platform, workspaceId } = payload
    const [, kudoText] = text.split(/ (.+)/)

    return kudoModel().create({
        text: kudoText,
        recipient: userId,
        platform,
        workspace: workspaceId
    }).then(() =>
        `<@${userId}> just received a kudo from you!`
    )
}