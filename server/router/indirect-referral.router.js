import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserVerification from "../models/user.verification.model.js";
import IndirectReferral from "../models/indirect-referral.model.js";
import { verifyUserToken } from "../utils.js";

const IndirectReferralRouter = express.Router();

IndirectReferralRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const indirect_referrals_users = await IndirectReferral.find({
      user_id: user._id,
    });

    if (indirect_referrals_users) {
      res.send({
        message: "Successfully Fetch Indirect Referrals",
        data: indirect_referrals_users,
      });
    } else {
      res.send({
        message: "No Indirect Referrals!",
      });
    }
  })
);

export default IndirectReferralRouter;
