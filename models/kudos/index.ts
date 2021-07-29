'use strict'
import { Document } from 'mongoose'

const model = require('./schema')

const kudoModel = {
    create(document: Document) {
        return model.create(document)
    },

    updateById(id: string, update: Object) {
        return model.findByIdAndUpdate(id, update, {
            new: true,
            lean: true
        })
    },

    fetch({ query, sort, limit }: { query: Object, sort: string, limit: number }) {
        return model.find(query, null, {
            ...sort && { sort },
            ...limit && { limit }
        })
    },

    get({ query }: { query: Object }) {
        return model.findOne(query)
    },

    remove({ query }: { query: Object }) {
        return model.deleteOne(query)
    },

    groupCountByField({ field, limit }: { field: string, limit: number }) {
        const aggregationPipeline: Array<Object> = [
            { '$sortByCount': `$${field}` }
        ]

        if (limit) {
            aggregationPipeline.push({ $limit: limit })
        }

        return model.aggregate(aggregationPipeline)
    }
}

module.exports = () => kudoModel