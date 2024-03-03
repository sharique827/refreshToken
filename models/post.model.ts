import mongoose, { Document } from 'mongoose';
import { Category } from '../utility/typings/enverx';

interface BlogPost extends Document {
  userId: mongoose.Types.ObjectId;
  blog: string;
  category: Category;
  isDeleted: boolean
}

const BlogPostSchema = new mongoose.Schema<BlogPost>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', indexed: true, required: true },
    blog: { type: String, maxLength: 256, required: true },
    category: { type: String, enum: Object.values(Category), required: true },
    isDeleted: { type: Boolean, default: false }
  },
  { timestamps: true }
)

export const Post = mongoose.model<BlogPost>("BlogPost", BlogPostSchema)