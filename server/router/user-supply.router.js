import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import { verifyUserToken } from "../utils.js";

const UserSupplyRouter = express.Router();

UserSupplyRouter.post(
  "/supply",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const userAccount = await User.findById(user._id);

    if (userAccount) {
      userAccount.number_of_supply = body.supply;

      await userAccount.save();

      res.send({
        message: "Successfully updated Supply!",
      });
    } else {
      res.status(401).send({
        message: "User is invalid",
      });
    }
  })
);

export default UserSupplyRouter;
