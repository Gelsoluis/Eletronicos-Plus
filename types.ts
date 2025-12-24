
export enum View {
  DASHBOARD = 'DASHBOARD',
  PDV = 'PDV',
  ESTOQUE = 'ESTOQUE',
  CLIENTES = 'CLIENTES',
  OS = 'OS',
  RELATORIOS = 'RELATORIOS',
  CONFIGURACOES = 'CONFIGURACOES',
  BACKUP = 'BACKUP',
  PRODUTO_FORM = 'PRODUTO_FORM',
  CLIENTE_FORM = 'CLIENTE_FORM',
  SERVICO_FORM = 'SERVICO_FORM'
}

export interface Client {
  id: string;
  name: string;
  document: string;
  phone: string;
  email: string;
  address: string;
  type: 'PF' | 'PJ';
  status: 'active' | 'pending';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  cost: number;
  price: number;
  stock: number;
  minStock: number;
  category: string;
  image?: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedTime: string;
}

export interface ServiceOrder {
  id: string;
  clientId: string;
  clientName: string;
  description: string;
  deviceName: string;
  status: 'Aberta' | 'Em Andamento' | 'Concluída' | 'Cancelada';
  date: string;
  value: number;
}

export interface SaleItem {
  productId: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  discount: number;
  paymentMethod: 'Dinheiro' | 'Cartão' | 'Pix';
  date: string;
}

export interface DashboardStats {
  salesToday: number;
  openOS: number;
  totalInventoryValue: number;
  newClients: number;
}
