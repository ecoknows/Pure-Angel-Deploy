import mongoose from "mongoose";

const soapIncome = new mongoose.Schema(
  {
    account_number: { type: String, required: true },
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    buyer: {
      account_number: { type: String, required: true },
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String, required: true },
    },

    package: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    value: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const SoapIncome = mongoose.model("SoapIncome", soapIncome);

export default SoapIncome;
