import React, { useState } from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const [imgSrc, setImgSrc] = useState(product.image);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="group relative rounded-2xl p-2.5 transition-all duration-500 hover:-translate-y-1 flex flex-col h-full glass overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 hover:border-white/80">
      
      {/* Background Gradient Shine on Hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/0 to-white/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Category Badge */}
      <div className="absolute top-2.5 left-2.5 z-10">
        <span className="px-2 py-0.5 bg-white/60 backdrop-blur-md rounded-md text-[8px] font-extrabold uppercase tracking-widest text-brand-primary shadow-sm border border-white/50">
          {product.category}
        </span>
      </div>

      {/* Image Container */}
      <div className="relative aspect-[4/5] mb-2 flex items-center justify-center">
        <div className="absolute inset-3 bg-gradient-to-b from-white/10 to-blue-50/10 rounded-xl group-hover:scale-105 transition-transform duration-700"></div>
        <img 
          src={imgSrc} 
          alt={product.name} 
          draggable={false}
          onError={() => setImgSrc('https://placehold.co/400x500/e2e8f0/1e293b?text=Imagen+No+Disponible')}
          className="relative w-full h-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-2xl select-none mix-blend-multiply"
        />
        
        {/* Floating Add Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-1 right-1 w-8 h-8 rounded-lg bg-brand-primary text-white shadow-md shadow-blue-900/20 flex items-center justify-center transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hover:bg-blue-600 z-20"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col relative z-10">
        <div className="mb-1">
          <h3 className="font-bold text-slate-800 text-sm leading-tight group-hover:text-brand-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>
        
        <p className="text-slate-500 text-[10px] leading-relaxed line-clamp-2 mb-2 font-medium opacity-80">
          {product.description}
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-slate-200/30 pt-2">
          <span className="font-extrabold text-base text-brand-dark">
            {formatPrice(product.price)}
          </span>
          {/* Mobile Fallback Button */}
          <button 
            onClick={() => onAddToCart(product)}
            className="md:hidden text-[9px] font-bold text-brand-primary uppercase tracking-wide bg-blue-50 px-2 py-1 rounded"
          >
            + Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;