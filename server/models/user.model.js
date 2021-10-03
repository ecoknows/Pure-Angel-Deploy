import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, index: true },
    password: { type: String, index: true },

    first_name: { type: String, required: true, index: true },
    last_name: { type: String, required: true, index: true },
    address: { type: String, required: true, index: true },
    birthdate: { type: String, required: true, index: true },
    contact_number: { type: String, required: true, index: true },
    secret_code_suffix: { type: String, required: true },

    root_user_genealogy: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
      position: { type: String },
    },

    user_that_invite: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    is_stockist: { type: Boolean },
    is_admin: { type: Boolean },
    is_mega_center: { type: Boolean },
    is_owner: { type: Boolean, index: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
