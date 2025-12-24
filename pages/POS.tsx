
import React, { useState } from 'react';
import { useStore } from '../store';
import { Product, SaleItem, View } from '../types';

const POS: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { data, addSale } = useStore();
  const [cart, setCart] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'Dinheiro' | 'Cartão' | 'Pix'>('Pix');
  const [discount, setDiscount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = data.products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && p.stock > 0
  );

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.productId === product.id);
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { productId: product.id, name: product.name, quantity: 1, price: product.price }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.productId !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.productId === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        const product = data.products.find(p => p.id === productId);
        if (product && newQty > product.stock) return item; // limit to stock
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = Math.max(0, subtotal - discount);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    addSale({
      id: Math.random().toString(36).substr(2, 9),
      items: cart,
      total,
      discount,
      paymentMethod,
      date: new Date().toISOString()
    });
    setCart([]);
    setDiscount(0);
    alert('Venda finalizada com sucesso!');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
      {/* Product Selection Area */}
      <div className="lg:col-span-2 flex flex-col gap-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-primary">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar produto ou ler código..."
            className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary transition-all text-lg font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto no-scrollbar pr-1">
          {filteredProducts.map(product => (
            <button 
              key={product.id}
              onClick={() => addToCart(product)}
              className="flex flex-col bg-white dark:bg-slate-900 rounded-2xl p-3 border border-gray-100 dark:border-slate-800 hover:border-primary/50 transition-all text-left group"
            >
              <div className="aspect-square w-full rounded-xl bg-slate-50 dark:bg-slate-800 mb-3 flex items-center justify-center overflow-hidden">
                <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 text-4xl group-hover:scale-110 transition-transform">smartphone</span>
              </div>
              <p className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1">{product.name}</p>
              <div className="flex items-center justify-between mt-1">
                <p className="text-primary font-bold">R$ {product.price}</p>
                <span className="text-[10px] font-bold text-slate-400">STOCK: {product.stock}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Area */}
      <div className="flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-0 h-[calc(100vh-12rem)] lg:h-auto">
        <div className="p-6 border-b border-gray-100 dark:border-slate-800">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">shopping_basket</span>
            Carrinho
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-3 opacity-50">
              <span className="material-symbols-outlined text-6xl">shopping_cart</span>
              <p className="text-sm font-medium">Carrinho vazio</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.productId} className="flex gap-3 bg-slate-50 dark:bg-slate-800 p-3 rounded-2xl relative group">
                <div className="flex flex-col flex-1">
                  <p className="text-sm font-bold truncate pr-6">{item.name}</p>
                  <p className="text-xs text-primary font-bold mt-1">R$ {item.price * item.quantity}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => updateQuantity(item.productId, -1)} className="size-7 rounded-lg bg-white dark:bg-slate-700 shadow-sm flex items-center justify-center text-slate-600 dark:text-slate-300">-</button>
                    <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, 1)} className="size-7 rounded-lg bg-primary text-white shadow-sm flex items-center justify-center">+</button>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.productId)}
                  className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">close</span>
                </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="font-bold">R$ {subtotal}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-500 font-medium">Desconto</span>
              <input 
                type="number" 
                className="w-24 text-right bg-transparent border-none p-0 focus:ring-0 text-sm font-bold text-red-500" 
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="R$ 0,00"
              />
            </div>
            <div className="h-px bg-slate-200 dark:bg-slate-700" />
            <div className="flex items-center justify-between">
              <span className="text-base font-bold">Total</span>
              <span className="text-2xl font-black text-primary tracking-tight">R$ {total}</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {(['Pix', 'Dinheiro', 'Cartão'] as const).map(m => (
              <button
                key={m}
                onClick={() => setPaymentMethod(m)}
                className={`
                  py-2 rounded-xl text-[10px] font-bold uppercase transition-all
                  ${paymentMethod === m ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-700 text-slate-400'}
                `}
              >
                {m}
              </button>
            ))}
          </div>

          <button 
            disabled={cart.length === 0}
            onClick={handleCheckout}
            className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:grayscale text-white font-bold py-4 rounded-2xl shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
          >
            <span>Finalizar Venda</span>
            <span className="material-symbols-outlined font-bold">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default POS;
