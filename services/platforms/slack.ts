import request from '../../lib/request'
import config from '../../config'
import { SlackResponse } from '../../types'

const isSlackResponse = (
    response: any
): response is SlackResponse => {
    return 'members' in response
}

const getUserId = (handle: string) => {
    return request({
        uri: 'https://slack.com/api/users.list',
        form: {
            token: config('SLACK_OAUTH_TOKEN')
        },
        method: 'POST'
    }).then(response => {
        if (isSlackResponse(response)) {
            const { members } = response
            const memberWithHandle = members.find(member => handle === member.name)
            return memberWithHandle && memberWithHandle.id
        }
    })
}

export default () => ({
    getUserId
})