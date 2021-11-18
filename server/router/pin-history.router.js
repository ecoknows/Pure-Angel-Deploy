import PinGiving from "../models/pin-giving.model.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";

let PinHistoryRouter = express.Router();

PinHistoryRouter.get(
  "/",
  verifyUserToken,
  checkIfAdminStockMega,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;

    let pinGiving = await PinGiving.find({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    if (pinGiving) {
      res.send({
        message: "Successfully Fetch Data!",
        data: pinGiving,
      });
    } else {
      res.send({
        message: "Empty History!",
      });
    }
  })
);

export default PinHistoryRouter;
