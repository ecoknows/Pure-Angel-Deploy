import express from "express";
import expressAsyncHandler from "express-async-handler";
import { COFFEE_PACKAGE_PER_PIN, SOAP_PACKAGE_PER_PIN } from "../constants.js";
import User from "../models/user.model.js";
import UserVerificaiton from "../models/user.verification.model.js";
import { checkIfAdmin, verifyUserToken } from "../utils.js";

let CreateNewPinRouter = express.Router();

CreateNewPinRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const searched_account = await User.findOne({
      account_number: req.body.account_number,
    });
    if (
      searched_account &&
      (searched_account.is_mega_center ||
        searched_account.is_stockist ||
        searched_account.is_admin)
    ) {
      res.send({
        message: "Successfully Search Account",
        data: searched_account,
      });
    } else {
      res.status(404).send({ message: "That Account is Invalid" });
    }
  })
);

CreateNewPinRouter.post(
  "/assign-pin",
  verifyUserToken,
  checkIfAdmin,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const searched_account = await User.findOne({
      account_number: body.account_number,
    });

    const verification_account = await UserVerificaiton.findOne({
      user_id: searched_account._id,
    });

    if (
      searched_account &&
      verification_account &&
      (searched_account.is_mega_center || searched_account.is_admin)
    ) {
      searched_account.number_of_pin = searched_account.number_of_pin
        ? searched_account.number_of_pin + body.number_of_pin
        : body.number_of_pin;

      const total_coffee_added = body.number_of_pin * COFFEE_PACKAGE_PER_PIN;
      const total_soap_added = body.number_of_pin * SOAP_PACKAGE_PER_PIN;

      verification_account.stock_coffee = verification_account.stock_coffee
        ? verification_account.stock_coffee + total_coffee_added
        : total_coffee_added;

      verification_account.stock_soap = verification_account.stock_soap
        ? verification_account.stock_soap + total_soap_added
        : total_soap_added;

      await verification_account.save();

      await searched_account.save();
      res.send({
        message: "Successfully Added New PIN with Package",
      });
    } else {
      res.status(404).send({ message: "That Account is Invalid" });
    }
  })
);

export default CreateNewPinRouter;
