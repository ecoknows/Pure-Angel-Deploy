import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken } from "../utils.js";
import PairingBonus from "../models/pairing-bonus.model.js";

const PairingBonusRouter = express.Router();

PairingBonusRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const pairingBonus = await PairingBonus.find({
      user_id: user._id,
      right: { $exists: true },
      left: { $exists: true },
    });

    if (pairingBonus) {
      res.send({
        message: "Successfully Fetch Pairing Bonus",
        data: pairingBonus,
      });
    } else {
      res.send({
        message: "Empty Fetch Pairing Bonus",
      });
    }
  })
);

export default PairingBonusRouter;
