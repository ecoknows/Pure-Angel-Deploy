import express from "express";
import expressAsyncHandler from "express-async-handler";
import DirectReferral from "../models/direct-referral.model.js";
import { verifyUserToken } from "../utils.js";

let DirectReferralRouter = express.Router();

DirectReferralRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let direct_referral = await DirectReferral.find({
      user_id: user._id,
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
