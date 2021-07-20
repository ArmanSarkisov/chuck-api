import { model, Schema, Document, ObjectId } from 'mongoose'
import { schemaTransform } from '../../utils'

export interface UserModel extends Document {
  email: string
  password: string
  username: string
  favorites: ObjectId[]
}

const { Types } = Schema

const schema = new Schema<UserModel>({
  email: {
    type: String,
    default: ''
  },
  password: {
    type: String,
    default: ''
  },
  username: {
    type: String,
    default: ''
  },
  favorites: [
    { type: Types.ObjectId, ref: 'Favorite' }
  ]
}, {
  timestamps: true,
  versionKey: false
})

schemaTransform(schema)

export const User = model<UserModel>('User', schema)
