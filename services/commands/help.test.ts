import test from 'tape'
import help from './help'

test('should be a function', (t) => {
    t.plan(1)
    t.equal(typeof help, 'function')
})

test('should return a string', async (t) => {
    t.plan(1)
    const result = await help()
    t.equal(typeof result, 'string')
})

test('should return right response', async (t) => {
    t.plan(1)
    const result = await help()
    t.equal(
        result,
        `
Want to congratulate a team member? Do \`\kudo add @teammember <text>\`
Want to list a number of recent kudos? Do \`\kudo list <number>\`. use \`*\` in place of \`<number>\` to list all
Want to update a kudo? Do \`\kudo replace <kudoId> <text>\`
Want to get ranked members in terms of kudos? Do \`\kudo top <number>\` use  \`*\` in place of \`<number>\` to get all ranks
Want to delete a kudo? Do \`\kudo delete <kudoId>\`
`
    )
})