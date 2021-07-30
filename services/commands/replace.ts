import kudoModel from '../../models/kudos'

export default ({ text }: { text: string }) => {
    const [kudoId, kudoText] = text.split(/ (.+)/)
    return kudoModel().updateById(kudoId, {
        text: kudoText
    }).then(kudo => kudo ? `Kudo with id ${kudo._id} successfully updated` : `Kudo with id ${kudoId} not found`)
}