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

interface BulletNote {
  text: string;
}


interface IImage extends Document {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  type: 'image';
  url: string;
  fileReference: string;
  data: {
    title: string;
    notes?: BulletNote[];
    tags?: string[];
    colors?: IColor[];
  };
  createdAt: Date;
  updatedAt: Date;
}

export type CreateIImage = { url: string; data: IImage["data"] };

const imageSchema = new Schema<IImage>(
  {
    userId: Schema.Types.ObjectId,
    type: {type: String, default: 'image'},
    url: String,
    fileReference: String,
    data: {
      title: String,
      notes: [{text: String}],
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
