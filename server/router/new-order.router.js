import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  initializeNewOrder,
  orderBuy1Take1,
  orderBuy2Take3,
  createPurchase,
  updateSellerStock,
  updateBuyerStock,
  purchaseIncome,
  automaticEquivalentRebatesIncome,
  stockistRepeatPurchase,
  stockistEncodeNewOrder,
} from "../middlewares/new-order.js";
import User from "../models/user.model.js";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";

let NewOrderRouter = express.Router();

NewOrderRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      account_number: req.body.account_number,
    });

    if (user) {
      const referral_user = await User.findById(user.user_that_invite.user_id);

      res.send({
        message: "Successfully Search User",
        data: { user, referral_user },
      });
    } else {
      res.status(401).send({
        message: "Cannot find users!",
      });
    }
  })
);

NewOrderRouter.post(
  "/order",
  verifyUserToken,
  checkIfAdminStockMega,
  initializeNewOrder,
  orderBuy1Take1,
  orderBuy2Take3,
  updateSellerStock,
  updateBuyerStock,
  createPurchase,
  purchaseIncome,
  automaticEquivalentRebatesIncome,
  stockistRepeatPurchase,
  stockistEncodeNewOrder,
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "Successfully Ordered!" });
  })
);

export default NewOrderRouter;
