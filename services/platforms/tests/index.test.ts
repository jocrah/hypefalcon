import test from 'tape'
import platforms from '../'


test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof platforms, 'function')
})

test('should return object if platforms is called with valid platform', (t) => {
    t.plan(1)
    t.equal(typeof platforms('slack'), 'object')
})

test('should return error if platforms is called with invalid platform', (t) => {
    t.plan(1)
    t.throws(() => platforms('discord'), /platform is not supported/, 'does not return error')
})

