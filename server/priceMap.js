// server/priceMap.js
// Mapeia cada produto (e variação de cor, quando existir) para o Stripe Price ID.
// SUBSTITUI os "price_xxx" pelos IDs reais do Stripe.

module.exports = {
  // Sets normais (um price por produto)
  "mocha-layered-performance-set": "price_MOCHA_SET",
  "maternity-support-set": "price_MATERNITY_SET",
  "evergreen-studio-short-set": "price_EVERGREEN_SET",
  "velocity-long-sleeve-short-set": "price_VELOCITY_SET",
  "minimal-rib-tank-dress": "price_MINIMAL_DRESS",
  "cloudflow-yoga-zip-set": "price_CLOUDFLOW_SET",

  // Power Seamless Set (um produto, várias cores)
  // Aqui a chave é: slug:cor-em-lowercase
  "power-seamless-set:pink": "price_POWER_PINK",
  "power-seamless-set:black": "price_POWER_BLACK",
  "power-seamless-set:wine": "price_POWER_WINE",
  "power-seamless-set:white": "price_POWER_WHITE",
};
