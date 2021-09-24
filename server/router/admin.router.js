import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  DIRECT_REFERRAL_PAYMENT,
  INDIRECT_REFERRAL_LIMIT,
  INDIRECT_REFERRAL_PAYMENT,
} from "../constants.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

const AdminRouter = express.Router();

async function payDirectReferral(id_of_the_user_that_invite, checked) {
  const user_that_invite = await User.findById(id_of_the_user_that_invite);

  if (user_that_invite) {
    user_that_invite.direct_referral = checked
      ? user_that_invite.direct_referral + DIRECT_REFERRAL_PAYMENT
      : user_that_invite.direct_referral - DIRECT_REFERRAL_PAYMENT;

    user_that_invite.save();
  }
}

async function payIndirectReferral(id_of_the_user_that_invite, checked) {
  const indirect_referral_user = await UserVerification.findOne({
    user_id: id_of_the_user_that_invite,
  });

  if (
    indirect_referral_user &&
    indirect_referral_user.indirect_referral_count < INDIRECT_REFERRAL_LIMIT
  ) {
    const user_that_invite = await User.findById(
      indirect_referral_user.id_of_the_user_that_invite
    );

    user_that_invite.indirect_referral = checked
      ? user_that_invite.indirect_referral + INDIRECT_REFERRAL_PAYMENT
      : user_that_invite.indirect_referral - INDIRECT_REFERRAL_PAYMENT;

    indirect_referral_user.indirect_referral_count =
      indirect_referral_user.indirect_referral_count + 1;

    user_that_invite.save();
    indirect_referral_user.save();
  }
}

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
    const user = req.user;
    const body = req.body;

    const user_to_verify = await UserVerification.findById(body.secret_code);

    if (user_to_verify) {
      user_to_verify.verified = body.checked;
      user_to_verify.income = body.checked ? 100 : 0;
      await user_to_verify.save();

      await payDirectReferral(
        user_to_verify.id_of_the_user_that_invite,
        body.checked
      );

      await payIndirectReferral(
        user_to_verify.id_of_the_user_that_invite,
        body.checked
      );

      res.send({
        message: "Successfully verify User!",
      });
    } else {
      res.status(401).send({
        message: "Secret code is invalid!",
      });
    }
  })
);

export default AdminRouter;
