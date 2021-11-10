import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  initializeUpgradeAccount,
  updateGenealogy,
  upgradeToMegaCenter,
  upgradeToMember,
  upgradeToStockist,
} from "../middlewares/upgrade-account.js";
import User from "../models/user.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

let UpgradeAccountRouter = express.Router();

UpgradeAccountRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const searched_account = await User.findOne({
      account_number: req.body.account_number,
    });
    if (searched_account) {
      res.send({
        message: "Successfully Search Account",
        data: searched_account,
      });
    } else {
      res.status(404).send({ message: "That Account is Invalid" });
    }
  })
);

UpgradeAccountRouter.post(
  "/upgrade",
  verifyUserToken,
  checkIfAdmin,
  initializeUpgradeAccount,
  upgradeToMegaCenter,
  upgradeToStockist,
  upgradeToMember,
  updateGenealogy,
  expressAsyncHandler(async (req, res) => {
    res.send({
      message: "Successfully Upgrade Account!",
    });
  })
);

export default UpgradeAccountRouter;
