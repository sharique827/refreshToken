import mongoose,  { Document } from 'mongoose'

interface User extends Document {
  username: string
  email: string
  password: string
}

const UserSchema = new mongoose.Schema<User>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  { timestamps: true })

export const User = mongoose.model<User>('User', UserSchema)
