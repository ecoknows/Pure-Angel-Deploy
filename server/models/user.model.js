import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },

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
