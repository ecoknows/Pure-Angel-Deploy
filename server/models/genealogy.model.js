import mongoose from "mongoose";

const genealogySchema = new mongoose.Schema(
  {
    user_id: { type: String, index: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },

    branches: {
      type: [
        {
          first_name: { type: String, required: true },
          last_name: { type: String, required: true },
          address: { type: String, required: true },
          branches: { type: Array, default: [] },
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Genealogy = mongoose.model("Genealogy", genealogySchema);

export default Genealogy;
