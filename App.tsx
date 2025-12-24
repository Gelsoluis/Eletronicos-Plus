
import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import POS from './pages/POS';
import Inventory from './pages/Inventory';
import Clients from './pages/Clients';
import ServiceOrders from './pages/ServiceOrders';
import { View } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);

  const renderContent = () => {
    switch (currentView) {
      case View.DASHBOARD:
        return <Dashboard setView={setCurrentView} />;
      case View.PDV:
        return <POS setView={setCurrentView} />;
      case View.ESTOQUE:
        return <Inventory setView={setCurrentView} />;
      case View.CLIENTES:
        return <Clients />;
      case View.OS:
        return <ServiceOrders />;
      default:
        return (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <span className="material-symbols-outlined text-6xl mb-4">construction</span>
            <p className="text-xl font-bold">Módulo em desenvolvimento</p>
            <p className="text-sm mt-2">Estamos trabalhando duro para trazer esta funcionalidade para você.</p>
            <button 
              onClick={() => setCurrentView(View.DASHBOARD)}
              className="mt-6 bg-primary text-white font-bold px-6 py-3 rounded-xl"
            >
              Voltar ao Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
