import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserVerification from "../models/user.verification.model.js";
import { checkIfMegaCenter, verifyUserToken } from "../utils.js";

let MegaCenterRouter = express.Router();

MegaCenterRouter.get(
  "/members",
  verifyUserToken,
  checkIfMegaCenter,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    const members = await UserVerification.find({
      "mega_center.user_id": user._id,
    });

    if (members) {
      res.send({
        message: "Successfully Fetch members!",
        data: members,
      });
    } else {
      res.status(401).send({
        message: "Cannot find members!",
      });
    }
  })
);

export default MegaCenterRouter;
