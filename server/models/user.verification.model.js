import mongoose from "mongoose";

const userVerificationSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    birthdate: { type: String, required: true },

    id_of_the_user_that_invite: { type: String, index: true },
    verified: { type: Boolean, default: false },
    income: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const UserVerification = mongoose.model(
  "UserVerification",
  userVerificationSchema
);

export default UserVerification;
