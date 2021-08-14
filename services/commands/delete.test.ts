import test from 'tape'
import deleteKudo from './delete'
import utils from '../../test/utils'
import kudoModel from '../../models/kudos'

test('before', async function (t) {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof deleteKudo, 'function')
})

test('should successfully delete kudo', async (t) => {
    t.plan(1)
    const result = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    await deleteKudo({
        text: result._id
    })

    const kudo = await kudoModel().get({
        text: 'nice one',
        platform: 'slack',
        userId: '123a',
        workspaceId: '123b'
    })

    t.notOk(kudo)
})

test('should return right response', async (t) => {
    t.plan(1)

    const savedKudo = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    const result = await deleteKudo({
        text: savedKudo._id
    })

    t.equal(result, 'Kudo successfully rescinded.')
})


test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})