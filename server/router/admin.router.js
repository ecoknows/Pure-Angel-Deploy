import express from "express";
import expressAsyncHandler from "express-async-handler";
import { DIRECT_REFERRAL_PAYMENT } from "../constants.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";
import {
  payIndirectReferral,
  payDirectReferral,
  checkIfThereIsPairingBonus,
} from "../utils/admin.js";

const AdminRouter = express.Router();

AdminRouter.get(
  "/users",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    let user = req.user;

    const users = await UserVerification.find({});

    if (users) {
      res.send({
        message: "Sucessfully fetch Users Table!",
        data: users,
      });
    } else {
      res.status(401).send({
        message: "Empty document",
      });
    }
  })
);

AdminRouter.post(
  "/verify",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const user_to_verify = await UserVerification.findById(body.secret_code);

    if (user_to_verify) {
      const verified = user_to_verify.verified;
      const checked = body.checked;

      if (checked != verified) {
        user_to_verify.verified = body.checked;

        user_to_verify.income_direct_referral = user_to_verify.verified
          ? DIRECT_REFERRAL_PAYMENT
          : 0;

        const update_user_to_verify = await user_to_verify.save();

        await payDirectReferral(update_user_to_verify);

        await payIndirectReferral(update_user_to_verify);

        await checkIfThereIsPairingBonus(update_user_to_verify, checked);

        res.send({
          message: "Successfully update user!",
        });
      } else {
        res.send({
          message: "Already!",
        });
      }
    } else {
      res.status(401).send({
        message: "Secret code is invalid!",
      });
    }
  })
);

export default AdminRouter;
