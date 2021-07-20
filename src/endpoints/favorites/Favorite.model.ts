import { model, Schema, Document, ObjectId } from 'mongoose'
import { schemaTransform } from '../../utils'

export interface FavoriteModel extends Document {
  user: ObjectId | string
  joke: string
  categories: string[]
}

const { Types } = Schema

const schema = new Schema<FavoriteModel>({
  user: {
    type: Types.ObjectId,
    ref: 'User'
  },
  jokeId: {
    type: String,
    default: ''
  },
  joke: {
    type: String,
    default: ''
  },
  categories: [{
   type: String,
   default: ''
  }]
}, {
  timestamps: true,
  versionKey: false
})

schemaTransform(schema)

export const Favorite = model<FavoriteModel>('Favorite', schema)
