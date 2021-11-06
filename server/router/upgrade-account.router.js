import express from "express";
import expressAsyncHandler from "express-async-handler";
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
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const searched_account = await User.findById(body.account_id);

    if (searched_account && searched_account.is_mega_center == undefined) {
      if (body.status == "stockist") {
        searched_account.is_stockist = true;
        searched_account.is_mega_center = undefined;
        await searched_account.save();
      }
      if (body.status == "mega-center") {
        if (body.assign_area) {
          searched_account.secret_code_suffix = body.assign_area;
          searched_account.ending_pin = 1;
          searched_account.is_mega_center = true;
          searched_account.is_stockist = undefined;
          await searched_account.save();
        }
      }
      if (body.status == "member") {
        searched_account.is_stockist = undefined;
        searched_account.is_mega_center = undefined;
        await searched_account.save();
      }

      res.send({
        message: "Successfully Upgrade Account!",
      });
    } else {
      res.status(404).send({
        message:
          "That Account is Invalid please check if it is existing account, and also you cannot upgrade already mega center account",
      });
    }
  })
);

export default UpgradeAccountRouter;
