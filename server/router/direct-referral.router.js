import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserVerification from "../models/user.verification.model.js";
import { verifyUserToken } from "../utils.js";

let DirectReferralRouter = express.Router();

DirectReferralRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let direct_referral = await UserVerification.find({
      id_of_the_user_that_invite: user._id,
    });

    if (direct_referral) {
      res.send({
        message: "Successfully Fetch Data!",
        data: direct_referral,
      });
    } else {
      res.send({
        message: "Cannot find users!",
      });
    }
  })
);

export default DirectReferralRouter;
