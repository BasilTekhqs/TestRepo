const Stripe = require('stripe');
const config = require('../config.json');
const stripe = Stripe(config.stripe.secret);

module.exports = {
  stripePayment,
};

const priceList = {
  photopgraphy: {
    base: 50,
    bedroom: 5,
    bathroom: 5,
    garden: 5,
    gasAppliance: 0,
    furnished: 0,
  },
  inventory: {
    base: 80,
    bedroom: 5,
    bathroom: 5,
    garden: 5,
    gasAppliance: 0,
    furnished: 30,
  },
  gasSafety: {
    base: 80,
    bedroom: 0,
    bathroom: 0,
    garden: 0,
    gasAppliance: 20,
    furnished: 0,
  },
  eicr: {
    base: 250,
    bedroom: 0,
    bathroom: 0,
    garden: 0,
    gasAppliance: 0,
    furnished: 0,
  },
  epc: {
    base: 70,
    bedroom: 0,
    bathroom: 0,
    garden: 0,
    gasAppliance: 0,
    furnished: 0,
  },
  floorplan: {
    base: 50,
    bedroom: 5,
    bathroom: 5,
    garden: 0,
    gasAppliance: 0,
    furnished: 20,
  },
};

const priceCalculator = (customerInfo, pricingType) => {
  const price = Object.keys(priceList[pricingType]).reduce(
    (partialPrice, priceKey) => {
      const quantity = customerInfo[priceKey] ? customerInfo[priceKey] : 0;
      const newPrice =
        partialPrice + quantity * priceList[priceKey][pricingType];
      return newPrice;
    },
    priceList[pricingType].base,
  );
  return price;
};

const payWithStripe = async customer => {
  const price = priceCalculator(customer.saleInfo, customer.service);
  const charge = await stripe.paymentIntents.create({
    amount: price,
    currency: 'gbp',
    description: customer.service,
    metadata: {
      ...customer,
    },
    receipt_email: customer.email,
  });
  return charge;
};

async function stripePayment(params, origin) {
  const charge = await payWithStripe(params);
  return charge;
}
