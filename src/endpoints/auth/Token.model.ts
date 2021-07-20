import { model, Schema, Document, ObjectId } from 'mongoose'
import { schemaTransform } from '../../utils'

export interface TokenModel extends Document {
  token: string
  user: ObjectId
  expireAt: Date
}

const { Types: { ObjectId } } = Schema

const schema = new Schema<TokenModel>({
  token: {
    type: String,
    default: ''
  },
  user: {
    type: ObjectId,
    ref: 'User'
  },
  expireAt: {
    type: Date,
    default: new Date()
  }
}, {
  timestamps: true,
  versionKey: false
})

schemaTransform(schema)

export const TokenModel = model<TokenModel>('TokenModel', schema)
