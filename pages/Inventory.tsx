
import React, { useState } from 'react';
import { useStore } from '../store';
import { Product, View } from '../types';

const Inventory: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { data } = useStore();
  const [filter, setFilter] = useState<'Todos' | 'Baixo Estoque'>('Todos');

  const filtered = data.products.filter(p => {
    if (filter === 'Baixo Estoque') return p.stock <= p.minStock;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2">
          {['Todos', 'Baixo Estoque'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-4 py-2 rounded-full text-sm font-bold transition-all
                ${filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 border border-gray-100 dark:border-slate-800'}
              `}
            >
              {f}
              {f === 'Baixo Estoque' && (
                <span className="ml-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {data.products.filter(p => p.stock <= p.minStock).length}
                </span>
              )}
            </button>
          ))}
        </div>
        <button 
          onClick={() => alert('Abrir modal Novo Produto')}
          className="flex items-center gap-2 bg-primary text-white font-bold px-6 py-3 rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined">add</span>
          Novo Produto
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div 
            key={product.id}
            className={`
              relative flex flex-col gap-4 bg-white dark:bg-slate-900 p-4 rounded-3xl shadow-sm border-l-4 transition-all hover:shadow-md
              ${product.stock <= product.minStock ? 'border-l-red-500' : 'border-l-primary'}
            `}
          >
            <div className="flex gap-4">
              <div className="h-20 w-20 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-300 text-4xl">smartphone</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{product.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{product.category}</p>
                  </div>
                  <button className="text-slate-400 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <span className={`
                    px-2 py-0.5 rounded-lg text-xs font-bold
                    ${product.stock <= product.minStock 
                      ? 'bg-red-50 text-red-600 dark:bg-red-900/20' 
                      : 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20'}
                  `}>
                    {product.stock} un.
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">MIN: {product.minStock}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 dark:bg-slate-800" />

            <div className="flex justify-between items-end">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Custo</p>
                <p className="font-medium text-slate-500">R$ {product.cost}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">Venda</p>
                <p className="text-xl font-black text-primary tracking-tight">R$ {product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;
