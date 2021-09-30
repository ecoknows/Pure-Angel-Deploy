import mongoose from "mongoose";

const genealogySchema = new mongoose.Schema(
  {
    user_id: { type: String, index: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },
    direction_from_the_root: { type: String },

    user_that_invite: {
      user_id: { type: String, index: true },
      first_name: { type: String },
      last_name: { type: String },
      address: { type: String },
    },

    left_branch: {
      type: {
        user_id: { type: String, index: true },
        direction_from_the_root: { type: String },

        user_that_invite: {
          user_id: { type: String, index: true },
          first_name: { type: String },
          last_name: { type: String },
          address: { type: String },
        },

        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        address: { type: String, required: true },

        left_branch: { type: Object },
        right_branch: { type: Object },
      },
    },

    right_branch: {
      type: {
        user_id: { type: String, index: true },
        direction_from_the_root: { type: String },

        user_that_invite: {
          user_id: { type: String, index: true },
          first_name: { type: String },
          last_name: { type: String },
          address: { type: String },
        },

        first_name: { type: String, required: true },
        last_name: { type: String, required: true },
        address: { type: String, required: true },

        left_branch: { type: Object },
        right_branch: { type: Object },
      },
    },
  },
  {
    timestamps: true,
  }
);

const Genealogy = mongoose.model("Genealogy", genealogySchema);

export default Genealogy;
