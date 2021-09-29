import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken } from "../utils.js";

const PairingBonusRouter = express.Router();

PairingBonusRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    // const pairingBonusTransactions = await Transaction.find({
    //   user_id: user._id,
    // });

    // if (pairingBonusTransactions) {
    //   res.send({
    //     message: "Successfully Fetch Pairing Bonus",
    //     data: pairingBonusTransactions,
    //   });
    // } else {
    //   res.send({
    //     message: "Empty Fetch Pairing Bonus",
    //   });
    // }
    res.send({
      message: "Maintenance",
    });
  })
);

export default PairingBonusRouter;
