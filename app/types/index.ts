export type UserRole = 'cashier' | 'admin' | 'owner';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  active: boolean;
  createdAt: Date;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  image?: string;
  description?: string;
  sku?: string;
  lowStockThreshold?: number;
}

export interface Transaction {
  id: string;
  date: Date;
  cashier: string;
  paymentMethod: 'cash' | 'card' | 'gcash' | 'paymaya';
  total: number;
  status: 'completed' | 'pending' | 'refunded';
  items: TransactionItem[];
}

export interface TransactionItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface InventoryItem extends Product {
  lastRestocked?: Date;
  supplier?: string;
}

export interface SalesData {
  date: string;
  revenue: number;
  transactions: number;
}

export interface AIInsight {
  type: 'prediction' | 'recommendation' | 'alert';
  title: string;
  description: string;
  confidence?: number;
  timestamp: Date;
}
