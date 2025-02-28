import mongoose, { Document, Schema } from "mongoose";

export interface IContact extends Document {
  firstName: string;
  lastName: string;
  email: string;
  referral: string;
  message: string;
}

const ContactSchema = new Schema<IContact>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  referral: { type: String, required: false },
  message: { type: String, required: true },
});

export const Contact = mongoose.model<IContact>("Contact", ContactSchema);
