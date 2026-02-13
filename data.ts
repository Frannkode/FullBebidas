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
      { qty: 12, price: 173760 }
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
      { qty: 12, price: 86400 }
    ]
  },
  {
    id: 3,
    name: "Schneider 473cc",
    category: "Cervezas",
    price: 1700,
    description: "Cerveza lager de tradición alemana, suave y refrescante.",
    image: "/drinks/schneider473.jpeg",
    stock: 65,
    wholesalePrices: [
      { qty: 6, price: 9900 },
      { qty: 12, price: 18350 },
      { qty: 24, price: 34920 }
    ]
  },
  {
    id: 4,
    name: "Quilmes Clásica 473cc",
    category: "Cervezas",
    price: 1800,
    description: "El sabor del encuentro. Equilibrada y refrescante.",
    image: "/drinks/quilmes473.jpeg",
    stock: 72,
    wholesalePrices: [
      { qty: 6, price: 10500 },
      { qty: 12, price: 19800 },
      { qty: 24, price: 39120 }
    ]
  },
  {
    id: 5,
    name: "Budweiser 473cc",
    category: "Cervezas",
    price: 1800,
    description: "The King of Beers. Lager americana de cuerpo medio.",
    image: "/drinks/budweiser473.jpeg",
    stock: 48,
    wholesalePrices: [
      { qty: 6, price: 10320 },
      { qty: 12, price: 19500 },
      { qty: 24, price: 38000 }
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
      { qty: 12, price: 107000 }
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
      { qty: 6, price: 51000 }
    ]
  },
  {
    id: 8,
    name: "Gancia Americano 950cc",
    category: "Aperitivos",
    price: 7800,
    description: "Aperitivo a base de vino blanco y hierbas. Un clásico.",
    image: "/drinks/gancia950.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 2, price: 15400 },
      { qty: 12, price: 85200 }
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
      { qty: 12, price: 46800 }
    ]
  },
  {
    id: 10,
    name: "Dilema Blanco Dulce",
    category: "Vinos",
    price: 3400,
    description: "Vino blanco dulce natural, joven y frutado.",
    image: "/drinks/dilemablanco.jpeg",
    stock: 11,
    wholesalePrices: [
      { qty: 2, price: 6600 },
      { qty: 12, price: 38400 }
    ]
  },
  {
    id: 11,
    name: "Dilema Tinto Malbec",
    category: "Vinos",
    price: 3400,
    description: "Malbec suave y dulce, ideal para tomar frío.",
    image: "/drinks/dilemamalbec.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 12, price: 38400 }
    ]
  },
  {
    id: 12,
    name: "Viñas de Balbo Tinto 1.125cc",
    category: "Vinos",
    price: 2600,
    description: "Vino de mesa tinto, tradicional y rendidor.",
    image: "/drinks/vinabalbo.jpeg",
    stock: 2,
    wholesalePrices: [
      { qty: 2, price: 5100 },
      { qty: 6, price: 13800 },
      { qty: 12, price: 27000 }
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
      { qty: 12, price: 51000 }
    ]
  },
  {
    id: 14,
    name: "Canciller Blend 1.125cc",
    category: "Vinos",
    price: 2700,
    description: "Blend tinto equilibrado, perfecto para la mesa diaria.",
    image: "/drinks/vinocancilierblend.jpeg",
    stock: 12,
    wholesalePrices: [
      { qty: 12, price: 30000 }
    ]
  },
  {
    id: 15,
    name: "Smirnoff Combo Baggio 700cc",
    category: "Combos",
    price: 9600,
    description: "Nuevo producto",
    image: "/drinks/combosmirnoffbaggio.jpeg",
    stock: 0,
    wholesalePrices: [
      { qty: 10, price: 95000 }
    ]
  }
];