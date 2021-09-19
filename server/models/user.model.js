import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String },
    password: { type: String },

    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true, index: true },
    address: { type: String, required: true, index: true },
    birthdate: { type: String, required: true, index: true },

    direct_referral: { type: Number },
    indirect_referral: { type: Number },
    pairing_bonus: { type: Number },
    automatic_equivalent_rebates: { type: Number },
    direct_selling: { type: Number },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
