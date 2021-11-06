import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";

import {
  addDirectReferral,
  addIndirectReferral,
  addNewGenealogy,
  createChildUser,
  updateGenealogy,
  addPairingBonus,
  modifyBranchCountOfRoot,
} from "../utils/genealogy.js";
import { verifyUser } from "../utils/new_member.js";

let NewMemberRouter = express.Router();

NewMemberRouter.post(
  "/search-genealogy",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const searched_account = await User.findOne({
      account_number: req.body.account_number,
    });
    if (searched_account) {
      const genealogy = await Genealogy.findOne({
        user_id: searched_account._id,
      });

      res.send({
        message: "Successfully Search Genealogy",
        data: genealogy,
      });
    } else {
      res.status(404).send({ message: "That Account is Invalid" });
    }
  })
);

NewMemberRouter.post(
  "/create-member",
  verifyUserToken,
  checkIfAdminStockMega,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const place_under_user = await User.findOne({
      account_number: body.place_under_account,
    });

    const referral_user = await User.findOne({
      account_number: body.referral_account,
    });

    const user = await User.findById(req.user._id);

    if (
      user &&
      place_under_user &&
      referral_user &&
      user.ending_pin >= 0 &&
      user.number_of_pin
    ) {
      user.ending_pin = user.ending_pin + 1;
      user.number_of_pin = user.number_of_pin - 1;

      await user.save();

      let genealogy = await Genealogy.findOne({
        user_id: place_under_user._id,
      });

      if (genealogy) {
        if (genealogy.right_branch || genealogy.left_branch) {
          let child_user = await createChildUser(
            req,
            place_under_user,
            referral_user
          );

          if (user && user.ending_pin && user.number_of_pin) {
            user.ending_pin = user.ending_pin + 1;
            user.number_of_pin = user.number_of_pin - 1;
            await user.save();
          }

          await updateGenealogy(genealogy, child_user, req);

          await addDirectReferral(referral_user, child_user);

          await addIndirectReferral(
            referral_user.user_that_invite.user_id,
            referral_user,
            child_user,
            referral_user,
            0
          );

          await addPairingBonus(child_user, child_user);

          await modifyBranchCountOfRoot(
            place_under_user._id,
            body.position,
            undefined
          );

          await verifyUser(req, child_user, true);

          res.send({ message: "Successfully Added New Member" });
        } else {
          res
            .status(409)
            .send({ message: "Branch Exceed only 2 branch allowed!" });
        }
      } else if (genealogy == null && place_under_user != null) {
        let child_user = await createChildUser(
          req,
          place_under_user,
          referral_user
        );

        await addNewGenealogy(genealogy, child_user, place_under_user, req);

        await addIndirectReferral(
          referral_user.user_that_invite.user_id,
          referral_user,
          child_user,
          referral_user,
          0
        );
        await addDirectReferral(referral_user, child_user);

        await addPairingBonus(child_user, child_user);

        await modifyBranchCountOfRoot(
          place_under_user._id,
          body.position,
          undefined
        );

        await verifyUser(req, child_user, true);

        res.send({ message: "Successfully New Member!" });
      } else {
        res.status(409).send({ message: "Cannot find genealogy!" });
      }
    } else {
      res.status(409).send({ message: "Invalid User!" });
    }
  })
);

export default NewMemberRouter;
