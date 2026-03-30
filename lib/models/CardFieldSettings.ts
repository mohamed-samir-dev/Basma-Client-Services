import mongoose, { Schema, models } from "mongoose";

const CardFieldSettingsSchema = new Schema(
  {
    showExpiryDate: { type: Boolean, default: true },
    showCvv: { type: Boolean, default: true },
  },
  { timestamps: true },
);

export default models.CardFieldSettings ||
  mongoose.model("CardFieldSettings", CardFieldSettingsSchema);
