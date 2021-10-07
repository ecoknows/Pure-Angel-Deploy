import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, index: true },
    name: { type: String, required: true, index: true },
    value: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const History = mongoose.model("History", historySchema);

export default History;
