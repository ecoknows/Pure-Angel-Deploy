import express from "express";
import expressAsyncHandler from "express-async-handler";
import { PRODUCT_VALUE } from "../constants.js";
import Purchase from "../models/purchase.model.js";
import User from "../models/user.model.js";
import { verifyUserToken } from "../utils.js";

let PurchaseRouter = express.Router();

PurchaseRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let purchases = await Purchase.find({
      user_id: user._id,
    });

    if (purchases) {
      res.send({
        message: "Successfully Fetch Data!",
        data: purchases,
      });
    } else {
      res.send({
        message: "Cannot find purchases!",
      });
    }
  })
);

PurchaseRouter.post(
  "/add",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const body = req.body;

    const user_model = await User.findById(user._id);

    if (user_model) {
      const purchase = new Purchase({
        user_id: user_model._id,

        first_name: user_model.first_name,
        last_name: user_model.last_name,
        contact_number: user_model.contact_number,
        address: user_model.address,

        user_that_invite: {
          user_id: user_model.user_that_invite.user_id,
          first_name: user_model.user_that_invite.first_name,
          last_name: user_model.user_that_invite.last_name,
          address: user_model.user_that_invite.address,
        },

        quantity: body.quantity,
        value: body.quantity * PRODUCT_VALUE,
      });

      await purchase.save();

      res.send({
        message: "Successfully Request for purchase",
      });
    } else {
      res.status(401).send({
        message: "Invalid User!!",
      });
    }
  })
);

export default PurchaseRouter;
