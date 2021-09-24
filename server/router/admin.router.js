import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

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
    const user = req.user;
    const body = req.body;

    const user_to_verify = await UserVerification.findById(body.secret_code);

    if (user_to_verify) {
      user_to_verify.verified = body.checked;
      user_to_verify.income = body.checked ? 100 : 0;
      await user_to_verify.save();

      const user_that_invite = await User.findById(
        user_to_verify.id_of_the_user_that_invite
      );

      user_that_invite.direct_referral = body.checked
        ? user_that_invite.direct_referral + 100
        : user_that_invite.direct_referral - 100;

      user_that_invite.save();

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
