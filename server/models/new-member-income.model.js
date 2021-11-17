import mongoose from "mongoose";

const newMemberIncomeSchema = new mongoose.Schema(
  {
    account_number: { type: String, required: true },
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    new_member: {
      account_number: { type: String, required: true },
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    value: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const NewMemberIncome = mongoose.model(
  "NewMemberIncome",
  newMemberIncomeSchema
);

export default NewMemberIncome;
