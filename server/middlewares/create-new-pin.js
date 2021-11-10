import { COFFEE_PACKAGE_PER_PIN, SOAP_PACKAGE_PER_PIN } from "../constants.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";

export async function initializeAccount(req, res, next) {
  const body = req.body;
  const user = req.user;

  const searched_account = await User.findOne({
    account_number: body.account_number,
  });

  const verification_account = await UserVerification.findOne({
    user_id: searched_account._id,
  });

  const admin_user = await UserVerification.findOne({
    user_id: user._id,
  });

  if (
    searched_account &&
    verification_account &&
    (searched_account.is_mega_center || searched_account.is_admin)
  ) {
    req.searched_account = searched_account;
    req.verification_account = verification_account;
    req.number_of_pin = req.body.number_of_pin;
    req.admin_user = admin_user;
    req.total_income = 0;

    next();
  } else {
    res.status(404).send({ message: "Invalid Account...." });
  }
}

export async function checkStock(req, res, next) {
  const number_of_pin = req.number_of_pin;
  const admin_user = req.admin_user;

  if (admin_user) {
    if (
      admin_user.stock_coffee >= 5 * number_of_pin &&
      admin_user.stock_soap >= 4 * number_of_pin
    ) {
      next();
    } else {
      res.status(404).send({ message: "Please restock product is empty..." });
    }
  } else {
    res.status(404).send({ message: "Cannot find user..." });
  }
}

export async function updatePin(req, res, next) {
  const searched_account = req.searched_account;
  const number_of_pin = req.number_of_pin;

  searched_account.number_of_pin = searched_account.number_of_pin
    ? searched_account.number_of_pin + number_of_pin
    : number_of_pin;

  await searched_account.save();

  next();
}

export async function updateStock(req, res, next) {
  const verification_account = req.verification_account;
  const number_of_pin = req.number_of_pin;
  const total_coffee_added = number_of_pin * COFFEE_PACKAGE_PER_PIN;
  const total_soap_added = number_of_pin * SOAP_PACKAGE_PER_PIN;

  verification_account.stock_coffee = verification_account.stock_coffee
    ? verification_account.stock_coffee + total_coffee_added
    : total_coffee_added;

  verification_account.stock_soap = verification_account.stock_soap
    ? verification_account.stock_soap + total_soap_added
    : total_soap_added;

  await verification_account.save();

  next();
}

export async function updateAdminStock(req, res, next) {
  const admin_user = req.admin_user;
  const number_of_pin = req.number_of_pin;
  const total_coffee_added = number_of_pin * COFFEE_PACKAGE_PER_PIN;
  const total_soap_added = number_of_pin * SOAP_PACKAGE_PER_PIN;

  admin_user.stock_coffee = admin_user.stock_coffee - total_coffee_added;
  admin_user.stock_soap = admin_user.stock_soap - total_soap_added;

  await admin_user.save();

  next();
}
