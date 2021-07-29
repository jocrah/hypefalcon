'use strict'


const { schema } = require('./schema')
import test from 'tape'
const kudoPath = schema.paths

test('recipient should be a string', (t) => {
    t.plan(1)
    t.equal(kudoPath.recipient.instance, 'String')
})

test('recipient should be required', (t) => {
    t.plan(1)
    t.equal(kudoPath.recipient.isRequired, true)
})

test('text should be a string', (t) => {
    t.plan(1)
    t.equal(kudoPath.text.instance, 'String')
})

test('text should be required', (t) => {
    t.plan(1)
    t.equal(kudoPath.text.isRequired, true)
})

test('createdAt should exist', (t) => {
    t.plan(1)
    t.equal(typeof kudoPath.createdAt.options.type(), 'string')
})

test('createdAt should be a date', (t) => {
    t.plan(1)
    t.notEqual(Date.parse(kudoPath.createdAt.options.type()), NaN)
})

test('updatedAt should exist', (t) => {
    t.plan(1)
    t.equal(typeof kudoPath.updatedAt.options.type(), 'string')
})

test('updatedAt should be a date', (t) => {
    t.plan(1)
    t.notEqual(Date.parse(kudoPath.updatedAt.options.type()), NaN)
})

test('workspace should be a string', (t) => {
    t.plan(1)
    t.equal(kudoPath.workspace.instance, 'String')
})

test('workspace should be required', (t) => {
    t.plan(1)
    t.equal(kudoPath.recipient.isRequired, true)
})
