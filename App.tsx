import React, { useState, useEffect } from 'react';
import { products as initialProducts } from './data';
import { CartItem, Product } from './types';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import { ShoppingCartIcon, WhatsAppIcon } from './components/Icons';
import HorizontalScroll from './components/HorizontalScroll';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';
import { getProducts, initializeProducts } from './firebase/products';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);

  // Check for admin auth on mount
  useEffect(() => {
    const adminAuth = localStorage.getItem('admin_auth');
    if (adminAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Check URL for admin route
  useEffect(() => {
    if (window.location.pathname === '/admin') {
      setShowAdmin(true);
    }
  }, []);

  // Load products from Firebase
  useEffect(() => {
    const loadProducts = async () => {
      const dbProducts = await getProducts();
      if (dbProducts.length > 0) {
        setProducts(dbProducts);
      } else {
        // Initialize with data.ts products
        await initializeProducts(initialProducts);
        setProducts(initialProducts);
      }
      setLoading(false);
    };
    loadProducts();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setShowAdmin(true);
    window.history.pushState({}, '', '/admin');
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAdmin(false);
    setShowAdmin(false);
    window.history.pushState({}, '', '/');
  };

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev
      .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
      .filter(item => item.quantity > 0)
    );
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Helper to check if we are in "Browse Mode" (No search, viewing All)
  const isBrowseMode = selectedCategory === 'Todos' && !searchTerm;

  // Show Admin Panel
  if (showAdmin) {
    if (!isAdmin) {
      return <AdminLogin onLogin={handleAdminLogin} />;
    }
    return <AdminPanel onLogout={handleAdminLogout} />;
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-300 via-purple-300 to-indigo-300 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 font-semibold">Cargando productos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient Background Blobs */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-[-1]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-1/3 w-96 h-96 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glass Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'glass shadow-lg py-3 mx-4 mt-2 rounded-2xl' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <img 
                src="https://i.ibb.co/Pvntrx96/logo-1.png" 
                alt="Full Bebidas" 
                className="h-12 md:h-16 w-auto object-contain drop-shadow-md hover:scale-105 transition-transform"
              />
          </div>
          
          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl glass hover:bg-white transition-all duration-300 group"
          >
            <ShoppingCartIcon className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-[9px] font-bold h-4 w-4 flex items-center justify-center rounded-full shadow-md border border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-12 px-6 max-w-7xl mx-auto relative">
        <div className="max-w-3xl relative z-10">
          <span className="inline-block py-1 px-3 rounded-full glass border border-blue-200 text-brand-primary text-[10px] font-bold tracking-wider uppercase mb-5 shadow-sm">
           Bebidas Premium 🍷
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-brand-dark tracking-tight leading-[1.1] mb-6 drop-shadow-sm">
            Calidad que se <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-blue-600 to-purple-600">
              siente y se bebe.
            </span>
          </h1>
          
          {/* Glass Search Bar */}
          <div className="relative max-w-xl group animate-float">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-5 py-4 rounded-2xl glass text-base text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-primary/50 focus:outline-none transition-all shadow-xl hover:shadow-2xl hover:bg-white/80"
              placeholder="Busca tu bebida favorita..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 pb-24">
        {/* Glass Tabs */}
        <div className="flex overflow-x-auto gap-2 py-4 mb-10 no-scrollbar items-center -mx-6 px-6 md:mx-0 md:px-0">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 backdrop-blur-md ${
                selectedCategory === cat 
                  ? 'bg-brand-primary text-white shadow-lg shadow-blue-900/20 scale-105' 
                  : 'bg-white/40 text-slate-600 hover:bg-white/70 border border-white/40'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isBrowseMode ? (
          <>
            {/* MOBILE: Categorized Horizontal Carousels */}
            <div className="flex flex-col gap-8 md:hidden">
              {uniqueCategories.map(category => {
                const catProducts = products.filter(p => p.category === category);
                if (catProducts.length === 0) return null;
                return (
                  <div key={category} className="animate-fade-in">
                    <div className="flex items-center justify-between mb-2 px-1">
                      <h2 className="text-base font-bold text-brand-primary tracking-tight">{category}</h2>
                      <button 
                        onClick={() => setSelectedCategory(category)}
                        className="text-[10px] font-semibold text-slate-500 hover:text-brand-primary transition-colors"
                      >
                        Ver todos
                      </button>
                    </div>
                    {/* Carousel Container */}
                    <HorizontalScroll className="flex overflow-x-auto gap-3 pb-4 -mx-6 px-6 snap-x snap-mandatory no-scrollbar pt-2">
                      {catProducts.map(product => (
                        <div key={product.id} className="min-w-[160px] w-[45vw] max-w-[200px] snap-center">
                          <ProductCard product={product} onAddToCart={addToCart} />
                        </div>
                      ))}
                    </HorizontalScroll>
                  </div>
                );
              })}
            </div>

            {/* DESKTOP: High Density Grid */}
            <div className="hidden md:grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
          </>
        ) : (
          /* SEARCH / FILTER MODE: Standard Grid (Both Mobile & Desktop) */
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))
            ) : (
              <div className="col-span-full py-20 text-center">
                <div className="glass inline-block p-10 rounded-3xl">
                  <p className="text-xl text-brand-dark font-bold">Sin resultados 🍸</p>
                  <button 
                    onClick={() => {setSearchTerm(''); setSelectedCategory('Todos');}}
                    className="mt-4 text-brand-primary underline"
                  >
                    Ver todo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />
      
      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/543482232529"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 group flex items-center justify-center w-14 h-14 bg-[#25D366] rounded-full shadow-2xl hover:scale-110 hover:-translate-y-1 transition-all duration-300 ring-2 ring-white/50 ring-offset-2 ring-offset-[#25D366]/30"
        aria-label="Contactar por WhatsApp"
      >
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-slate-700 text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-sm pointer-events-none">
          ¿Tienes dudas?
        </span>
        <WhatsAppIcon className="w-8 h-8 text-white" />
      </a>

      {/* Admin Link (hidden, for development) */}
      <a
        href="/admin"
        className="fixed bottom-6 left-6 z-40 flex items-center justify-center w-10 h-10 bg-slate-500/20 border border-slate-500/50 rounded-full hover:bg-slate-500/30 transition-all opacity-0 pointer-events-none"
        aria-label="Admin"
      >
        <span className="text-xs text-slate-400">⚙️</span>
      </a>
    </div>
  );
};

export default App;
