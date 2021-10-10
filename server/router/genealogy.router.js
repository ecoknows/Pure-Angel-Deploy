import express from "express";
import expressAsyncHandler from "express-async-handler";
import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { verifyUserToken } from "../utils.js";

import {
  addDirectReferral,
  addIndirectReferral,
  addNewGenealogy,
  createChildUser,
  updateGenealogy,
  updateBranches,
  addPairingBonus,
  modifyBranchCountOfRoot,
} from "../utils/genealogy.js";

const GenealogyRouter = express.Router();

GenealogyRouter.post(
  "/add",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    let current_user = await User.findById(req.body.root_id);
    let user_that_invite = await User.findById(req.user._id);
    let genealogy = await Genealogy.findOne({ user_id: current_user._id });

    if (genealogy) {
      if (genealogy.right_branch || genealogy.left_branch) {
        let child_user = await createChildUser(
          req,
          current_user,
          user_that_invite
        );

        await updateGenealogy(genealogy, child_user, req);

        await addDirectReferral(req.user, child_user);

        await addIndirectReferral(
          user_that_invite.user_that_invite.user_id,
          user_that_invite,
          child_user,
          req.user,
          0
        );

        await addPairingBonus(child_user, child_user);
        await modifyBranchCountOfRoot(current_user._id, req.body.position);
        res.send({ message: "Successfully Added New Direct Referral" });
      } else {
        res
          .status(409)
          .send({ message: "Branch Exceed only 2 branch allowed!" });
      }
    } else if (genealogy == null && current_user != null) {
      let child_user = await createChildUser(
        req,
        current_user,
        user_that_invite
      );

      await addNewGenealogy(genealogy, child_user, current_user, req);

      await addIndirectReferral(
        user_that_invite.user_that_invite.user_id,
        user_that_invite,
        child_user,
        req.user,
        0
      );
      await addDirectReferral(req.user, child_user);

      await addPairingBonus(child_user, child_user);

      await modifyBranchCountOfRoot(current_user._id, req.body.position);

      res.send({ message: "Successfully Added New Direct Referral" });
    } else {
      res.status(409).send({ message: "All nulls!" });
    }
  })
);

GenealogyRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const root = await Genealogy.findOne({ user_id: req.user._id });

    if (root) {
      await updateBranches(root);
      res.send({
        message: "Sucessfully Fetch Genealogy!",
        data: root,
      });
    } else {
      res.send({
        message: "Failed to Fetch Genealogy!",
        data: root,
      });
    }
  })
);

export default GenealogyRouter;
