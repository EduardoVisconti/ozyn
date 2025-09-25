// src/data/products.js
export const products = [
  {
    id: "seamless-leggings-001",
    title: "Seamless Leggings",
    category: "Leggings",
    price: 64,
    salePrice: 54, // deixe undefined se não estiver em promoção
    images: ["/assets/prod/leggings-1.jpg", "/assets/prod/leggings-1b.jpg"],
    colors: ["black", "wine"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "High-waisted seamless leggings designed for training and yoga. Squat-proof, breathable and sculpting.",
    seo: { slug: "seamless-leggings", metaTitle: "Seamless Leggings | OZYN", metaDesc: "High-waisted seamless leggings." },
  },
  {
    id: "support-sports-bra-001",
    title: "Support Sports Bra",
    category: "Sports Bra",
    price: 42,
    images: ["/assets/prod/bra-1.jpg", "/assets/prod/bra-1b.jpg"],
    colors: ["black", "sand"],
    sizes: ["XS", "S", "M", "L", "XL"],
    description:
      "Medium support with a smooth hand-feel. Cross-back straps for range of motion.",
    seo: { slug: "support-sports-bra", metaTitle: "Support Sports Bra | OZYN", metaDesc: "Medium support training bra." },
  },
  {
    id: "ribbed-tank-001",
    title: "Ribbed Tank",
    category: "Tops",
    price: 28,
    images: ["/assets/prod/tank-1.jpg"],
    colors: ["white", "olive"],
    sizes: ["XS", "S", "M", "L"],
    description:
      "Ribbed stretch tank for studio days and everyday layering.",
    seo: { slug: "ribbed-tank", metaTitle: "Ribbed Tank | OZYN", metaDesc: "Ribbed stretch tank." },
  },
];
