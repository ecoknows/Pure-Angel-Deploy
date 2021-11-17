import { COFFEE_PACKAGE_PER_PIN, SOAP_PACKAGE_PER_PIN } from "../constants.js";
import User from "../models/user.model.js";
import UserVerification from "../models/user.verification.model.js";

export async function initializeAccount(req, res, next) {
  const body = req.body;
  const user = req.user;

  const searched_account = await User.findOne({
    account_number: body.account_number,
  });

  const searched_account_verification = await UserVerification.findOne({
    user_id: searched_account._id,
  });

  const mega_center_account = await User.findById(user._id);

  const mega_center_account_verification = await UserVerification.findOne({
    user_id: user._id,
  });

  if (
    searched_account &&
    searched_account_verification &&
    searched_account.is_stockist &&
    mega_center_account.number_of_pin > 0 &&
    mega_center_account.number_of_pin >= req.body.number_of_pin
  ) {
    req.searched_account = searched_account;
    req.searched_account_verification = searched_account_verification;

    req.mega_center_account = mega_center_account;
    req.mega_center_account_verification = mega_center_account_verification;

    req.number_of_pin = req.body.number_of_pin;
    req.total_income = 0;

    next();
  } else {
    res.status(404).send({ message: "Invalid..." });
  }
}

export async function checkStock(req, res, next) {
  const number_of_pin = req.number_of_pin;
  const mega_center_account_verification = req.mega_center_account_verification;

  if (mega_center_account_verification) {
    if (
      mega_center_account_verification.stock_coffee >= 5 * number_of_pin &&
      mega_center_account_verification.stock_soap >= 4 * number_of_pin
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
  const mega_center_account = req.mega_center_account;

  if (searched_account.ending_pin == undefined) {
    searched_account.ending_pin = mega_center_account.ending_pin;
  }

  searched_account.number_of_pin = searched_account.number_of_pin
    ? searched_account.number_of_pin + number_of_pin
    : number_of_pin;

  mega_center_account.number_of_pin =
    mega_center_account.number_of_pin - number_of_pin;

  mega_center_account.ending_pin =
    mega_center_account.ending_pin + number_of_pin;

  await searched_account.save();
  await mega_center_account.save();

  next();
}

export async function updateStock(req, res, next) {
  const searched_account_verification = req.searched_account_verification;
  const number_of_pin = req.number_of_pin;
  const total_coffee_added = number_of_pin * COFFEE_PACKAGE_PER_PIN;
  const total_soap_added = number_of_pin * SOAP_PACKAGE_PER_PIN;

  searched_account_verification.stock_coffee =
    searched_account_verification.stock_coffee
      ? searched_account_verification.stock_coffee + total_coffee_added
      : total_coffee_added;

  searched_account_verification.stock_soap =
    searched_account_verification.stock_soap
      ? searched_account_verification.stock_soap + total_soap_added
      : total_soap_added;

  await searched_account_verification.save();

  next();
}

export async function updateMegaCenterStock(req, res, next) {
  const mega_center_account_verification = req.mega_center_account_verification;
  const number_of_pin = req.number_of_pin;
  const total_coffee_added = number_of_pin * COFFEE_PACKAGE_PER_PIN;
  const total_soap_added = number_of_pin * SOAP_PACKAGE_PER_PIN;

  mega_center_account_verification.stock_coffee =
    mega_center_account_verification.stock_coffee - total_coffee_added;
  mega_center_account_verification.stock_soap =
    mega_center_account_verification.stock_soap - total_soap_added;

  await mega_center_account_verification.save();

  next();
}
