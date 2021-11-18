import mongoose from "mongoose";

const productVoucherSchema = new mongoose.Schema(
  {
    account_number: { type: String },
    user_id: { type: String, required: true, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },

    left: {
      account_number: { type: String },
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    right: {
      account_number: { type: String },
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    value: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const ProductVoucher = mongoose.model("ProductVoucher", productVoucherSchema);

export default ProductVoucher;
