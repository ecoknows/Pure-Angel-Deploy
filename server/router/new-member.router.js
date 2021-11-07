import express from "express";
import expressAsyncHandler from "express-async-handler";
import {
  addDirectReferral,
  addNewGenealogy,
  checkIfThereIsPairingBonus,
  createChildUser,
  createChildVerification,
  increaseEndingPinDecreaseNumberOfPin,
  initializeNewMember,
  payDirectReferral,
  payIndirectReferral,
  recurIndirectReferral,
  recurModifyBranchCountOfRoot,
  recurPairingBonus,
  updateGenealogy,
} from "../middlewares/new-member.js";

import Genealogy from "../models/genealogy.model.js";
import User from "../models/user.model.js";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";

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
  initializeNewMember,
  increaseEndingPinDecreaseNumberOfPin,
  createChildUser,
  createChildVerification,
  updateGenealogy,
  addNewGenealogy,
  addDirectReferral,
  recurIndirectReferral,
  recurPairingBonus,
  recurModifyBranchCountOfRoot,
  payDirectReferral,
  payIndirectReferral,
  checkIfThereIsPairingBonus,
  expressAsyncHandler(async (req, res) => {
    res.send({ message: "Successfully Create Member!" });
  })
);

export default NewMemberRouter;
