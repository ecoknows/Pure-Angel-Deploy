import UserVerification from "../models/user.verification.model.js";
import User from "../models/user.model.js";
import {
  B1T1_AE_REBATES,
  B1T1_MEGA_CENTER_INCOME,
  B1T1_PRICE,
  B1T1_STOCKIST_ENCODE_NEW_ORDER,
  B1T1_STOCKIST_INCOME,
  B2T3_AE_REBATES,
  B2T3_MEGA_CENTER_INCOME,
  B2T3_PRICE,
  B2T3_STOCKIST_ENCODE_NEW_ORDER,
  B2T3_STOCKIST_INCOME,
  STOCKIST_REPEAT_PURCHASE_COFFEE,
  STOCKIST_REPEAT_PURCHASE_SOAP,
} from "../constants.js";
import Purchase from "../models/purchase.model.js";

export async function initializeNewOrder(req, res, next) {
  const body = req.body;
  const user = req.user;

  const buyer = await UserVerification.findOne({ user_id: body.buyer });
  const seller = await UserVerification.findOne({ user_id: user._id });

  if (seller && buyer) {
    req.buyer = buyer;
    req.seller = seller;

    next();
  } else {
    res.status(401).send({ message: "Cannot find users!" });
  }
}

export async function orderBuy1Take1(req, res, next) {
  const body = req.body;

  if (body.package == "b1t1") {
    req.coffee_ordered = body.coffee_ordered * 2;
    req.soap_ordered = body.soap_ordered;

    req.coffee_total_price = body.coffee_ordered * B1T1_PRICE;
    req.soap_total_price = req.soap_ordered * B1T1_PRICE;
  }

  next();
}

export async function orderBuy2Take3(req, res, next) {
  const body = req.body;

  if (body.package == "b2t3") {
    req.coffee_ordered = body.coffee_ordered * 2 + body.coffee_ordered * 3;
    req.soap_ordered = body.soap_ordered;

    req.coffee_total_price = body.coffee_ordered * B2T3_PRICE;
    req.soap_total_price = req.soap_ordered * B2T3_PRICE;
  }

  next();
}

export async function updateSellerStock(req, res, next) {
  const seller = req.seller;
  const coffee_ordered = req.coffee_ordered;
  const soap_ordered = req.soap_ordered;
  const coffee_total_price = req.coffee_total_price;
  const soap_total_price = req.soap_total_price;

  if (
    seller.stock_coffee &&
    seller.stock_soap &&
    seller.stock_coffee >= coffee_ordered &&
    seller.stock_soap >= soap_ordered
  ) {
    seller.stock_coffee = seller.stock_coffee - coffee_ordered;
    seller.stock_soap = seller.stock_soap - soap_ordered;

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
    next();
  } else {
    res.status(401).send({
      message: "Your out of stock....",
    });
  }
}

export async function updateBuyerStock(req, res, next) {
  const buyer = req.buyer;
  const coffee_ordered = req.coffee_ordered;
  const soap_ordered = req.soap_ordered;

  buyer.stock_coffee = buyer.stock_coffee
    ? buyer.stock_coffee + coffee_ordered
    : coffee_ordered;
  buyer.stock_soap = buyer.stock_soap
    ? buyer.stock_soap + soap_ordered
    : soap_ordered;

  await buyer.save();

  next();
}

export async function createPurchase(req, res, next) {
  const coffee_ordered = req.coffee_ordered;
  const soap_ordered = req.soap_ordered;
  const soap_total_price = req.soap_total_price;
  const coffee_total_price = req.coffee_total_price;
  const body = req.body;
  const buyer = req.buyer;

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
  next();
}

export async function automaticEquivalentRebatesIncome(req, res, next) {
  const buyer = req.buyer;
  const body = req.body;

  const referral_verification = await UserVerification.findOne({
    user_id: buyer.user_that_invite.user_id,
  });

  if (referral_verification) {
    if (body.package == "b1t1") {
      const total_income = body.coffee_ordered * B1T1_AE_REBATES;

      referral_verification.b1t1_ae_rebates =
        referral_verification.b1t1_ae_rebates + total_income;

      referral_verification.overall_income =
        referral_verification.overall_income + total_income;

      referral_verification.unpaid_income =
        referral_verification.unpaid_income + total_income;

      await referral_verification.save();
    } else if (body.package == "b2t3") {
      const total_income = body.coffee_ordered * B2T3_AE_REBATES;
      referral_verification.b2t3_ae_rebates =
        referral_verification.b2t3_ae_rebates + total_income;

      referral_verification.overall_income =
        referral_verification.overall_income + total_income;

      referral_verification.unpaid_income =
        referral_verification.unpaid_income + total_income;

      await referral_verification.save();
    }
  }

  next();
}

