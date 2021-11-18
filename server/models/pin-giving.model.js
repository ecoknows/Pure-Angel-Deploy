import mongoose from "mongoose";

const pinGivingSchema = new mongoose.Schema(
  {
    account_number: { type: String, required: true },
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    recipient: {
      account_number: { type: String, required: true },
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    quantity: { type: Number, required: true, default: 0 },
    soap_quantity: { type: Number, required: true, default: 0 },
    coffee_quantity: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const PinGiving = mongoose.model("PinGiving", pinGivingSchema);

export default PinGiving;
