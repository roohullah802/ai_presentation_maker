import mongoose, { Schema, Document } from 'mongoose';

export interface IPresentation extends Document {
  userId: string;
  title: string;
  prompt: string;
  slideCount: number;
  style: string;
  tone: string;
  layout: string;
  status: 'DRAFT' | 'GENERATING' | 'COMPLETED' | 'FAILED';
  createdAt: Date;
  updatedAt: Date;
}

const PresentationSchema = new Schema<IPresentation>(
  {
    userId: { type: String, required: true, index: true },
    title: { type: String, required: true },
    prompt: { type: String, required: true },
    slideCount: { type: Number, required: true },
    style: { type: String, required: true },
    tone: { type: String, required: true },
    layout: { type: String, required: true },
    status: {
      type: String,
      enum: ['DRAFT', 'GENERATING', 'COMPLETED', 'FAILED'],
      default: 'DRAFT',
    },
  },
  { timestamps: true }
);

export const Presentation = mongoose.models.Presentation || mongoose.model<IPresentation>('Presentation', PresentationSchema);
