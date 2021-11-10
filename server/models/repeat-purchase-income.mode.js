import mongoose from "mongoose";

const repeatPurchaseSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    user_that_order: {
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },

      is_stockist: { type: Boolean },
      is_admin: { type: Boolean },
      is_mega_center: { type: Boolean },
    },

    quantity: { type: Number },
    income: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const RepeatPurchase = mongoose.model("RepeatPurchase", repeatPurchaseSchema);

export default RepeatPurchase;
