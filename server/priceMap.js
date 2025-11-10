// server/priceMap.js
// Mapeia cada produto (e variação de cor, quando existir) para o Stripe Price ID.
// SUBSTITUI os "price_xxx" pelos IDs reais do Stripe.module.exports = {

module.exports = {
  // Sets normais (um price por produto)
  "mocha-layered-performance-set": 'price_1SQsggECcki6qKDGhC2eWZ8G',
  "maternity-support-set": 'price_1SQsheECcki6qKDGrwzQoF85',
  "evergreen-studio-short-set": 'price_1SQsiKECcki6qKDGR8UawaEJ',
  "velocity-long-sleeve-short-set": 'price_1SQsjMECcki6qKDGtev79BjI',
  "minimal-rib-tank-dress": 'price_1SQsjsECcki6qKDGVJZrG6Ln',
  "cloudflow-yoga-zip-set": 'price_1SQskMECcki6qKDZriq9C64',

  // ------------------- POWER SEAMLESS (1 PRODUTO, VÁRIAS CORES) -------------------
  // Usamos chave: "power-seamless-set::cor-em-lowercase"
  "power-seamless-set": 'price_1SQsixECcki6qKDGYXpNYbwV',
};
