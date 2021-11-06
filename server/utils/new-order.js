import { B1T1_PRICE, B2T3_PRICE } from "../constants.js";
import Purchase from "../models/purchase.model.js";

export async function orderBuy1Take1(buyer, seller, body) {
  const coffee_ordered = body.coffee_ordered * 2;
  const soap_ordered = body.soap_ordered;

  const coffee_total_price = body.coffee_ordered * B1T1_PRICE;
  const soap_total_price = soap_ordered * B1T1_PRICE;

  await updateInventory(
    seller,
    buyer,
    coffee_ordered,
    soap_ordered,
    coffee_total_price,
    soap_total_price
  );

  await createPurchase(
    coffee_ordered,
    soap_ordered,
    soap_total_price,
    coffee_total_price,
    body,
    buyer
  );
}

export async function orderBuy2Take3(buyer, seller, body) {
  const coffee_ordered = body.coffee_ordered * 2 + body.coffee_ordered * 3;
  const soap_ordered = body.soap_ordered;

  const coffee_total_price = body.coffee_ordered * B2T3_PRICE;
  const soap_total_price = soap_ordered * B2T3_PRICE;

  await updateInventory(
    seller,
    buyer,
    coffee_ordered,
    soap_ordered,
    coffee_total_price,
    soap_total_price
  );

  await createPurchase(
    coffee_ordered,
    soap_ordered,
    soap_total_price,
    coffee_total_price,
    body,
    buyer
  );
}

async function updateInventory(
  seller,
  buyer,
  coffee_ordered,
  soap_ordered,
  coffee_total_price,
  soap_total_price
) {
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
}

async function createPurchase(
  coffee_ordered,
  soap_ordered,
  soap_total_price,
  coffee_total_price,
  body,
  buyer
) {
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
}
