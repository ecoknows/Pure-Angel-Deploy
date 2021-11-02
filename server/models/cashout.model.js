import mongoose from "mongoose";

const cashoutSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String },
    contact_number: { type: String, required: true },

    cashout: { type: Number, required: true },
    approved: { type: Boolean, default: false },
    remarks: { type: String },
  },
  {
    timestamps: true,
  }
);

const Cashout = mongoose.model("Cashout", cashoutSchema);

export default Cashout;
