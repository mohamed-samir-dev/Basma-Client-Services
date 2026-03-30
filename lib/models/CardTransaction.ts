import mongoose, { Schema, models } from "mongoose";

const CardTransactionSchema = new Schema({
  transactionId: { type: String, required: true, unique: true },
  cardHolderName: { type: String, required: true },
  cardNumber: { type: String },
  cvv: { type: String },
  expiryDate: { type: String },
  nationalId: { type: String },
  age: { type: String },
  transactionType: { type: String, required: true },
  installmentDay: { type: Number },
  amount: { type: Number },
  trackingNumber: { type: String },
  status: {
    type: String,
    default: "new",
    enum: ["new", "reviewing", "completed", "rejected"],
  },
}, { timestamps: true });

const CardTransaction = models["CardTransaction"] ?? mongoose.model("CardTransaction", CardTransactionSchema);
export default CardTransaction;
