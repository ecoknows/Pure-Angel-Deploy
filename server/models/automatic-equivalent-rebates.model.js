import mongoose from "mongoose";

const automaticEquivalentRebatesSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    purchase_id: { type: String, required: true, index: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    user: {
      user_id: { type: String, required: true, index: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    quantity: { type: Number },
    income: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AutomaticEquivalentRebates = mongoose.model(
  "AutomaticEquivalentRebates",
  automaticEquivalentRebatesSchema
);

export default AutomaticEquivalentRebates;
