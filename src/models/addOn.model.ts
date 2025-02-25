import mongoose, { Document, Schema } from "mongoose";

export interface IAddOn extends Document {
  name: string;
  qty: number; // ✅ Changed from description to qty
  price: number;
  page: string;
}

const AddOnSchema = new Schema<IAddOn>({
  name: { type: String, required: true },
  qty: { type: Number, required: true }, // ✅ Added qty field
  price: { type: Number, required: true },
  page: { type: String, required: true }, 
});

export const AddOn = mongoose.model<IAddOn>("AddOn", AddOnSchema);
