import mongoose from "mongoose";

const coffeeStockistRepeatPurchaseSchema = new mongoose.Schema(
  {
    account_number: {type: String},
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    stockist: {
      account_number: {type: String},
      user_id: { type: String, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      address: { type: String },
    },

    package: { type: String },
    quantity: { type: Number, required: true, default: 0 },
    value: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

const CoffeeStockistRepeatPurchase = mongoose.model(
  "CoffeeStockistRepeatPurchase",
  coffeeStockistRepeatPurchaseSchema
);

export default CoffeeStockistRepeatPurchase;
