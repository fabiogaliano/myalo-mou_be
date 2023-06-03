import mongoose, { Document, Schema, Types } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  salt: string;
  content: {
    images: Types.ObjectId[];
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export type CreateIUser = { email: string; password: string };

const userSchema = new Schema<IUser>(
  {
    username: { type: String },
    email: { type: String, required: true }, // unique true
    password: { type: String, required: true },
    content: [
      {
        images: {
          type: Schema.Types.ObjectId,
          ref: 'Image',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', userSchema);
