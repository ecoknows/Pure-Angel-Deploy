import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken, generateUserToken } from "../utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import UserVerification from "../models/user.verification.model.js";

const UserRouter = express.Router();

UserRouter.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ username: req.body.username });

    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          message: "Successfully Login",
          userToken: generateUserToken(user),
        });
      }
    } else {
      res.send({
        message: "Failed Login",
      });
    }
  })
);

UserRouter.get(
  "/income",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const income = await User.findById(req.user._id).select(
      "direct_referral " +
        "indirect_referral " +
        "pairing_bonus " +
        "automatic_equivalent_rebates " +
        "direct_selling"
    );

    res.send({
      message: "Successfully fetch User",
      data: income,
    });
  })
);

UserRouter.post(
  "/register",
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    let userVerification = await UserVerification.findOne({
      first_name: body.first_name,
      last_name: body.last_name,
      birthdate: body.birthdate,
      address: body.address,
    });

    if (
      userVerification &&
      userVerification._id == body.secret_code &&
      userVerification.verified
    ) {
      let user = await User.findById(userVerification.user_id);
      user.password = bcrypt.hashSync(body.password, 8);
      user.username = body.username;

      let updated_user = await user.save();

      res.send({
        message: "User Updated Successfully!",
        userToken: generateUserToken(updated_user),
      });
    } else {
      res.status(404).send({
        message: "Cannot find the correct user please, double check!",
      });
    }
  })
);

UserRouter.post(
  "/create-owner",
  expressAsyncHandler(async (req, res) => {
    let check_if_ancestor_exist = await User.findOne({ is_ancestor: true });
    if (check_if_ancestor_exist) {
      res
        .status(409)
        .send({ message: "Oppss don't try to create a new owner!" });
    } else {
      let body = req.body;
      let ancestor = await new User({
        username: body.username,
        password: bcrypt.hashSync(body.password, 8),

        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        birthdate: body.birthdate,
        is_admin: true,
        is_owner: true,
      });

      await ancestor.save();
      res.send({ message: "Successfully created an Owner!" });
    }
  })
);

export default UserRouter;
