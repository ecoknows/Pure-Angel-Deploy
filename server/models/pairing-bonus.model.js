import mongoose from "mongoose";

const pairingBonusSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },

    left: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    right: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    income: { type: String, default: 0 },
  },
  { timestamps: true }
);

const PairingBonus = mongoose.model("PairingBonus", pairingBonusSchema);

export default PairingBonus;
