import mongoose from "mongoose";

const automaticEquivalentRebatesSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    buyer: {
      user_id: { type: String, required: true, index: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    seller: {
      user_id: { type: String, required: true, index: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    package: { type: String },
    product: { type: String, required: true },
    quantity: { type: Number },
    value: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const AutomaticEquivalentRebates = mongoose.model(
  "AutomaticEquivalentRebates",
  automaticEquivalentRebatesSchema
);

export default AutomaticEquivalentRebates;
