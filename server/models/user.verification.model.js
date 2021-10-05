import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    secret_code: { type: String },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },

    verified: { type: Boolean, default: false },

    overall_income: { type: Number, default: 0 },
    unpaid_income: { type: Number, default: 0 },

    pairing_product_voucher: { type: Number, default: 0 },
    stockist: { type: Number, default: 0 },

    direct_referral: { type: Number, default: 0 },
    indirect_referral: { type: Number, default: 0 },
    pairing_bonus: { type: Number, default: 0 },
    automatic_equivalent_rebates: { type: Number, default: 0 },

    pairing_bonus_count: { type: Number, default: 0 },
    starting_date_of_pairing_exceeded: { type: Date },

    root_user_genealogy: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
      position: { type: String },
    },

    user_that_invite: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    indirect_referral_user: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);

export default UserVerification;
