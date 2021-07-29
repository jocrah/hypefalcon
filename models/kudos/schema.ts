'use strict'
import { Schema, model, Document } from 'mongoose'
interface Kudo extends Document {
    recipient: string,
    text: string,
    platform: string,
    workspace: string
}

const schema = new Schema<Kudo>({
    recipient: { type: String, required: true },
    text: { type: String, required: true },
    platform: { type: String, enum: ['slack'], required: true },
    workspace: { type: String, required: true }
},
    { timestamps: true }
)

module.exports = model<Kudo>('Kudo', schema)
