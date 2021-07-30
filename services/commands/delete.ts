import kudoModel from '../../models/kudos'

export default ({ text }: { text: string }): Promise<string> =>
    kudoModel().remove({ _id: text }).then(() => 'Kudo successfully rescinded.')
