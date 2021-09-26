import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },

    id_of_the_direct_referral_user: { type: String, index: true },
    id_of_the_indirect_referral_user: { type: String, index: true },

    pairing_bonus_info: {
      root_id: String,
      root_first_name: String,
      root_last_name: String,

      right_id: String,
      right_first_name: String,
      right_last_name: String,

      left_id: String,
      left_first_name: String,
      left_last_name: String,
    },

    income_direct_referral: { type: Number },
    income_indirect_referral: { type: Number },
    income_pairing_bonus: { type: Number },
  },
  {
    timestamps: true,
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
