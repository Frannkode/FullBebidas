import React, { useState } from 'react';
import { CartItem, UserDetails } from '../types';
import { XMarkIcon, WhatsAppIcon } from './Icons';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity 
}) => {
  const [details, setDetails] = useState<UserDetails>({
    name: '',
    address: '',
    phone: '',
    instructions: ''
  });

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    // Construcción del mensaje con formato limpio
    let message = `🍷 *NUEVO PEDIDO - LICORERÍA AZUL & ORO* 🍷\n\n`;
    
    // Sección Cliente
    message += `📋 *DATOS DE ENTREGA:*\n`;
    message += `👤 *Cliente:* ${details.name}\n`;
    message += `📞 *Teléfono:* ${details.phone}\n`;
    message += `📍 *Dirección:* ${details.address}\n`;
    
    if (details.instructions && details.instructions.trim() !== '') {
      message += `📝 *Nota:* ${details.instructions}\n`;
    }

    message += `\n🛒 *DETALLE DEL PEDIDO:*\n`;

    // Sección Productos
    cartItems.forEach(item => {
      const subtotal = item.price * item.quantity;
      // Formato: 2x Nombre Producto ($Precio)
      message += `▪️ *${item.quantity}x* ${item.name} — ${formatPrice(subtotal)}\n`;
    });

    message += `\n〰️〰️〰️〰️〰️〰️〰️\n`;
    message += `💰 *TOTAL A PAGAR: ${formatPrice(total)}*\n`;
    message += `〰️〰️〰️〰️〰️〰️〰️\n\n`;
    
    message += `✅ _Pedido generado desde la Web App_`;

    // Codificar correctamente el mensaje para URL
    const encodedMessage = encodeURIComponent(message);
    const phoneNumber = "543482232529"; // Número actualizado
    
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 z-[60] bg-brand-dark/30 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Panel - Frosted Glass */}
      <div className={`fixed inset-y-0 right-0 z-[70] w-full max-w-md bg-white/80 backdrop-blur-2xl border-l border-white/50 shadow-2xl transform transition-transform duration-500 cubic-bezier(0.22, 1, 0.36, 1) flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-200/50 flex items-center justify-between bg-white/40">
          <div>
            <h2 className="text-2xl font-bold text-brand-dark tracking-tight">Tu Pedido</h2>
            <p className="text-xs text-slate-500 font-medium">{cartItems.length} productos listos</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/50 rounded-full transition-colors text-slate-500">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="font-medium text-slate-500">Tu carrito está esperando bebidas.</p>
            </div>
          ) : (
            cartItems.map(item => (
              <div key={item.id} className="flex gap-4 p-3 rounded-2xl bg-white/50 border border-white/60 hover:bg-white/80 transition-colors shadow-sm">
                <div className="w-16 h-16 bg-white rounded-xl p-1 shrink-0 flex items-center justify-center overflow-hidden">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-slate-400 text-xs">{item.category}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2 bg-white rounded-lg p-1 shadow-sm">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-5 h-5 rounded flex items-center justify-center text-slate-500 hover:text-brand-primary hover:bg-slate-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-bold text-brand-primary text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Checkout Area */}
        {cartItems.length > 0 && (
          <div className="bg-white/60 backdrop-blur-xl border-t border-white p-6 pb-8">
            <div className="space-y-3 mb-6">
               <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detalles de entrega</h3>
               <div className="grid grid-cols-2 gap-3">
                 <input 
                   name="name" placeholder="Nombre" 
                   className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-slate-400"
                   value={details.name} onChange={handleInputChange}
                 />
                 <input 
                   name="phone" placeholder="Teléfono" type="tel"
                   className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-slate-400"
                   value={details.phone} onChange={handleInputChange}
                 />
               </div>
               <input 
                 name="address" placeholder="Dirección completa" 
                 className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-slate-400"
                 value={details.address} onChange={handleInputChange}
               />
               <textarea
                 name="instructions" placeholder="Notas adicionales (opcional)" rows={2}
                 className="w-full bg-white/70 border border-white/50 rounded-xl p-3 text-sm shadow-sm focus:ring-2 focus:ring-brand-primary/20 outline-none transition-all placeholder:text-slate-400 resize-none"
                 value={details.instructions} onChange={handleInputChange}
               />
            </div>

            <div className="flex justify-between items-end mb-5">
              <span className="text-slate-500 text-sm font-medium">Total</span>
              <span className="text-3xl font-black text-brand-primary tracking-tight">{formatPrice(total)}</span>
            </div>

            <button 
              onClick={handleCheckout}
              disabled={!details.name || !details.phone || !details.address}
              className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 transition-all shadow-lg shadow-green-500/20 active:scale-95 ${
                (!details.name || !details.phone || !details.address) 
                  ? 'bg-slate-300 cursor-not-allowed shadow-none' 
                  : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500'
              }`}
            >
              <WhatsAppIcon className="w-5 h-5" />
              Finalizar Pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;