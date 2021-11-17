import CoffeeIncome from "../models/coffee-income.model.js";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import { verifyUserToken } from "../utils.js";
import SoapIncome from "../models/soap-income.model.js";
import NewMemberIncome from "../models/new-member-income.model.js";

const IncomeHistoryRouter = express.Router();

IncomeHistoryRouter.get(
  "/coffee-income",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const coffeeIncome = await CoffeeIncome.find({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    if (coffeeIncome) {
      res.send({
        message: "Successfully Fetch Data",
        data: coffeeIncome,
      });
    } else {
      res.send({
        message: "Empty Income",
      });
    }
  })
);

IncomeHistoryRouter.get(
  "/soap-income",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const soapIncome = await SoapIncome.find({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    if (soapIncome) {
      res.send({
        message: "Successfully Fetch Data",
        data: soapIncome,
      });
    } else {
      res.send({
        message: "Empty Income",
      });
    }
  })
);

IncomeHistoryRouter.get(
  "/new-member-income",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const newMemberIncome = await NewMemberIncome.find({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    if (newMemberIncome) {
      res.send({
        message: "Successfully Fetch Data",
        data: newMemberIncome,
      });
    } else {
      res.send({
        message: "Empty Income",
      });
    }
  })
);
export default IncomeHistoryRouter;
