import React, { useState, useEffect } from 'react';
import { Product, WholesalePrice } from '../types';
import { getProducts, updateProduct, initializeProducts } from '../firebase/products';
import { products as initialProducts } from '../data';
import { TrashIcon, PlusIcon, SaveIcon, RefreshIcon } from './Icons';

interface AdminPanelProps {
  onLogout: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<Product>>({});
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (forceReinit = false) => {
    setLoading(true);
    const dbProducts = await getProducts();
    if (dbProducts.length > 0 && !forceReinit) {
      setProducts(dbProducts);
    } else {
      // Initialize with data.ts products
      await initializeProducts(initialProducts);
      const freshProducts = await getProducts();
      setProducts(freshProducts.length > 0 ? freshProducts : initialProducts);
    }
    setLoading(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setEditForm({ ...product });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async (productId: number) => {
    setSaving(true);
    const success = await updateProduct(productId, editForm);
    if (success) {
      setProducts(products.map(p => p.id === productId ? { ...p, ...editForm } : p));
      setMessage({ type: 'success', text: 'Producto actualizado correctamente' });
      setTimeout(() => setMessage(null), 3000);
    } else {
      setMessage({ type: 'error', text: 'Error al guardar. Intenta de nuevo.' });
    }
    setSaving(false);
    setEditingId(null);
  };

  const handleInputChange = (field: keyof Product, value: any) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const handleWholesaleChange = (index: number, field: keyof WholesalePrice, value: number) => {
    const newWholesale = [...(editForm.wholesalePrices || [])];
    newWholesale[index] = { ...newWholesale[index], [field]: value };
    setEditForm(prev => ({ ...prev, wholesalePrices: newWholesale }));
  };

  const addWholesalePrice = () => {
    const newWholesale = [...(editForm.wholesalePrices || []), { qty: 6, price: 0 }];
    setEditForm(prev => ({ ...prev, wholesalePrices: newWholesale }));
  };

  const removeWholesalePrice = (index: number) => {
    const newWholesale = [...(editForm.wholesalePrices || [])];
    newWholesale.splice(index, 1);
    setEditForm(prev => ({ ...prev, wholesalePrices: newWholesale }));
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Helper para que el input no muestre 0 cuando está vacío
  const getNumValue = (val: number | undefined): string => {
    if (val === undefined || val === 0) return '';
    return String(val);
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(filter.toLowerCase()) ||
    p.category.toLowerCase().includes(filter.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Cargando productos...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="glass bg-white/5 border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-white">Admin Panel - Full Bebidas</h1>
            <button
              onClick={() => loadProducts()}
              className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
              title="Recargar productos"
            >
              <RefreshIcon className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={() => {
                if (confirm('¿Reiniciar productos desde data.ts? Esto actualizará todos los productos.')) {
                  loadProducts(true);
                }
              }}
              className="px-3 py-1.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-200 rounded-lg text-xs hover:bg-yellow-500/30 transition-colors"
            >
              Reiniciar desde código
            </button>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors text-sm font-medium"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>

      {/* Message */}
      {message && (
        <div className={`fixed top-20 right-4 px-6 py-3 rounded-xl shadow-lg z-50 ${
          message.type === 'success' 
            ? 'bg-green-500/20 border border-green-500/50 text-green-200' 
            : 'bg-red-500/20 border border-red-500/50 text-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Search */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Buscar productos..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 pb-12">
        <div className="grid gap-4">
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              className={`glass bg-white/5 border border-white/10 rounded-2xl overflow-hidden transition-all ${
                editingId === product.id ? 'ring-2 ring-purple-500/50' : ''
              }`}
            >
              {editingId === product.id ? (
                // Edit Mode
                <div className="p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-32 h-32 shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </div>

                    {/* Form */}
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white/60 text-xs mb-1">Nombre</label>
                          <input
                            type="text"
                            value={editForm.name || ''}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-1">Categoría</label>
                          <select
                            value={editForm.category || ''}
                            onChange={(e) => handleInputChange('category', e.target.value)}
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                          >
                            <option className="text-black" value="Cervezas">Cervezas</option>
                            <option className="text-black" value="Aperitivos">Aperitivos</option>
                            <option className="text-black" value="Vodkas">Vodkas</option>
                            <option className="text-black" value="Vinos">Vinos</option>
                            <option className="text-black" value="Combos">Combos</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-white/60 text-xs mb-1">Precio Minorista</label>
                          <input
                            type="number"
                            value={getNumValue(editForm.price)}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleInputChange('price', val === '' ? 0 : Number(val));
                            }}
                            placeholder="Precio"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30"
                          />
                        </div>
                        <div>
                          <label className="block text-white/60 text-xs mb-1">Stock</label>
                          <input
                            type="number"
                            value={getNumValue(editForm.stock)}
                            onChange={(e) => {
                              const val = e.target.value;
                              handleInputChange('stock', val === '' ? 0 : Number(val));
                            }}
                            placeholder="Stock"
                            className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/30"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white/60 text-xs mb-1">Descripción</label>
                        <textarea
                          value={editForm.description || ''}
                          onChange={(e) => handleInputChange('description', e.target.value)}
                          rows={2}
                          className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white resize-none"
                        />
                      </div>

                      {/* Wholesale Prices */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-white/60 text-xs">Precios Mayoristas</label>
                          <button
                            onClick={addWholesalePrice}
                            className="flex items-center gap-1 px-2 py-1 bg-green-500/20 border border-green-500/50 text-green-200 rounded-lg text-xs hover:bg-green-500/30 transition-colors"
                          >
                            <PlusIcon className="w-3 h-3" />
                            Agregar
                          </button>
                        </div>
                        <div className="space-y-2">
                          {(editForm.wholesalePrices || []).map((wp, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <input
                                type="number"
                                value={getNumValue(wp.qty)}
                                onChange={(e) => handleWholesaleChange(index, 'qty', e.target.value === '' ? 0 : Number(e.target.value))}
                                placeholder="Cantidad"
                                className="w-24 px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/30"
                              />
                              <span className="text-white/40">x</span>
                              <input
                                type="number"
                                value={getNumValue(wp.price)}
                                onChange={(e) => handleWholesaleChange(index, 'price', e.target.value === '' ? 0 : Number(e.target.value))}
                                placeholder="Precio total"
                                className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm placeholder:text-white/30"
                              />
                              <button
                                onClick={() => removeWholesalePrice(index)}
                                className="p-1 bg-red-500/20 border border-red-500/50 text-red-200 rounded-lg hover:bg-red-500/30 transition-colors"
                              >
                                <TrashIcon className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleSave(product.id)}
                          disabled={saving}
                          className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/50 text-green-200 rounded-lg hover:bg-green-500/30 transition-colors disabled:opacity-50"
                        >
                          <SaveIcon className="w-4 h-4" />
                          {saving ? 'Guardando...' : 'Guardar'}
                        </button>
                        <button
                          onClick={handleCancel}
                          className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-lg hover:bg-white/20 transition-colors"
                        >
                          Cancelar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                // View Mode
                <div className="p-4 flex items-center gap-4">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-16 h-16 object-contain mix-blend-multiply rounded-xl bg-white/10"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/50 text-purple-200 rounded text-xs">
                        {product.category}
                      </span>
                      {product.stock !== undefined && product.stock <= 12 && (
                        <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/50 text-red-200 rounded text-xs">
                          Stock: {product.stock}
                        </span>
                      )}
                    </div>
                    <h3 className="text-white font-semibold truncate">{product.name}</h3>
                    <p className="text-white/60 text-sm truncate">{product.description}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-green-400 font-bold">{product.price > 0 ? formatPrice(product.price) : 'Sin precio'}</span>
                      {product.wholesalePrices && product.wholesalePrices.length > 0 ? (
                        <span className="text-white/40 text-xs">
                          {product.wholesalePrices.length} precio(s) mayorista(s)
                        </span>
                      ) : (
                        <span className="text-white/20 text-xs italic">Sin precios mayoristas</span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-4 py-2 bg-blue-500/20 border border-blue-500/50 text-blue-200 rounded-lg hover:bg-blue-500/30 transition-colors text-sm font-medium"
                  >
                    Editar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/40">No se encontraron productos</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
