export const mockProducts = [
  {
    id: "prod_001",
    slug: "void-cargo-shell",
    name: "Void Cargo Shell",
    price: 180,
    category: "Jacket",
    image: "/images/void_cargo_shell.png",
    colors: [
      { name: 'Void Black', hex: '#000000' },
      { name: 'Ash', hex: '#4B5563' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: "Engineered for the metropolitan void. The Cargo Shell features waterproof zippers, articulated sleeves, and a brutalist boxy fit.",
    materials: ["100% Recycled Nylon", "DWR Finish", "Machine wash cold, line dry."]
  },
  {
    id: "prod_002",
    slug: "monolith-hoodie",
    name: "Monolith Hoodie",
    price: 120,
    category: "Hoodie",
    image: "/images/monolith_hoodie.png",
    colors: [
      { name: 'Void Black', hex: '#000000' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    description: "Heavyweight drop-shoulder hoodie designed to armor you against the elements. Deep hood, structured cuffs, pure comfort.",
    materials: ["80% Organic Cotton", "20% Recycled Poly", "Heavyweight 450gsm"]
  },
  {
    id: "prod_003",
    slug: "signal-boxy-tee",
    name: "Signal Boxy Tee",
    price: 65,
    category: "Top",
    image: "/images/signal_boxy_tee.png",
    colors: [
      { name: 'Ash Grey', hex: '#9CA3AF' },
      { name: 'Void Black', hex: '#000000' }
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    description: "The ultimate basic. An exaggerated boxy fit that drapes perfectly, featuring subtle tonal branding on the spine.",
    materials: ["100% Peruvian Cotton", "Pre-shrunk", "Garment dyed"]
  },
  {
    id: "prod_004",
    slug: "nebula-runners",
    name: "Nebula Runners",
    price: 240,
    category: "Footwear",
    image: "/images/nebula_runners.png",
    colors: [
      { name: 'Neon/Black', hex: '#111111' }
    ],
    sizes: ['8', '9', '10', '11', '12'],
    description: "Low-profile tactical footwear with a responsive 3D-printed midsole. Ultra lightweight performance.",
    materials: ["Vibram Outsole", "Knit Upper", "Reflective Accents"]
  }
];
