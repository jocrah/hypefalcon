import test from 'tape'
import slack from '../slack'
import utils from '../../../test/utils'


test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof slack, 'function')
})

test('should export getUserId function', (t) => {
    t.plan(1)
    t.equal(typeof slack().getUserId, 'function')
})

test('getUserId should return right response', async (t) => {
    t.plan(1)
    utils.interceptors.mockGetSlackUsers({
        members: [
            {
                id: '123',
                name: 'clarke'
            }
        ]
    })
    const userId = await slack().getUserId('clarke')
    t.equal(userId, '123')
})