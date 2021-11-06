import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";
import { orderBuy1Take1, orderBuy2Take3 } from "../utils/new-order.js";

let NewOrderRouter = express.Router();

NewOrderRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      account_number: req.body.account_number,
    });

    if (user) {
      res.send({
        message: "Successfully Search User",
        data: user,
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
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const buyer = await UserVerification.findOne({ user_id: body.buyer });
    const seller = await UserVerification.findOne({ user_id: user._id });

    if (seller && buyer) {
      if (req.body.package == "b1t1") {
        await orderBuy1Take1(buyer, seller, body);
      } else if (req.body.package == "b2t3") {
        await orderBuy2Take3(buyer, seller, body);
      }

      res.send({ message: "Successfully Ordered!" });
    } else {
      res.status(401).send({ message: "Cannot find users!" });
    }
  })
);

export default NewOrderRouter;
