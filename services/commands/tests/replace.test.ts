import test from 'tape'
import replace from '../replace'
import kudoModel from '../../../models/kudos'
import utils from '../../../test/utils'

test('before', async (t) => {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof replace, 'function')
})

test('should update kudo text in database', async (t) => {
    t.plan(1)
    const kudo = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    const newKudoText = 'absolutely good stuff'
    await replace({ text: `${kudo._id} ${newKudoText}` })

    const savedKudo = await kudoModel().get({ _id: kudo._id })
    t.equal(savedKudo && savedKudo.text, newKudoText)
})

test('should return right response', async (t) => {
    t.plan(1)
    const kudo = await kudoModel().create({
        text: 'good product',
        recipient: 'mank',
        platform: 'slack',
        workspace: '343a'
    })

    const newKudoText = 'nice one. 100% recommend'
    const result = await replace({ text: `${kudo._id} ${newKudoText}` })
    t.equal(
        result,
        `Kudo with id ${kudo._id} successfully updated`
    )
})

test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})