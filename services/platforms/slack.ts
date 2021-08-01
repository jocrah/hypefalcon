import request from '../../lib/request'
import config from '../../config'

const getUserId = (handle: string) => {
    return request({
        uri: 'https://slack.com/api/users.list',
        form: {
            token: config('SLACK_OAUTH_TOKEN')
        },
        method: 'POST'
    }).then(response => {
        const { members } = response
        const memberWithHandle = members.find(member => handle === member.name)
        return memberWithHandle && memberWithHandle.id
    })
}

export default () => ({
    getUserId
})