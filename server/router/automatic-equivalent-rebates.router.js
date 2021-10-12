import express from "express";
import expressAsyncHandler from "express-async-handler";
import AutomaticEquivalentRebates from "../models/automatic-equivalent-rebates.model.js";
import { verifyUserToken } from "../utils.js";

let AutomaticEquivalentRebatesRouter = express.Router();

AutomaticEquivalentRebatesRouter.get(
  "/",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let automatic_equivalent_rebates = await AutomaticEquivalentRebates.find({
      user_id: user._id,
    });

    if (automatic_equivalent_rebates) {
      res.send({
        message: "Successfully Fetch Data!",
        data: automatic_equivalent_rebates,
      });
    } else {
      res.send({
        message: "Cannot fetch Data!",
      });
    }
  })
);

export default AutomaticEquivalentRebatesRouter;
