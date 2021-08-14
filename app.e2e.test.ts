import test from 'tape'
import utils from './test/utils'
const { api, interceptors } = utils
import kudoModel from './models/kudos'
import ObjectId from 'bson-objectid'

test('before', async function (t) {
    t.plan(1)
    await utils.dbSetup()
    t.ok(1)
})

// help
test('should return 200 for help command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=help&team_id=mypasel')
        .expect(200)
        .then(t.ok)
})

test('should return right response for help command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=help&team_id=mypasel')
        .expect({
            response_type: 'in_channel',
            text: `
Want to congratulate a team member? Do \`\kudo add @teammember <text>\`
Want to list a number of recent kudos? Do \`\kudo list <number>\`. use \`*\` in place of \`<number>\` to list all
Want to update a kudo? Do \`\kudo replace <kudoId> <text>\`
Want to get ranked members in terms of kudos? Do \`\kudo top <number>\` use  \`*\` in place of \`<number>\` to get all ranks
Want to delete a kudo? Do \`\kudo delete <kudoId>\`
`
        })
        .then(t.ok)
})

// list
test('should return 200 for list command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=list&team_id=mypasel')
        .expect(200)
        .then(t.ok)
})

test('should return right response for list command when no kudos', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=list&team_id=mypasel')
        .expect({
            response_type: 'in_channel',
            text: 'There are currently no kudos'
        })
        .then(t.ok)
})

test('should return right response for list command when number is passed and kudos exist', async (t) => {
    t.plan(1)

    const kudo = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    return api()
        .post('/kudos/slack')
        .send('text=list 1&team_id=mypasel')
        .expect({
            response_type: 'in_channel',
            text: `*Current List of Kudos*\n[${kudo._id}] ${kudo.text} (recipient: <@${kudo.recipient}>)`
        })
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})

// top 
test('should return 200 for top command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=top&team_id=mypasel')
        .expect(200)
        .then(t.ok)
})

test('should return right response for top command when no kudos', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=top&team_id=mypasel')
        .expect({
            response_type: 'in_channel',
            text: 'There are currently no kudos'
        })
        .then(t.ok)
})

test('should return right response for top command if there are kudos', async (t) => {
    t.plan(1)

    const firstRecipient = 'mank'
    await Promise.all([...Array(2)].map(() => kudoModel().create({
        text: 'good product',
        recipient: firstRecipient,
        platform: 'slack',
        workspace: '343a'
    })))

    const secondRecipient = 'oswell'
    await kudoModel().create({
        text: 'wonderful customer service',
        recipient: secondRecipient,
        platform: 'slack',
        workspace: '343a'
    })

    return api()
        .post('/kudos/slack')
        .send('text=top *&team_id=mypasel')
        .expect({
            response_type: 'in_channel',
            text: `*Kudos Leaderboard*\n<@${firstRecipient}> : 2\n<@${secondRecipient}> : 1`
        })
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})

// user
test('should return 200 for user command', (t) => {
    t.plan(1)
    interceptors.mockGetSlackUsers({
        members: [
            {
                id: '123',
                name: 'clarke'
            }
        ]
    })

    return api()
        .post('/kudos/slack')
        .send('text=user @clarke&team_id=mypasel')
        .expect(200)
        .then(t.ok)
})

test('should return right response if user has no existing kudos', async (t) => {
    t.plan(1)
    const userId = '1234'
    const username = 'clarke'

    interceptors.mockGetSlackUsers({
        members: [
            {
                id: userId,
                name: username
            }
        ]
    })

    return api()
        .post('/kudos/slack')
        .send(`text=user @${username}&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: `<@${userId}> currently has no kudos`
        })
        .then(t.ok)
})

test('should return right response if there are kudos', async (t) => {
    t.plan(1)

    const recipient = 'mank'
    const userId = '1234'

    interceptors.mockGetSlackUsers({
        members: [
            {
                id: userId,
                name: recipient
            }
        ]
    })

    const savedKudos = await Promise.all([...Array(2)].map(async () => {
        return kudoModel().create({
            text: 'good product',
            recipient: userId,
            platform: 'slack',
            workspace: '343a'
        })
    }))

    return api()
        .post('/kudos/slack')
        .send(`text=user @${recipient}&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: `<@${userId}>'s *Kudos*\n${savedKudos.map(kudo => `[${kudo._id}] ${kudo.text}`).join('\n')}`
        })
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})

// delete
test('should return 200 for delete command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send('text=delete&team_id=mypasel')
        .expect(200)
        .then(t.ok)
})

test('should return right response for delete kudo command', async (t) => {
    t.plan(1)
    const result = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    return api()
        .post('/kudos/slack')
        .send(`text=delete ${result._id}&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: 'Kudo successfully rescinded.'
        })
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})


// replace
test('should return 200 for replace command', (t) => {
    t.plan(1)
    return api()
        .post('/kudos/slack')
        .send(`text=replace ${new ObjectId().toHexString()} nice work Clarke!&team_id=mypasel`)
        .expect(200)
        .then(t.ok)
})

test('should return right response for replace command for existing kudo', async (t) => {
    t.plan(1)

    const kudo = await kudoModel().create({
        text: 'nice one',
        recipient: '123a',
        platform: 'slack',
        workspace: '123b'
    })

    return api()
        .post('/kudos/slack')
        .send(`text=replace ${kudo._id} nice work Clarke!&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: `Kudo with id ${kudo._id} successfully updated`
        })
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})

test('should return right response for replace command for non-existing kudo', async (t) => {
    t.plan(1)

    const sampleId = new ObjectId().toHexString()

    return api()
        .post('/kudos/slack')
        .send(`text=replace ${sampleId} nice work Clarke!&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: `Kudo with id ${sampleId} not found`
        })
        .then(t.ok)
})

// add
test('should return 200 for add command', (t) => {
    t.plan(1)

    const userId = '1234'
    const username = 'clarke'

    interceptors.mockGetSlackUsers({
        members: [
            {
                id: userId,
                name: username
            }
        ]
    })

    return api()
        .post('/kudos/slack')
        .send(`text=add @${username} nice work Clarke!&team_id=mypasel`)
        .expect(200)
        .then(async () => {
            t.ok(1)
            await utils.tearDown()
        })
})

test('should return right response for add command', (t) => {
    t.plan(1)

    const userId = '1234'
    const username = 'clarke'

    interceptors.mockGetSlackUsers({
        members: [
            {
                id: userId,
                name: username
            }
        ]
    })

    return api()
        .post('/kudos/slack')
        .send(`text=add @${username} nice work Clarke!&team_id=mypasel`)
        .expect({
            response_type: 'in_channel',
            text: `<@${userId}> just received a kudo from you!`
        }
        )
        .then(t.ok)
})


test('after', async function (t) {
    t.plan(1)
    await utils.tearDown(true)
    t.ok(1)
})