'use strict'

const test = require('tape')
const top = require('./top')
const kudoModel = require('../../models/kudos')()
const utils = require('../../test/utils')

test('before', async (t) => {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof top, 'function')
})

test('should return right response if there are no existing kudos', async (t) => {
    t.plan(1)
    const response = await top('*')

    t.equal(response, 'There are currently no kudos')
})

test('should return right response if there are kudos', async (t) => {
    t.plan(1)

    const firstRecipient = 'mank'
    await Promise.all([...Array(2)].map(() => kudoModel.create({
        text: 'good product',
        recipient: firstRecipient,
        platform: 'slack',
        workspace: '343a'
    })))

    const secondRecipient = 'oswell'
    await kudoModel.create({
        text: 'wonderful customer service',
        recipient: secondRecipient,
        platform: 'slack',
        workspace: '343a'
    })


    const result = await top('*')
    t.equal(
        result,
        `*Kudos Leaderboard*\n<@${firstRecipient}> : 2\n<@${secondRecipient}> : 1`)
})

test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})