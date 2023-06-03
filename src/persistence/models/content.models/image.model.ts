import mongoose, { Document, Schema, Types } from 'mongoose';

interface IColor {
  hex: string;
  red: number;
  green: number;
  blue: number;
  area: number;
  hue: number;
  saturation: number;
  lightness: number;
  intensity: number;
}

interface IImage extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'image';
  url: string;
  fileReference: string;
  data: {
    tags: string[];
    colors: IColor[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const imageSchema = new Schema<IImage>(
  {
    _id: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    type: 'image',
    url: String,
    fileReference: String,
    data: {
      tags: [String],
      colors: [
        {
          hex: String,
          red: Number,
          green: Number,
          blue: Number,
          area: Number,
          hue: Number,
          saturation: Number,
          lightness: Number,
          intensity: Number,
        },
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IImage>('Image', imageSchema);
