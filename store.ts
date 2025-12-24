
import { useState, useEffect } from 'react';
import { Client, Product, Service, ServiceOrder, Sale } from './types';

const STORAGE_KEY = 'eletronico_plus_storage';

interface StoreData {
  clients: Client[];
  products: Product[];
  services: Service[];
  serviceOrders: ServiceOrder[];
  sales: Sale[];
}

const initialData: StoreData = {
  clients: [
    { id: '1', name: 'João Silva', document: '123.456.789-00', phone: '(11) 99999-9999', email: 'joao@email.com', address: 'Rua A, 123', type: 'PF', status: 'active' },
    { id: '2', name: 'Maria Tech Ltda', document: '12.345.678/0001-99', phone: '(21) 98888-8888', email: 'contato@mariatech.com', address: 'Av B, 456', type: 'PJ', status: 'active' }
  ],
  products: [
    { id: '1', name: 'iPhone 15 Pro Max', description: 'Titanium Gray, 256GB', cost: 7000, price: 8299, stock: 5, minStock: 2, category: 'Smartphones' },
    { id: '2', name: 'AirPods Pro 2', description: 'Com cancelamento de ruído', cost: 1200, price: 1899, stock: 12, minStock: 5, category: 'Áudio' },
    { id: '3', name: 'Cabo USB-C Original', description: 'Carregamento rápido 1m', cost: 15, price: 80, stock: 2, minStock: 10, category: 'Acessórios' }
  ],
  services: [
    { id: '1', name: 'Troca de Tela iPhone 11', description: 'Peça original com garantia', price: 450, estimatedTime: '1 hora' }
  ],
  serviceOrders: [
    { id: '842', clientId: '1', clientName: 'Maria Souza', description: 'Troca de tela - touch falhando', deviceName: 'iPhone 11', status: 'Concluída', date: '2024-10-20', value: 450 },
    { id: '841', clientId: '2', clientName: 'João Pereira', description: 'Bateria descarregando rápido', deviceName: 'Samsung S20', status: 'Em Andamento', date: '2024-10-19', value: 200 }
  ],
  sales: []
};

export const useStore = () => {
  const [data, setData] = useState<StoreData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialData;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const addClient = (client: Client) => setData(prev => ({ ...prev, clients: [client, ...prev.clients] }));
  const addProduct = (product: Product) => setData(prev => ({ ...prev, products: [product, ...prev.products] }));
  const addService = (service: Service) => setData(prev => ({ ...prev, services: [service, ...prev.services] }));
  const addOS = (os: ServiceOrder) => setData(prev => ({ ...prev, serviceOrders: [os, ...prev.serviceOrders] }));
  const addSale = (sale: Sale) => setData(prev => ({ 
    ...prev, 
    sales: [sale, ...prev.sales],
    products: prev.products.map(p => {
      const soldItem = sale.items.find(si => si.productId === p.id);
      return soldItem ? { ...p, stock: p.stock - soldItem.quantity } : p;
    })
  }));

  const updateProductStock = (id: string, newStock: number) => {
    setData(prev => ({
      ...prev,
      products: prev.products.map(p => p.id === id ? { ...p, stock: newStock } : p)
    }));
  };

  return { data, addClient, addProduct, addService, addOS, addSale, updateProductStock };
};
