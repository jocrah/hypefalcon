import model, { Kudo, KudoDocument } from './schema'
import { FilterQuery, UpdateQuery } from 'mongoose'

const kudoModel = {
    create(document: Kudo) {
        return model.create(document)
    },

    updateById(id: string, update: UpdateQuery<KudoDocument>) {
        return model.findByIdAndUpdate(id, update, {
            new: true,
            lean: true
        })
    },

    fetch({ query, sort, limit }: { query: FilterQuery<KudoDocument>, sort: object, limit?: number }) {
        return model.find(query, null, {
            ...sort && { sort },
            ...limit && { limit }
        })
    },

    get(query: object) {
        return model.findOne(query)
    },

    remove(query: FilterQuery<KudoDocument>) {
        return model.deleteOne(query)
    },

    groupCountByField({ field, limit }: { field: string, limit?: number }) {
        const aggregationPipeline: Object[] = [
            { '$sortByCount': `$${field}` }
        ]

        if (limit) {
            aggregationPipeline.push({ $limit: limit })
        }

        return model.aggregate(aggregationPipeline)
    }
}

export { Kudo }
export default () => kudoModel