'use strict'
import test from 'tape'
const add = require('./add')
const utils = require('../../test/utils')
const kudoModel = require('../../models/kudos')()

test('before', async function (t) {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof add, 'function')
})

test('should successfully add new kudo', async (t) => {
    t.plan(1)
    await add({
        text: '@pbritwum nice one',
        platform: 'slack',
        userId: '123a',
        workspaceId: '123b'
    })

    const savedKudo = await kudoModel.get({
        text: 'nice one',
        platform: 'slack',
        userId: '123a',
        workspaceId: '123b'
    })

    t.ok(savedKudo)
})

test('should return right response', async (t) => {
    t.plan(1)

    const userId = '321a'
    const result = await add({
        text: '@pbritwum great stuff!',
        platform: 'slack',
        userId,
        workspaceId: '321b'
    })

    t.equal(result, `<@${userId}> just received a kudo from you!`)
})


test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})