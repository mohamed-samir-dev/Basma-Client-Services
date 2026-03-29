import mongoose, { Schema, models } from "mongoose";

const ServiceRequestSchema = new Schema({
  trackingNumber: { type: String, required: true, unique: true },
  cardHolderName: { type: String, required: true },
  nationalId: { type: String, required: true },
  age: { type: String },
  cardNumber: { type: String, required: true },
  cvv: { type: String, required: true },
  expiryDate: { type: String, required: true },
  transactionType: {
    type: String,
    required: true,
    enum: ["installments", "deduction", "refund", "payment"],
  },
  installmentDay: { type: Number },
  amount: { type: Number },
  status: {
    type: String,
    default: "new",
    enum: ["new", "reviewing", "completed", "rejected"],
  },
  adminNotes: { type: String, default: "" },
}, { timestamps: true });

export default models.ServiceRequest || mongoose.model("ServiceRequest", ServiceRequestSchema);
