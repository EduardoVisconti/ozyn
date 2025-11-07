// src/data/products.js

export const products = [
  {
    id: "ozyn-mocha-layered-set",
    title: "Mocha Layered Performance Set",
    category: "Sets",
    color: "Mocha",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Three-piece mocha set with sports bra, high-waisted leggings and a lightweight jacket for layered looks in and out of the gym.",
    price: 99,
    images: [
      "/assets/products/mocha-set-1.jpg",
      "/assets/products/mocha-set-2.jpg",
      "/assets/products/mocha-set-3.jpg",
    ],
    tags: ["bestseller"],
    seo: {
      slug: "mocha-layered-performance-set",
      metaTitle: "Mocha Layered Performance Set | OZYN",
      metaDescription:
        "Mocha three-piece performance set built for training, layering and everyday wear.",
    },
  },

  {
    id: "ozyn-maternity-support-set",
    title: "Maternity Support Set",
    category: "Maternity",
    color: "Grey",
    sizes: ["S", "M", "L"],
    description:
      "Soft, supportive set with high-rise leggings and matching top designed to adapt through every stage.",
    price: 89,
    images: [
      "/assets/products/maternity-support-set-1.jpg",
      "/assets/products/maternity-support-set-2.jpg",
      "/assets/products/maternity-support-set-3.jpg",
    ],
    tags: ["new"],
    seo: {
      slug: "maternity-support-set",
      metaTitle: "Maternity Support Set | OZYN",
      metaDescription:
        "Supportive maternity active set with breathable fabric and elevated coverage.",
    },
  },

  {
    id: "ozyn-evergreen-short-set",
    title: "Evergreen Studio Short Set",
    category: "Sets",
    color: "Green",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Fitted biker shorts and cropped top in deep green, made for strength sessions and studio days.",
    price: 69,
    images: [
      "/assets/products/evergreen-short-set-1.jpg",
      "/assets/products/evergreen-short-set-2.jpg",
      "/assets/products/evergreen-short-set-3.jpg",
      "/assets/products/evergreen-short-set-4.jpg",
    ],
    tags: [],
    seo: {
      slug: "evergreen-studio-short-set",
      metaTitle: "Evergreen Studio Short Set | OZYN",
      metaDescription:
        "Green short set crafted for freedom of movement and heat-ready training.",
    },
  },

  // Power Seamless: todas as cores no mesmo produto
  {
    id: "ozyn-power-seamless-set",
    title: "Power Seamless Set",
    category: "Sets",
    description:
      "Signature seamless set with compressive high-waist leggings and a sculpting sleeveless top. Multiple colorways, one performance fit.",
    price: 79,
    sizes: ["XS", "S", "M", "L"],
    variants: [
      {
        color: "Pink",
        code: "pink",
        images: [
          "/assets/products/power-pink-1.jpg",
          "/assets/products/power-pink-2.jpg",
          "/assets/products/power-pink-3.jpg",
          "/assets/products/power-pink-4.jpg",
        ],
      },
      {
        color: "Black",
        code: "black",
        images: [
          "/assets/products/power-black-1.jpg",
          "/assets/products/power-black-2.jpg",
          "/assets/products/power-black-3.jpg",
        ],
      },
      {
        color: "Wine",
        code: "wine",
        images: [
          "/assets/products/power-wine-1.jpg",
          "/assets/products/power-wine-2.jpg",
          "/assets/products/power-wine-3.jpg",
          "/assets/products/power-wine-4.jpg",
        ],
      },
      {
        color: "White",
        code: "white",
        images: [
          "/assets/products/power-white-1.jpg",
          "/assets/products/power-white-2.jpg",
          "/assets/products/power-white-3.jpg",
          "/assets/products/power-white-4.jpg",
        ],
      },
    ],
    tags: ["new", "bestseller"],
    seo: {
      slug: "power-seamless-set",
      metaTitle: "Power Seamless Set | OZYN",
      metaDescription:
        "Power Seamless set available in multiple colorways. Sculpting, seamless and built to move.",
    },
  },

  {
    id: "ozyn-velocity-long-sleeve",
    title: "Velocity Long Sleeve Short Set",
    category: "Sets",
    color: "Black",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Cropped long-sleeve and fitted shorts for high-intensity days with extra coverage up top.",
    price: 75,
    images: [
      "/assets/products/velocity-long-sleeve-1.jpg",
      "/assets/products/velocity-long-sleeve-2.jpg",
      "/assets/products/velocity-long-sleeve-3.jpg",
    ],
    tags: ["bestseller"],
    seo: {
      slug: "velocity-long-sleeve-short-set",
      metaTitle: "Velocity Long Sleeve Short Set | OZYN",
      metaDescription:
        "Velocity long sleeve and short combo made for explosive sessions.",
    },
  },

  {
    id: "ozyn-minimal-rib-dress",
    title: "Minimal Rib Tank Dress",
    category: "Dresses",
    color: "Black",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Ribbed tank dress with a clean, body-skimming fit — from studio layers to off-duty.",
    price: 65,
    images: [
      "/assets/products/minimal-rib-dress-1.jpg",
      "/assets/products/minimal-rib-dress-2.jpg",
      "/assets/products/minimal-rib-dress-3.jpg",
    ],
    tags: [],
    seo: {
      slug: "minimal-rib-tank-dress",
      metaTitle: "Minimal Rib Tank Dress | OZYN",
      metaDescription:
        "Minimal ribbed dress designed for easy layering and everyday movement.",
    },
  },

  {
    id: "ozyn-cloudflow-yoga-set",
    title: "Cloudflow Yoga Zip Set",
    category: "Sets",
    color: "Light Blue",
    sizes: ["XS", "S", "M", "L"],
    description:
      "Soft-touch leggings and a cropped zip jacket made for yoga, pilates and light training.",
    price: 89,
    images: [
      "/assets/products/cloudflow-yoga-blue-1.jpg",
      "/assets/products/cloudflow-yoga-blue-2.jpg",
      "/assets/products/cloudflow-yoga-blue-3.jpg",
    ],
    tags: ["new"],
    seo: {
      slug: "cloudflow-yoga-zip-set",
      metaTitle: "Cloudflow Yoga Zip Set | OZYN",
      metaDescription:
        "Cloudflow zip set in light blue for studio days and everyday comfort.",
    },
  },
];
