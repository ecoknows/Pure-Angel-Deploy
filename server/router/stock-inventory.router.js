import express from "express";
import expressAsyncHandler from "express-async-handler";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

let StockInventoryRouter = express.Router();

StockInventoryRouter.post(
  "/re-stock",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    let user = await UserVerification.findOne({ user_id: req.user._id });

    if (user) {
      user.stock_coffee = req.body.stock_coffee;
      user.stock_soap = req.body.stock_soap;
      await user.save();
      res.send({
        message: "Successfully Restock! Item",
      });
    } else {
      res.send({
        message: "Invalid User",
      });
    }
  })
);

export default StockInventoryRouter;
