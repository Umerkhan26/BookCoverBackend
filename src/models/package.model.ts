import mongoose, { Document, Schema } from "mongoose";

export interface IPackage extends Document {
  name: string;
  price: number;
  features: string[];
  freeFeatures: string[];
  page: string;
  conceptPricing?: { conceptCount: number; additionalPrice: number }[];
}

const PackageSchema = new Schema<IPackage>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  features: [{ type: String, required: true }],
  freeFeatures: [{ type: String, required: true }],
  page: { type: String, required: true },
  conceptPricing: [
    {
      conceptCount: { type: Number, required: true },
      additionalPrice: { type: Number, required: true }
    }
  ]
});

export const Package = mongoose.model<IPackage>("Package", PackageSchema);
