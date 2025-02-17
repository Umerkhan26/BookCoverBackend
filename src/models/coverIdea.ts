import mongoose, { Schema, Document } from "mongoose";

// Define an interface for TypeScript
export interface IBookRequest extends Document {
  name: string;
  title: string;
  genre?: string;
  isSeries: boolean;
  description: string;
  coverPreference: string[]; // Array of selected cover types
  mainCharacters?: string;
  keyObjects?: string;
  setting?: string;
  comparableCovers: string[]; // URLs of uploaded images
  email: string;
}

const BookRequestSchema: Schema = new Schema<IBookRequest>({
  name: { type: String, required: true },
  title: { type: String, required: true },
  genre: { type: String },
  isSeries: { type: Boolean, default: false },
  description: { type: String, required: true },
  coverPreference: { type: [String], required: true },
  mainCharacters: { type: String },
  keyObjects: { type: String },
  setting: { type: String },
  comparableCovers: { type: [String], default: [] },
  email: { type: String, required: true },
});

// Exporting the model
export default mongoose.model<IBookRequest>("BookRequest", BookRequestSchema);
