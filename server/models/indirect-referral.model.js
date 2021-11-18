import mongoose from "mongoose";

const indirectReferralSchema = new mongoose.Schema(
  {
    account_number: { type: String },
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    user_that_invite: {
      account_number: { type: String },
      user_id: { type: String, required: true, index: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    user: {
      account_number: { type: String },
      user_id: { type: String, required: true, index: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    value: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const IndirectReferral = mongoose.model(
  "IndirectReferral",
  indirectReferralSchema
);

export default IndirectReferral;
