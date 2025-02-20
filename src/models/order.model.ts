import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  package: mongoose.Types.ObjectId;
  addOns: mongoose.Types.ObjectId[];
  totalPrice: number;
  status: "Pending" | "Completed" | "Cancelled";
  paymentStatus: "Unpaid" | "Paid";
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    package: { type: Schema.Types.ObjectId, ref: "Package", required: true },
    addOns: [{ type: Schema.Types.ObjectId, ref: "AddOn" }],
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ["Pending", "Completed", "Cancelled"], default: "Pending" },
    paymentStatus: { type: String, enum: ["Unpaid", "Paid"], default: "Unpaid" },
  },
  { timestamps: true }
);

export const Order = mongoose.model<IOrder>("Order", OrderSchema);
