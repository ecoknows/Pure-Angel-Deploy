import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken, generateUserToken } from "../utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import UserVerification from "../models/user.verification.model.js";
import Cashout from "../models/cashout.model.js";

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
    const income = await UserVerification.findOne({ user_id: req.user._id });

    if (income) {
      res.send({
        message: "Successfully fetch User",
        data: income,
      });
    } else {
      res.send({
        message: "Failed to fetch!",
      });
    }
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
      userVerification.secret_code == body.secret_code &&
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
        contact_number: body.contact_number,
        secret_code_suffix: body.secret_code_suffix,
        is_admin: true,
        is_owner: true,
      });
      const ancestorCreated = await ancestor.save();

      let ancestorVerification = await new UserVerification({
        user_id: ancestorCreated._id,
        first_name: body.first_name,
        last_name: body.last_name,
        address: body.address,
        birthdate: body.birthdate,
        verified: true,
      });

      await ancestorVerification.save();
      res.send({ message: "Successfully created an Owner!" });
    }
  })
);

UserRouter.post(
  "/cashout",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const userVerification = await UserVerification.findOne({
      user_id: user._id,
    });

    if (userVerification) {
      if (userVerification.unpaid_income >= body.cashout) {
        const newCashout = new Cashout({
          user_id: user._id,

          first_name: user.first_name,
          last_name: user.last_name,
          address: user.address,
          contact_number: user.contact_number,

          cashout: body.cashout,
        });

        const createCashout = await newCashout.save();

        userVerification.unpaid_income =
          userVerification.unpaid_income - createCashout.cashout;

        await userVerification.save();
        res.send({
          message: "Successfully Cashout money!",
        });
      } else {
        res.status(401).send({
          message: "not enought money",
        });
      }
    } else {
      res.status(401).send({
        message: "UserVerification missing",
      });
    }
  })
);

export default UserRouter;
