import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken, generateUserToken } from "../utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import UserVerification from "../models/user.verification.model.js";
import { UpdateFreeAccounts, updateUserAuthentication } from "../utils/user.js";

const UserRouter = express.Router();

UserRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      account_number: req.body.account_number,
    });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          message: "Successfully Login",
          userToken: generateUserToken(user),
        });
      } else {
        res.status(401).send({
          message: "Failed Login",
        });
      }
    } else {
      res.status(401).send({
        message: "Failed Login",
      });
    }
  })
);

UserRouter.get(
  "/user-details",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
      res.send({
        message: "Successfully fetch User",
        data: user,
      });
    } else {
      res.send({
        message: "Failed to fetch!",
      });
    }
  })
);

UserRouter.get(
  "/user-details-verification",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user_verification = await UserVerification.findOne({
      user_id: req.user._id,
    });

    if (user_verification) {
      res.send({
        message: "Successfully fetch User",
        data: user_verification,
      });
    } else {
      res.send({
        message: "Failed to fetch!",
      });
    }
  })
);

UserRouter.post(
  "/update-user",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const update_info = req.body.update_info;

    const existing_user = await User.findById(user._id);

    if (existing_user) {
      if (update_info.new_password) {
        if (
          bcrypt.compareSync(update_info.old_password, existing_user.password)
        ) {
          existing_user.password = bcrypt.hashSync(update_info.new_password, 8);

          const updated_user = await updateUserAuthentication(
            update_info,
            existing_user
          );

          await UpdateFreeAccounts(updated_user, update_info);

          res.send({
            message: "Successfully Updated the User",
            userToken: generateUserToken(updated_user),
          });
        } else {
          res.status(404).send({ message: "Old password doesn't match" });
        }
      } else {
        const updated_user = await updateUserAuthentication(
          update_info,
          existing_user
        );

        await UpdateFreeAccounts(updated_user, update_info);

        res.send({
          message: "Successfully Updated the User",
          userToken: generateUserToken(updated_user),
        });
      }
    } else {
      res.status(404).send({ message: "Cannot Find user" });
    }
  })
);

export default UserRouter;
