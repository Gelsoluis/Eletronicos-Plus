
import React, { useState } from 'react';
import { useStore } from '../store';
import { ServiceOrder } from '../types';

const ServiceOrders: React.FC = () => {
  const { data } = useStore();
  const [filter, setFilter] = useState<ServiceOrder['status'] | 'Todas'>('Todas');

  const filtered = data.serviceOrders.filter(os => {
    if (filter === 'Todas') return true;
    return os.status === filter;
  });

  const getStatusColor = (status: ServiceOrder['status']) => {
    switch (status) {
      case 'Aberta': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'Em Andamento': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      case 'Concluída': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400';
      case 'Cancelada': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 sm:pb-0 w-full sm:w-auto">
          {['Todas', 'Aberta', 'Em Andamento', 'Concluída'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-4 py-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all
                ${filter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-slate-900 text-slate-500 border border-gray-100 dark:border-slate-800'}
              `}
            >
              {f}
            </button>
          ))}
        </div>
        <button className="w-full sm:w-auto bg-primary text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">add</span>
          Nova OS
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(os => (
          <div key={os.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-primary/20 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-3xl">phonelink_setup</span>
                </div>
                <div>
                  <h4 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{os.clientName}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">#OS-{os.id} • {os.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-bold ${getStatusColor(os.status)}`}>
                {os.status}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">{os.deviceName}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{os.description}</p>
              </div>

              <div className="h-px bg-slate-50 dark:bg-slate-800" />

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Valor</p>
                  <p className="text-lg font-bold text-primary">R$ {os.value.toFixed(2)}</p>
                </div>
                <div className="flex gap-2">
                   <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                     <span className="material-symbols-outlined">chat</span>
                   </button>
                   <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-primary transition-colors">
                     <span className="material-symbols-outlined">edit</span>
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceOrders;
