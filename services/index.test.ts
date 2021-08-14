import test from 'tape'
import services from '.'


test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof services, 'function')
})

test('should export commands function', (t) => {
    t.plan(2)
    t.deepEqual(Object.keys(services()), ['commands'])
    t.equal(typeof services().commands, 'function')
})


