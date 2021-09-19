import express from "express";
import expressAsyncHandler from "express-async-handler";
import { decodeUserToken, generateUserToken } from "../utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

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
  "/profile",
  decodeUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    res.send({
      message: "Successfully fetch User",
      data: user,
    });
  })
);

UserRouter.get(
  "/income",
  decodeUserToken,
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

    let user = await User.findOne({
      first_name: body.first_name,
      last_name: body.last_name,
      birthdate: body.birthdate,
      address: body.address,
    });

    if (user) {
      if (user.password && user.username) {
        res.status(409).send({
          message: "This user has been already created",
        });
      } else {
        user.password = bcrypt.hashSync(body.password, 8);
        user.username = body.username;
        let updated_user = await user.save();

        res.send({
          message: "User Updated Successfully!",
          userToken: generateUserToken(updated_user),
        });
      }
    } else {
      user = new User({
        username: body.username,
        password: bcrypt.hashSync(body.password, 8),
        first_name: body.first_name,
        last_name: body.last_name,
        birthdate: body.birthdate,
        address: body.address,
      });
      let created_user = await user.save();
      res.send({
        message: "User Updated Successfully!",
        userToken: generateUserToken(created_user),
      });
    }
  })
);

export default UserRouter;
