import mongoose, { Schema, models } from "mongoose";

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  identityNumber: { type: String, required: true, unique: true },
  birthDate: { type: String },
  phone: { type: String },
  orderNumber: { type: String, required: true },
  verificationCode: { type: String, required: true },
  status: { type: String, default: "active", enum: ["active", "inactive"] },
}, { timestamps: true });

export default models.Customer || mongoose.model("Customer", CustomerSchema);
