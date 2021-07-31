import kudoModel from '../../models/kudos'

export default async ({ text }: { text: string }) => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel().fetch({
        query: {},
        sort: {
            createdAt: -1
        },
        ...limit && { limit }
    })
        .then(kudos => {
            if (!kudos.length) { return `There are currently no kudos` }
            const title = '*Current List of Kudos*'
            const kudoResponse = kudos.map(kudo => `[${kudo._id}] ${kudo.text} (recipient: <@${kudo.recipient}>)`)
                .join('\n')

            return `${title}\n${kudoResponse}`

        })
}