import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";
import { checkIfAdminStockMega, verifyUserToken } from "../utils.js";
import { B1T1_PRICE } from "../constants.js";
import Purchase from "../models/purchase.model.js";

let NewOrderRouter = express.Router();

NewOrderRouter.post(
  "/search-account",
  verifyUserToken,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({
      account_number: req.body.account_number,
    });

    if (user) {
      res.send({
        message: "Successfully Search User",
        data: user,
      });
    } else {
      res.status(401).send({
        message: "Cannot find users!",
      });
    }
  })
);

NewOrderRouter.post(
  "/order",
  verifyUserToken,
  checkIfAdminStockMega,
  expressAsyncHandler(async (req, res) => {
    const body = req.body;
    const user = req.user;

    const buyer = await UserVerification.findOne({ user_id: req.body.buyer });
    const seller = await UserVerification.findOne({ user_id: user._id });

    const coffee_ordered = body.coffee_ordered;
    const soap_ordered = body.soap_ordered;

    if (seller && buyer) {
      const coffee_total_price = coffee_ordered * B1T1_PRICE;
      const soap_total_price = soap_ordered * B1T1_PRICE;

      seller.stock_coffee = seller.stock_coffee
        ? seller.stock_coffee - coffee_ordered
        : coffee_ordered;
      seller.stock_soap = seller.stock_soap
        ? seller.stock_soap - soap_ordered
        : soap_ordered;

      if (seller.inventory == undefined) {
        seller.inventory = {
          coffee_income: 0,
          soap_income: 0,
        };
      }

      const coffee_income = seller.inventory.coffee_income
        ? seller.inventory.coffee_income + coffee_total_price
        : coffee_total_price;

      const soap_income = seller.inventory.soap_income
        ? seller.inventory.soap_income + soap_total_price
        : soap_total_price;

      seller.inventory = {
        coffee_income,
        soap_income,
      };

      await seller.save();

      buyer.stock_coffee = buyer.stock_coffee
        ? buyer.stock_coffee + coffee_ordered
        : coffee_ordered;
      buyer.stock_soap = buyer.stock_soap
        ? buyer.stock_soap + soap_ordered
        : soap_ordered;

      await buyer.save();

      if (coffee_ordered) {
        const newPurchase = await Purchase({
          user_id: buyer.user_id,
          first_name: buyer.first_name,
          last_name: buyer.last_name,
          address: buyer.address,
          package: body.package,
          product: "coffee",
          quantity: coffee_ordered,
          value: coffee_total_price,

          user_that_invite: buyer.user_that_invite,
        });

        await newPurchase.save();
      }

      if (soap_ordered) {
        const newPurchase = await Purchase({
          user_id: buyer.user_id,
          first_name: buyer.first_name,
          last_name: buyer.last_name,
          address: buyer.address,
          package: body.package,
          product: "soap",
          quantity: soap_ordered,
          value: soap_total_price,

          user_that_invite: buyer.user_that_invite,
        });

        await newPurchase.save();
      }

      res.send({ message: "Successfully Ordered!" });
    } else {
      res.status(401).send({ message: "Cannot find users!" });
    }
  })
);

export default NewOrderRouter;
