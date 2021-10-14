import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import Purchase from "../models/purchase.model.js";
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
  payAutomaticEquivalentRebates,
} from "../utils/admin.js";
import bcrypt from "bcryptjs";

import moment from "moment";

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
    const user = req.user;

    const user_to_verify = await UserVerification.findById(body.secret_code);

    const mega_center_user = await User.findById(
      user_to_verify.mega_center.user_id
    );

    if (
      user_to_verify &&
      ((user_to_verify.user_that_invite.user_id == user._id &&
        (user.is_owner || user.is_admin)) ||
        mega_center_user.member_that_verified <
          mega_center_user.max_member_to_verify)
    ) {
      const verified = user_to_verify.verified;
      const checked = body.checked;

      if (checked != verified) {
        user_to_verify.verified = body.checked;

        const update_user_to_verify = await user_to_verify.save();

        if (update_user_to_verify.verified) {
          if (mega_center_user) {
            const member_that_verified = mega_center_user.member_that_verified
              ? mega_center_user.member_that_verified
              : 0;
            mega_center_user.member_that_verified = member_that_verified + 1;
            await mega_center_user.save();
          }
        } else {
          if (mega_center_user) {
            const member_that_verified = mega_center_user.member_that_verified
              ? mega_center_user.member_that_verified
              : 0;
            mega_center_user.member_that_verified = member_that_verified - 1;
            await mega_center_user.save();
          }
        }

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
        cashout_to_approved.remarks = body.remarks;

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

AdminRouter.post(
  "/approved-purchase",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;

    const user = req.user;

    const userAccount = await User.findById(user._id);

    const purchase_to_approved = await Purchase.findById(body.purchase_id);
    if (
      userAccount &&
      userAccount.number_of_supply >= purchase_to_approved.quantity
    ) {
      if (purchase_to_approved) {
        const approved = purchase_to_approved.approved;
        const checked = body.checked;

        if (checked != approved) {
          purchase_to_approved.approved = body.checked;
          purchase_to_approved.remarks = body.remarks;

          if (purchase_to_approved.approved) {
            purchase_to_approved.approved_date = moment();
            userAccount.number_of_supply =
              userAccount.number_of_supply - purchase_to_approved.quantity;
            await userAccount.save();
          } else {
            purchase_to_approved.approved_date = undefined;
            userAccount.number_of_supply =
              userAccount.number_of_supply + purchase_to_approved.quantity;
            await userAccount.save();
          }

          const purchase_approved = await purchase_to_approved.save();

          await payAutomaticEquivalentRebates(purchase_approved);

          res.send({
            message: "Successfully verify purchase!",
          });
        } else {
          res.send({
            message: "Already!",
          });
        }
      } else {
        res.status(401).send({
          message: "Purchase is ID is invalid",
        });
      }
    } else {
      res.status(401).send({
        message: "Out of stack",
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
        message: "Successfully Fetch Cashouts",
        data: cashouts,
      });
    } else {
      res.status(401).send({
        message: "Failed to Users",
      });
    }
  })
);

AdminRouter.get(
  "/purchases",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const purchases = await Purchase.aggregate([{ $sort: { createdAt: -1 } }]);

    if (purchases) {
      res.send({
        message: "Successfully Purchases",
        data: purchases,
      });
    } else {
      res.status(401).send({
        message: "Failed to fetch Purchases",
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
        userToEdit.max_member_to_verify = body.max_member_to_verify;
        await userToEdit.save();
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
