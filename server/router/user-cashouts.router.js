import express from "express";
import expressAsyncHandler from "express-async-handler";
import Cashout from "../models/cashout.model.js";
import UserVerification from "../models/user.verification.model.js";
import { verifyUserToken } from "../utils.js";

const UserCashouts = express.Router();

UserCashouts.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const cashouts = await Cashout.aggregate([
      { $match: { user_id: user._id } },
      { $sort: { createdAt: -1 } },
    ]);

    if (cashouts) {
      res.send({
        message: "Succesffully Fetch cashouts",
        data: cashouts,
      });
    } else {
      res.status(401).send({
        message: "You don't have cashouts yet....",
      });
    }
  })
);

UserCashouts.post(
  "/cashout",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const userVerification = await UserVerification.findOne({
      user_id: user._id,
    });

    if (userVerification) {
      if (userVerification.unpaid_income >= body.cashout) {
        const newCashout = new Cashout({
          user_id: user._id,

          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          contact_number: user.contact_number,

          cashout: body.cashout,
        });

        const createCashout = await newCashout.save();

        userVerification.unpaid_income =
          userVerification.unpaid_income - createCashout.cashout;

        await userVerification.save();
        res.send({
          message: "Successfully Cashout money!",
        });
      } else {
        res.status(401).send({
          message: "not enought money",
        });
      }
    } else {
      res.status(401).send({
        message: "UserVerification missing",
      });
    }
  })
);

export default UserCashouts;
