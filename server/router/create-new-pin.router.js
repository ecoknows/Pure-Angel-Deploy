import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
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

    if (
      searched_account &&
      (searched_account.is_mega_center ||
        searched_account.is_stockist ||
        searched_account.is_admin)
    ) {
      searched_account.number_of_pin = searched_account.number_of_pin
        ? searched_account.number_of_pin + body.number_of_pin
        : body.number_of_pin;

      await searched_account.save();
      res.send({
        message: "Successfully Added New PIN",
      });
    } else {
      res.status(404).send({ message: "That Account is Invalid" });
    }
  })
);

export default CreateNewPinRouter;
