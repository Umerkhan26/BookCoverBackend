import mongoose, { Document, Schema } from "mongoose";

export interface IAddOn extends Document {
  name: string;
  description?: string;
  price: number;
}

const AddOnSchema = new Schema<IAddOn>({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
});

export const AddOn = mongoose.model<IAddOn>("AddOn", AddOnSchema);
