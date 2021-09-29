import mongoose from "mongoose";

const directReferralSchema = new mongoose.Schema({
  user_id: { type: String, required: true, index: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  address: { type: String, required: true },

  root_user: {
    user_id: { type: String, index: true },
    first_name: { type: String },
    last_name: { type: String },
    address: { type: String },
  },

  user: {
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
  },

  income: { type: Number, default: 0 },
});

const DirectReferral = mongoose.model("DirectReferral", directReferralSchema);

export default DirectReferral;
