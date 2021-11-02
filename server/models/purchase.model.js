import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    contact_number: { type: String, required: true },
    address: { type: String },

    user_that_invite: {
      user_id: { type: String },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    quantity: { type: Number, required: true },
    value: { type: Number, required: true },

    approved: { type: Boolean },
    approved_date: { type: Date },
    remarks: { type: String },
  },
  { timestamps: true }
);

const Purchase = mongoose.model("Purchase", purchaseSchema);

export default Purchase;
