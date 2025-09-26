// functions/priceMap.js
// Map your product slugs (and optionally variants) to Stripe Price IDs
module.exports = {
  // Example:
  // "seamless-leggings": { DEFAULT: "price_ABC123" },
  // "support-sports-bra": { DEFAULT: "price_DEF456" },
  // If you want per-size/ color, expand here, e.g. "S", "M", etc.
  'seamless-leggings': { DEFAULT: 'price_1SBLKHFYnIarTaGeR007wrjy' },

  'support-sports-bra': { DEFAULT: 'price_1SBLKkFYnIarTaGetPbvDhHw' },
  
  'ribbed-tank': { DEFAULT: 'price_1SBLLxFYnIarTaGeQg43hIFv' }
}
