
import React, { useState } from 'react';
import { useStore } from '../store';

const Clients: React.FC = () => {
  const { data } = useStore();
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = data.clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.document.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined">search</span>
          </div>
          <input 
            type="text"
            placeholder="Buscar por nome ou documento..."
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl border-none bg-white dark:bg-slate-900 shadow-sm focus:ring-2 focus:ring-primary transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="w-full sm:w-auto bg-primary text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">person_add</span>
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(client => (
          <div key={client.id} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-slate-800 hover:border-primary/30 transition-all group">
            <div className="flex items-start gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl relative group-hover:scale-105 transition-transform">
                {client.name.charAt(0)}
                <div className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full bg-emerald-500 border-4 border-white dark:border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{client.name}</h4>
                <p className="text-xs font-bold text-primary uppercase tracking-widest mt-0.5">
                  {client.type === 'PF' ? 'Pessoa Física' : 'Pessoa Jurídica'}
                </p>
              </div>
              <button className="text-slate-300 hover:text-slate-600 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <span className="material-symbols-outlined text-[18px]">badge</span>
                <span className="font-medium truncate">{client.document}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <span className="material-symbols-outlined text-[18px]">smartphone</span>
                <span className="font-medium truncate">{client.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl">
                <span className="material-symbols-outlined text-[18px]">mail</span>
                <span className="font-medium truncate">{client.email}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-primary hover:text-white transition-all">
                WHATSAPP
              </button>
              <button className="flex-1 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold hover:bg-primary hover:text-white transition-all">
                HISTÓRICO
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
