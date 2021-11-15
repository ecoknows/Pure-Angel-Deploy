import mongoose from "mongoose";

const coffeeIncome = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    buyer: {
      user_id: { type: String },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    package: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    value: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const CoffeeIncome = mongoose.model("CoffeeIncome", coffeeIncome);

export default CoffeeIncome;
