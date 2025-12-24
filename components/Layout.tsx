
import React, { useState } from 'react';
import { View } from '../types';

interface LayoutProps {
  currentView: View;
  setView: (view: View) => void;
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ currentView, setView, children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const newVal = !isDarkMode;
    setIsDarkMode(newVal);
    if (newVal) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  };

  const navItems = [
    { id: View.DASHBOARD, label: 'Dashboard', icon: 'dashboard' },
    { id: View.PDV, label: 'PDV', icon: 'point_of_sale' },
    { id: View.ESTOQUE, label: 'Estoque', icon: 'inventory_2' },
    { id: View.CLIENTES, label: 'Clientes', icon: 'group' },
    { id: View.OS, label: 'Ordens de Serviço', icon: 'receipt_long' },
    { id: View.RELATORIOS, label: 'Relatórios', icon: 'bar_chart' },
    { id: View.CONFIGURACOES, label: 'Ajustes', icon: 'settings' },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background-light dark:bg-background-dark">
      {/* Mobile Sidebar Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 transform bg-slate-900 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex h-20 items-center border-b border-white/5 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-blue-500 text-white">
              <span className="material-symbols-outlined text-lg filled">bolt</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight leading-none">Eletrônico</h1>
              <span className="text-xs font-medium text-primary">Plus</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3 overflow-y-auto">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => { setView(item.id); setIsSidebarOpen(false); }}
              className={`
                flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all
                ${currentView === item.id 
                  ? 'bg-slate-800 text-primary border-l-4 border-primary' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
              `}
            >
              <span className={`material-symbols-outlined ${currentView === item.id ? 'filled' : ''}`}>
                {item.icon}
              </span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-white/5 p-4 space-y-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs font-medium text-slate-500">MODO ESCURO</span>
            <button onClick={toggleDarkMode} className="relative inline-flex h-5 w-10 items-center rounded-full bg-slate-700 transition-colors">
              <div className={`h-4 w-4 rounded-full bg-white transition-transform duration-200 ${isDarkMode ? 'translate-x-5' : 'translate-x-1'}`} />
            </button>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-slate-800/50 p-3">
            <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">RA</div>
            <div className="flex flex-col">
              <span className="text-sm font-bold">Ricardo A.</span>
              <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Gerente</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-slate-900/80 px-4 backdrop-blur-md lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 text-slate-500 lg:hidden"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {navItems.find(n => n.id === currentView)?.label || 'Eletrônico Plus'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button className="relative p-2 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white dark:ring-slate-900" />
            </button>
            <div className="hidden h-6 w-px bg-gray-200 dark:bg-gray-700 sm:block" />
            <div className="hidden items-center gap-2 sm:flex">
               <span className="text-xs font-bold text-slate-400">STATUS:</span>
               <span className="flex items-center gap-1.5 text-xs font-bold text-primary">
                 <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                 ONLINE
               </span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950 p-4 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
