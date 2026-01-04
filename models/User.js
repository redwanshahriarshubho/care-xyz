import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  nid: { type: String }, // Made optional
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
}, { timestamps: true })

export default mongoose.models.User || mongoose.model('User', UserSchema)