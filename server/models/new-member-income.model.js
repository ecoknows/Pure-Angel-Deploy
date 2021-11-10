import mongoose from "mongoose";

const newMemberIncomeSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    new_member: {
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },

      is_stockist: { type: Boolean },
      is_admin: { type: Boolean },
      is_mega_center: { type: Boolean },
    },

    income: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const NewMemberIncome = mongoose.model(
  "NewMemberIncome",
  newMemberIncomeSchema
);

export default NewMemberIncome;
