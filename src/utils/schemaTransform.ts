import { Schema } from 'mongoose';

export function schemaTransform(schema: Schema){

  const options = {
    virtuals: true,
    versionKey: false,
    transform: (doc: any, ret: any) => { delete ret._id }
  }

  schema.set('toJSON', options);

  schema.set('toObject', options)

  schema.virtual('id').get(function(){
    return this._id.toHexString();
  });
}
