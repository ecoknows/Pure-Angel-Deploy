import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, index: true },
    password: { type: String, index: true },

    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true, index: true },
    address: { type: String, required: true, index: true },
    birthdate: { type: String, required: true, index: true },

    is_stockist: { type: Boolean },
    is_admin: { type: Boolean },
    is_ancestor: { type: Boolean, index: true },

    direct_referral: { type: Number, default: 0 },
    indirect_referral: { type: Number, default: 0 },
    pairing_bonus: { type: Number, default: 0 },
    automatic_equivalent_rebates: { type: Number, default: 0 },
    direct_selling: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
