'use strict'

const test = require('tape')
const user = require('./user')
const kudoModel = require('../../models/kudos')()
const utils = require('../../test/utils')
const delay = require('util').promisify(setTimeout)

test('before', async (t) => {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof user, 'function')
})

test('should return right response user has no existing kudos', async (t) => {
    t.plan(1)
    const userId = '1234'
    const response = await user({ userId })

    t.equal(response, `<@${userId}> currently has no kudos`)
})

test('should return right response if there are kudos', async (t) => {
    t.plan(1)

    const recipient = 'mank'

    const savedKudos = await Promise.all([...Array(2)].map(async () => {
        return kudoModel.create({
            text: 'good product',
            recipient,
            platform: 'slack',
            workspace: '343a'
        })
    }))

    console.log({ savedKudos })

    const result = await user({ userId: recipient })

    const title = `<@${recipient}>'s *Kudos*`
    const kudoResponse = savedKudos.map(kudo => `[${kudo._id}] ${kudo.text}`).join('\n')
    const expectedResponse = `${title}\n${kudoResponse}`

    t.equal(
        result,
        expectedResponse
    )
})

test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})