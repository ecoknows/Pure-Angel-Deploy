import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfMegaCenter, verifyUserToken } from "../utils.js";
import {
  payIndirectReferral,
  payDirectReferral,
  checkIfThereIsPairingBonus,
} from "../utils/admin.js";

let MegaCenterRouter = express.Router();

MegaCenterRouter.get(
  "/members",
  verifyUserToken,
  checkIfMegaCenter,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const members = await UserVerification.find({
      "mega_center.user_id": user._id,
    });

    if (members) {
      res.send({
        message: "Successfully Fetch members!",
        data: members,
      });
    } else {
      res.status(401).send({
        message: "Cannot find members!",
      });
    }
  })
);

MegaCenterRouter.post(
  "/verify",
  verifyUserToken,
  checkIfMegaCenter,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const user_to_verify = await UserVerification.findById(body.secret_code);
    const mega_center_user = await User.findById(user._id);

    if (
      user_to_verify &&
      mega_center_user.member_that_verified <
        mega_center_user.max_member_to_verify
    ) {
      const verified = user_to_verify.verified;
      const checked = body.checked;

      if (checked != verified) {
        user_to_verify.verified = body.checked;

        const update_user_to_verify = await user_to_verify.save();

        if (update_user_to_verify.verified) {
          if (mega_center_user) {
            const member_that_verified = mega_center_user.member_that_verified
              ? mega_center_user.member_that_verified
              : 0;
            mega_center_user.member_that_verified = member_that_verified + 1;
            await mega_center_user.save();
          }
        } else {
          if (mega_center_user) {
            const member_that_verified = mega_center_user.member_that_verified
              ? mega_center_user.member_that_verified
              : 0;
            mega_center_user.member_that_verified = member_that_verified - 1;
            await mega_center_user.save();
          }
        }

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
        message: "Verification Failed!",
      });
    }
  })
);

export default MegaCenterRouter;
