import mongoose, { Schema, Document } from 'mongoose';

export interface ISlide extends Document {
  presentationId: mongoose.Types.ObjectId;
  order: number;
  title: string;
  content: string;
  notes?: string;
  imageUrl?: string;
  imagePrompt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const SlideSchema = new Schema<ISlide>(
  {
    presentationId: { type: Schema.Types.ObjectId, ref: 'Presentation', required: true, index: true },
    order: { type: Number, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    notes: { type: String },
    imageUrl: { type: String },
    imagePrompt: { type: String },
  },
  { timestamps: true }
);

export const Slide = mongoose.models.Slide || mongoose.model<ISlide>('Slide', SlideSchema);
