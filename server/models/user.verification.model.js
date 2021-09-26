import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },

    id_of_the_root_user_genealogy: { type: String, index: true },

    id_of_the_user_that_invite: { type: String, index: true },
    id_of_the_indirect_referral: { type: String, index: true },
    verified: { type: Boolean, default: false },

    income_direct_referral: { type: Number, default: 0 },
    income_indirect_referral: { type: Number, default: 0 },
    income_pairing_bonus: { type: Number, default: 0 },

    indirect_referral_count: { type: Number, default: 0 },

    pairing_bonus_count: { type: Number, default: 0 },
    starting_date_of_pairing_exceeded: { type: Date },
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