export async function purchaseIncome(req, res, next) {
  const seller = req.seller;
  const user = req.user;
  const body = req.body;

  if (body.package == "b1t1") {
    if (user.is_mega_center) {
      const total_income = B1T1_MEGA_CENTER_INCOME * body.coffee_ordered;

      seller.b1t1_income = seller.b1t1_income
        ? seller.b1t1_income + total_income
        : total_income;

      seller.overall_income = seller.overall_income + total_income;
      seller.unpaid_income = seller.unpaid_income + total_income;

      await seller.save();
    } else if (user.is_stockist) {
      const total_income = B1T1_STOCKIST_INCOME * body.coffee_ordered;

      seller.b1t1_income = seller.b1t1_income
        ? seller.b1t1_income + total_income
        : total_income;

      seller.b1t1_income = seller.b1t1_income
        ? seller.b1t1_income + total_income
        : total_income;

      seller.overall_income = seller.overall_income + total_income;
      seller.unpaid_income = seller.unpaid_income + total_income;

      await seller.save();
    }
  } else if (body.package == "b2t3") {
    if (user.is_mega_center) {
      const total_income = B2T3_MEGA_CENTER_INCOME * body.coffee_ordered;

      seller.b2t3_income = seller.b2t3_income
        ? seller.b2t3_income + total_income
        : total_income;

      seller.overall_income = seller.overall_income + total_income;
      seller.unpaid_income = seller.unpaid_income + total_income;

      await seller.save();
    } else if (user.is_stockist) {
      seller.b2t3_income = seller.b2t3_income
        ? seller.b2t3_income + total_income
        : total_income;

      seller.overall_income = seller.overall_income + total_income;
      seller.unpaid_income = seller.unpaid_income + total_income;

      await seller.save();
    }
  }

  next();
}

export async function stockistRepeatPurchase(req, res, next) {
  const seller = req.seller;
  const buyer = req.buyer;
  const seller_user = req.user;
  const coffee_ordered = req.coffee_ordered;
  const soap_ordered = req.soap_ordered;

  const buyer_user = await User.findById(buyer.user_id);

  if (buyer_user.is_stockist) {
    const stockist_mega_center = await User.findOne({
      secret_code_suffix: buyer_user.secret_code_suffix,
      is_mega_center: true,
    });

    const user_verifaciton_mega_center = await UserVerification.findOne({
      user_id: stockist_mega_center._id,
    });

    if (coffee_ordered) {
      const total_income = coffee_ordered * STOCKIST_REPEAT_PURCHASE_COFFEE;

      user_verifaciton_mega_center.stockist_repeat_purchase_coffee =
        user_verifaciton_mega_center.stockist_repeat_purchase_coffee
          ? user_verifaciton_mega_center.stockist_repeat_purchase_coffee +
            total_income
          : total_income;

      user_verifaciton_mega_center.overall_income =
        user_verifaciton_mega_center.overall_income + total_income;
      user_verifaciton_mega_center.unpaid_income =
        user_verifaciton_mega_center.unpaid_income + total_income;

      await user_verifaciton_mega_center.save();
    }

    if (soap_ordered) {
      const total_income = soap_ordered * STOCKIST_REPEAT_PURCHASE_SOAP;

      user_verifaciton_mega_center.stockist_repeat_purchase_soap =
        user_verifaciton_mega_center.stockist_repeat_purchase_soap
          ? user_verifaciton_mega_center.stockist_repeat_purchase_soap +
            total_income
          : total_income;

      user_verifaciton_mega_center.overall_income =
        user_verifaciton_mega_center.overall_income + total_income;
      user_verifaciton_mega_center.unpaid_income =
        user_verifaciton_mega_center.unpaid_income + total_income;

      await user_verifaciton_mega_center.save();
    }
  }

  next();
}

export async function stockistEncodeNewOrder(req, res, next) {
  const seller = req.seller;
  const user = req.user;
  const body = req.body;
  const coffee_ordered = req.coffee_ordered;

  if (user.is_stockist) {
    const stockist_user = await User.findById(user._id);
    const mega_center_user = await User.findOne({
      secret_code_suffix: stockist_user.secret_code_suffix,
      is_mega_center: true,
    });

    if (mega_center_user) {
      const mega_center_verification = await UserVerification.findOne({
        user_id: mega_center_user._id,
      });

      if (mega_center_verification) {
        if (body.package == "b1t1") {
          const total_income = coffee_ordered * B1T1_STOCKIST_ENCODE_NEW_ORDER;

          mega_center_verification.b1t1_stockist_encode_new_order =
            mega_center_verification.b1t1_stockist_encode_new_order
              ? mega_center_verification.b1t1_stockist_encode_new_order +
                total_income
              : total_income;

          mega_center_verification.overall_income =
            mega_center_verification.overall_income + total_income;

          mega_center_verification.unpaid_income =
            mega_center_verification.unpaid_income + total_income;

          await mega_center_verification.save();
        } else if (body.package == "b2t3") {
          0;
          const total_income = coffee_ordered * B2T3_STOCKIST_ENCODE_NEW_ORDER;

          mega_center_verification.b2t3_stockist_encode_new_order =
            mega_center_verification.b2t3_stockist_encode_new_order
              ? mega_center_verification.b2t3_stockist_encode_new_order +
                total_income
              : total_income;

          mega_center_verification.overall_income =
            mega_center_verification.overall_income + total_income;

          mega_center_verification.unpaid_income =
            mega_center_verification.unpaid_income + total_income;

          await mega_center_verification.save();
        }
      }
    }
  }

  next();
}
