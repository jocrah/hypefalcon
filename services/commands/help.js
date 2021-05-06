'use strict'

module.exports = async () => {
    return `
Want to congratulate a team member? Do \`\kudo add @teammember <text>\`
Want to list a number of recent kudos? Do \`\kudo list <number>\`. use \`*\` in place of \`<number>\` to list all
Want to update a kudo? Do \`\kudo replace <kudoId> <text>\`
Want to get ranked members in terms of kudos? Do \`\kudo top <number>\` use  \`*\` in place of \`<number>\` to get all ranks
Want to delete a kudo? Do \`\kudo delete <kudoId>\`
    `
}