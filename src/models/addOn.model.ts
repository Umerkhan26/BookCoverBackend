// import mongoose, { Document, Schema } from "mongoose";

// export interface IAddOn extends Document {
//   name: string;
//   qty: number; // ✅ Changed from description to qty
//   price: number;
//   page: string;
// }

// const AddOnSchema = new Schema<IAddOn>({
//   name: { type: String, required: true },
//   qty: { type: Number, required: true }, // ✅ Added qty field
//   price: { type: Number, required: true },
//   page: { type: String, required: true }, 
// });

// export const AddOn = mongoose.model<IAddOn>("AddOn", AddOnSchema);

import mongoose, { Schema, model, Document } from "mongoose";

export interface IAddOn extends Document {
  name: string;
  qty: number;
  price: number;
  page: string;
  package: mongoose.Types.ObjectId; // ✅ Use 'package' instead of 'packageId'
}

export const AddOnSchema = new Schema<IAddOn>({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  page: { type: String, required: true },
  package: { type: Schema.Types.ObjectId, ref: "Package", required: true } // ✅ Ensure it's 'package'
});

export const AddOn = model<IAddOn>("AddOn", AddOnSchema);
