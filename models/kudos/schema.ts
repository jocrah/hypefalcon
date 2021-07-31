import { Schema, model, Document } from 'mongoose'
export interface Kudo {
    recipient: string,
    text: string,
    platform: string,
    workspace: string
}

interface KudoDocument extends Kudo, Document { }

export const schema = new Schema<KudoDocument>({
    recipient: { type: String, required: true },
    text: { type: String, required: true },
    platform: { type: String, enum: ['slack'], required: true },
    workspace: { type: String, required: true }
},
    { timestamps: true }
)

export default model<KudoDocument>('Kudo', schema)
