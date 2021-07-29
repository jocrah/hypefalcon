export { }
'use strict'

const request = require('../../lib/request')
const config = require('../../config')

type Member = {
    name: string,
    id: string
}

const getUserId = (handle: string) => {
    return request({
        uri: 'https://slack.com/api/users.list',
        form: {
            token: config('SLACK_OAUTH_TOKEN')
        },
        method: 'POST'
    }).then((response: { members: Array<Member> }) => {
        const { members } = response
        const memberWithHandle = members.find(member => handle === member.name)
        return memberWithHandle && memberWithHandle.id
    })
}

module.exports = () => ({
    getUserId
})