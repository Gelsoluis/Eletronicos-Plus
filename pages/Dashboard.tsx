
import React from 'react';
import { View } from '../types';
import { useStore } from '../store';

const Dashboard: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  const { data } = useStore();

  const stats = [
    { label: 'Vendas Hoje', value: `R$ ${data.sales.length * 2450 || '2.450'}`, icon: 'point_of_sale', color: 'bg-blue-500', trend: '+12%' },
    { label: 'OS Abertas', value: data.serviceOrders.filter(os => os.status !== 'Concluída').length, icon: 'build', color: 'bg-orange-500', trend: 'Atenção' },
    { label: 'Total Itens', value: data.products.reduce((acc, p) => acc + p.stock, 0), icon: 'inventory_2', color: 'bg-emerald-500', trend: 'Estoque' },
    { label: 'Novos Clientes', value: '28', icon: 'person_add', color: 'bg-purple-500', trend: '+5%' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-2xl font-bold tracking-tight">Olá, Ricardo 👋</h2>
        <p className="text-slate-500 dark:text-slate-400">Aqui está o resumo da sua loja hoje.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map(stat => (
          <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg shadow-${stat.color.split('-')[1]}-500/20`}>
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
                {stat.trend}
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">{stat.label}</p>
            <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Chart Mock */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg">Faturamento Semanal</h3>
            <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-sm font-medium">
              <option>Últimos 7 dias</option>
              <option>Este Mês</option>
            </select>
          </div>
          <div className="h-64 w-full flex items-end justify-between gap-3 pt-4">
            {[40, 65, 50, 85, 60, 75, 55].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="relative w-full bg-primary/10 rounded-t-lg transition-all group-hover:bg-primary/20" style={{ height: `${h}%` }}>
                  {i === 3 && <div className="absolute inset-0 bg-primary rounded-t-lg shadow-lg shadow-primary/20" />}
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{['S', 'T', 'Q', 'Q', 'S', 'S', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 flex flex-col">
          <h3 className="font-bold text-lg mb-6">Acesso Rápido</h3>
          <div className="grid grid-cols-2 gap-3 flex-1">
            <button 
              onClick={() => setView(View.PDV)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-4 text-blue-600 hover:bg-blue-100 transition-colors group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">add_circle</span>
              <span className="text-xs font-bold uppercase tracking-wider">Nova Venda</span>
            </button>
            <button 
              onClick={() => setView(View.OS)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 p-4 text-emerald-600 hover:bg-emerald-100 transition-colors group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">phonelink_setup</span>
              <span className="text-xs font-bold uppercase tracking-wider">Nova OS</span>
            </button>
            <button 
              onClick={() => setView(View.CLIENTES)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-4 text-purple-600 hover:bg-purple-100 transition-colors group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">person_add</span>
              <span className="text-xs font-bold uppercase tracking-wider">Novo Cliente</span>
            </button>
            <button 
              onClick={() => setView(View.ESTOQUE)}
              className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-orange-50 dark:bg-orange-900/20 p-4 text-orange-600 hover:bg-orange-100 transition-colors group"
            >
              <span className="material-symbols-outlined text-3xl group-hover:scale-110 transition-transform">inventory_2</span>
              <span className="text-xs font-bold uppercase tracking-wider">Estoque</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
