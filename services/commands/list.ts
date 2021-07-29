'use strict'
const kudoModel = require('../../models/kudos')()
import { Document } from 'mongoose'

interface Kudo extends Document {
    recipient: string,
    text: string,
    platform: string,
    workspace: string
}

module.exports = async ({ text }: { text: string }) => {
    let limit
    if (text !== '*') { limit = parseInt(text) }
    return kudoModel.fetch({
        query: {},
        sort: {
            createdAt: -1
        },
        ...limit && { limit }
    })
        .then((kudos: Array<Kudo>) => {
            if (!kudos.length) { return `There are currently no kudos` }
            const title = '*Current List of Kudos*'
            const kudoResponse = kudos.map(kudo => `[${kudo._id}] ${kudo.text} (recipient: <@${kudo.recipient}>)`)
                .join('\n')

            return `${title}\n${kudoResponse}`

        })
}