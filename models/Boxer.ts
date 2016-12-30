import * as mongoose from 'mongoose';

export interface IBoxer extends mongoose.Document {
  name: string,
  age: number,
  weight: number,
}

let BoxerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  weight: Number
});
export default mongoose.model<IBoxer>('Boxer', BoxerSchema);
