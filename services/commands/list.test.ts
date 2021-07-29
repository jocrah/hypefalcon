'use strict'
import test from 'tape'
const list = require('./list')
const utils = require('../../test/utils')
const kudoModel = require('../../models/kudos')()

test('before', async (t) => {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof list, 'function')
})

test('should return right response when there is no kudo', async (t) => {
    t.plan(1)
    const response = await list({ text: '*' })
    t.equal(response, 'There are currently no kudos')
})

test('should successfully return right number of kudos when number is passed', async (t) => {
    t.plan(1)

    await kudoModel.create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    const response = await list({
        text: '1',
    })

    const numberOfKudos = response.split('\n').length - 1 // excluding response title

    t.equal(numberOfKudos, 1)
    await utils.tearDown()
})

test('should successfully return right number of kudos when * is passed', async (t) => {
    t.plan(1)

    const numberOfKudos = 2

    const promises = [...Array(numberOfKudos)].map(() => kudoModel.create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    }))

    await Promise.all(promises)

    const response = await list({
        text: '*',
    })

    const expectedNumberOfKudos = response.split('\n').length - 1 // excluding response title

    t.equal(numberOfKudos, expectedNumberOfKudos)
})

test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})