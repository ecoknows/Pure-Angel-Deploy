import mongoose from "mongoose";

const genealogySchema = new mongoose.Schema(
  {
    user_id: { type: String, index: true },
    id_of_the_user_that_invite: { type: String },

    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    address: { type: String, required: true },

    left_branch: {
      type: {
        user_id: { type: String, index: true },
        id_of_the_user_that_invite: { type: String, index: true },

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
        id_of_the_user_that_invite: { type: String, index: true },

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
