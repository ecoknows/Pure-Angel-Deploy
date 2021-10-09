import express from "express";
import expressAsyncHandler from "express-async-handler";
import { DIRECT_REFERRAL_PAYMENT } from "../constants.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import Cashout from "../models/cashout.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";
import {
  payIndirectReferral,
  payDirectReferral,
  checkIfThereIsPairingBonus,
  roleUpdater,
  updateGenealogyRole,
  updateMegaCenterBranches,
} from "../utils/admin.js";
import bcrypt from "bcryptjs";
const AdminRouter = express.Router();

AdminRouter.get(
  "/users",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    let user = req.user;

    const users = await UserVerification.find({
      secret_code: { $exists: true },
    });

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
    const body = req.body;

    const user_to_verify = await UserVerification.findById(body.secret_code);

    if (user_to_verify) {
      const verified = user_to_verify.verified;
      const checked = body.checked;

      if (checked != verified) {
        user_to_verify.verified = body.checked;

        const update_user_to_verify = await user_to_verify.save();

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
        message: "Secret code is invalid!",
      });
    }
  })
);

AdminRouter.post(
  "/approved-cashout",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const cashout_to_approved = await Cashout.findById(body.cashout_id);

    if (cashout_to_approved) {
      const approved = cashout_to_approved.approved;
      const checked = body.checked;

      if (checked != approved) {
        cashout_to_approved.approved = body.checked;

        await cashout_to_approved.save();

        res.send({
          message: "Successfully cashout user!",
        });
      } else {
        res.send({
          message: "Already!",
        });
      }
    } else {
      res.status(401).send({
        message: "Secret code is invalid!",
      });
    }
  })
);

AdminRouter.get(
  "/authentication",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const users = await User.find({
      username: { $exists: true },
      password: { $exists: true },
    });

    if (users) {
      res.send({
        message: "Successfully Fetch Users",
        data: users,
      });
    } else {
      res.status(401).send({
        message: "Failed to Users",
      });
    }
  })
);

AdminRouter.get(
  "/cashouts",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const cashouts = await Cashout.aggregate([{ $sort: { createdAt: -1 } }]);

    if (cashouts) {
      res.send({
        message: "Successfully Fetch Users",
        data: cashouts,
      });
    } else {
      res.status(401).send({
        message: "Failed to Users",
      });
    }
  })
);

AdminRouter.post(
  "/edit-user",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const userToEdit = await User.findById(body.user_id);

    if (userToEdit) {
      if (
        body.password != undefined &&
        userToEdit.password != undefined &&
        !bcrypt.compareSync(body.password, userToEdit.password)
      ) {
        userToEdit.password = bcrypt.hashSync(body.password, 8);
      }

      await roleUpdater(body.role, userToEdit, body.secret_code_suffix);

      if (body.role == "mega center") {
        await updateMegaCenterBranches(
          userToEdit,
          userToEdit,
          body.secret_code_suffix
        );
      }

      await userToEdit.save();

      await updateGenealogyRole(body.role, userToEdit._id);

      await userToEdit.save();
      res.send({
        message: "Successfully Edited the User!",
      });
    } else {
      res.status(401).send({
        message: "Failed to edit the user",
      });
    }
  })
);

export default AdminRouter;
