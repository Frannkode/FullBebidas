import { Product } from './types';

export const products: Product[] = [
  {
    id: 1,
    name: "Fernet Branca 750cc",
    category: "Aperitivos",
    price: 16500,
    description: "El clásico argentino. Único e inconfundible, ideal para compartir.",
    image: "/drinks/fernetbranca750.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 31500 },
      { qty: 12, price: 172000 },
      { qty: 6, price: 87000 }
    ]
  },
  {
    id: 2,
    name: "Smirnoff No. 21 700cc",
    category: "Vodkas",
    price: 7500,
    description: "Vodka premium número uno del mundo. Pureza y versatilidad.",
    image: "/drinks/smirnoff700.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 15200 },
      { qty: 12, price: 86100 },
      { qty: 6, price: 43700 }
    ]
  },
  {
    id: 3,
    name: "Schneider 473cc",
    category: "Cervezas",
    price: 1800,
    description: "Cerveza lager de tradición alemana, suave y refrescante.",
    image: "/drinks/schneider473.jpeg",
    stock: 76,
    wholesalePrices: [
      { qty: 6, price: 10500 },
      { qty: 12, price: 19000 },
      { qty: 24, price: 36000 }
    ]
  },
  {
    id: 4,
    name: "Quilmes Clásica 473cc",
    category: "Cervezas",
    price: 2000,
    description: "El sabor del encuentro. Equilibrada y refrescante.",
    image: "/drinks/quilmes473.jpeg",
    stock: 72,
    wholesalePrices: [
      { qty: 6, price: 12000 },
      { qty: 12, price: 22000 },
      { qty: 24, price: 41000 }
    ]
  },
  {
    id: 5,
    name: "Budweiser 473cc",
    category: "Cervezas",
    price: 2000,
    description: "The King of Beers. Lager americana de cuerpo medio.",
    image: "/drinks/budweiser473.jpeg",
    stock: 48,
    wholesalePrices: [
      { qty: 6, price: 11500 },
      { qty: 12, price: 21500 },
      { qty: 24, price: 40000 }
    ]
  },
  {
    id: 6,
    name: "Fernet Buhero Negro 700cc",
    category: "Aperitivos",
    price: 9500,
    description: "Un fernet con personalidad, intenso y de gran calidad.",
    image: "/drinks/fernetbuhero700.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 18800 },
      { qty: 12, price: 104700 },
      { qty: 6, price: 53100 }
    ]
  },
  {
    id: 7,
    name: "Fernet 1882 750cc",
    category: "Aperitivos",
    price: 8800,
    description: "El de la etiqueta oscura. Sabor intenso y auténtico.",
    image: "/drinks/fernet1882750.jpeg",
    stock: 6,
    wholesalePrices: [
      { qty: 2, price: 17300 },
      { qty: 6, price: 50300 }
    ]
  },
  {
    id: 8,
    name: "Gancia Americano 950cc",
    category: "Aperitivos",
    price: 7800,
    description: "Aperitivo a base de vino blanco y hierbas. Un clásico.",
    image: "/drinks/gancia950.jpeg",
    stock: 11,
    wholesalePrices: [
      { qty: 2, price: 15400 },
      { qty: 12, price: 85200 },
      { qty: 6, price: 43400 }
    ]
  },
  {
    id: 9,
    name: "Gancia Americano 450cc",
    category: "Aperitivos",
    price: 4500,
    description: "El clásico Gancia en su versión más práctica.",
    image: "/drinks/gancia450.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 8800 },
      { qty: 12, price: 46800 },
      { qty: 6, price: 23600 }
    ]
  },
  {
    id: 10,
    name: "Dilema Blanco Dulce",
    category: "Vinos",
    price: 3500,
    description: "Vino blanco dulce natural, joven y frutado.",
    image: "/drinks/dilemablanco.jpeg",
    stock: 11,
    wholesalePrices: [
      { qty: 12, price: 38400 },
      { qty: 6, price: 19200 },
      { qty: 2, price: 6600 }
    ]
  },
  {
    id: 11,
    name: "Dilema Tinto Malbec",
    category: "Vinos",
    price: 3500,
    description: "Malbec suave y dulce, ideal para tomar frío.",
    image: "/drinks/dilemamalbec.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 12, price: 38400 },
      { qty: 6, price: 19200 },
      { qty: 2, price: 6600 }
    ]
  },
  {
    id: 12,
    name: "Viñas de Balbo Tinto 1.125cc",
    category: "Vinos",
    price: 2700,
    description: "Vino de mesa tinto, tradicional y rendidor.",
    image: "/drinks/vinabalbo.jpeg",
    stock: 5,
    wholesalePrices: [
      { qty: 6, price: 15300 },
      { qty: 12, price: 29400 }
    ]
  },
  {
    id: 13,
    name: "Cerveza Corona 710cc",
    category: "Cervezas",
    price: 4600,
    description: "Cerveza premium mexicana, ideal con una rodaja de lima.",
    image: "/drinks/corona710.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 9200 },
      { qty: 12, price: 49200 },
      { qty: 6, price: 25200 }
    ]
  },
  {
    id: 14,
    name: "Canciller Blend 1.125cc",
    category: "Vinos",
    price: 2700,
    description: "Blend tinto equilibrado, perfecto para la mesa diaria.",
    image: "/drinks/vinocancilierblend.jpeg",
    stock: 1,
    wholesalePrices: [
      { qty: 12, price: 30000 }
    ]
  },
  {
    id: 15,
    name: "Smirnoff Combo Baggio 700cc",
    category: "Combos",
    price: 9200,
    description: "Nuevo producto",
    image: "/drinks/combosmirnoffbaggio.jpeg",
    stock: 0,
    wholesalePrices: [
      { qty: 10, price: 95000 }
    ]
  },
  {
    id: 16,
    name: "Dilema Rosado Dulce",
    category: "Vinos",
    price: 3500,
    description: "Nuevo producto",
    image: "/drinks/dilemarosadodulce.jpeg",
    stock: 5,
    wholesalePrices: [
      { qty: 6, price: 19200 },
      { qty: 12, price: 38400 },
      { qty: 2, price: 6800 }
    ]
  },
  {
    id: 17,
    name: "Branca + Coca",
    category: "Combos",
    price: 19500,
    description: "Fernet Branca 750cc + Coca-Cola",
    image: "/drinks/combobrnacacoca.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 37500 },
      { qty: 6, price: 108000 },
      { qty: 12, price: 208000 }
    ]
  },
  {
    id: 18,
    name: "Buhero + Coca",
    category: "Combos",
    price: 13000,
    description: "Fernet Buhero Negro 700cc + Coca-Cola",
    image: "/drinks/combobuherococa.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 25000 },
      { qty: 6, price: 72000 },
      { qty: 12, price: 138000 }
    ]
  },
  {
    id: 19,
    name: "1882 + Coca",
    category: "Combos",
    price: 12500,
    description: "Fernet 1882 750cc + Coca-Cola",
    image: "/drinks/combo1882coca.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 24000 },
      { qty: 6, price: 69000 },
      { qty: 12, price: 132000 }
    ]
  },
  {
    id: 20,
    name: "Gancia 950 + Sprite",
    category: "Combos",
    price: 11500,
    description: "Gancia Americano 950cc + Sprite",
    image: "/drinks/combospritegancia950.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 22000 },
      { qty: 6, price: 63000 },
      { qty: 12, price: 121000 }
    ]
  },
  {
    id: 21,
    name: "Gancia 450 + Sprite",
    category: "Combos",
    price: 11500,
    description: "Gancia Americano 450cc + Sprite",
    image: "/drinks/combospritegancia450.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 22000 },
      { qty: 6, price: 63000 },
      { qty: 12, price: 121000 }
    ]
  },
  {
    id: 22,
    name: "Dilema blanco + Sprite",
    category: "Combos",
    price: 7000,
    description: "Dilema Blanco Dulce + Sprite",
    image: "/drinks/combodilemasprite.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 13500 },
      { qty: 6, price: 38000 },
      { qty: 12, price: 72000 }
    ]
  },
  {
    id: 23,
    name: "Dilema rosado + Sprite",
    category: "Combos",
    price: 7000,
    description: "Dilema Rosado Dulce + Sprite",
    image: "/drinks/combodilemarosasprite.jpeg",
    stock: 10,
    wholesalePrices: [
      { qty: 2, price: 13500 },
      { qty: 6, price: 38000 },
      { qty: 12, price: 72000 }
    ]
  }
];