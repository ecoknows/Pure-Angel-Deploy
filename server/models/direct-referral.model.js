import mongoose from "mongoose";

const directReferralSchema = new mongoose.Schema({
  account_number: { type: String },
  user_id: { type: String, required: true, index: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String },

  root_user: {
    account_number: { type: String },
    user_id: { type: String, index: true },
    first_name: { type: String },
    last_name: { type: String },
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
});

const DirectReferral = mongoose.model("DirectReferral", directReferralSchema);

export default DirectReferral;
