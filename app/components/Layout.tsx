import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  FileText, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Users, 
  RotateCcw,
  Sparkles,
  TrendingUp,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { UserRole } from '../types';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  roles: UserRole[];
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: <LayoutDashboard className="w-5 h-5" />,
    roles: ['cashier', 'admin', 'owner'],
  },
  {
    id: 'products',
    label: 'Products',
    icon: <Package className="w-5 h-5" />,
    roles: ['cashier', 'admin'],
  },
  {
    id: 'transactions',
    label: 'Transactions',
    icon: <ShoppingCart className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: <Package className="w-5 h-5" />,
    roles: ['admin', 'owner'],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: <FileText className="w-5 h-5" />,
    roles: ['cashier', 'admin', 'owner'],
  },
  {
    id: 'sales',
    label: 'Sales',
    icon: <TrendingUp className="w-5 h-5" />,
    roles: ['owner'],
  },
  {
    id: 'refunds',
    label: 'Refunds',
    icon: <RotateCcw className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    id: 'ai-insights',
    label: 'AI Insights',
    icon: <Sparkles className="w-5 h-5" />,
    roles: ['owner'],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: <Settings className="w-5 h-5" />,
    roles: ['admin', 'owner'],
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: <Users className="w-5 h-5" />,
    roles: ['admin'],
  },
];

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { user, logout } = useAuth();

  if (!user) return null;

  const allowedItems = navigationItems.filter((item) =>
    item.roles.includes(user.role)
  );

  const getRoleName = (role: UserRole) => {
    switch (role) {
      case 'cashier':
        return 'Cashier';
      case 'admin':
        return 'Admin';
      case 'owner':
        return 'Business Owner';
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 sidebar-glass border-r border-white/10 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-[#5b8db8] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                <rect x="4" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="13" y="4" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <rect x="4" y="13" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/>
                <path d="M13 15h7M13 18h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl text-white m-0">UNIPOS</h2>
              <p className="text-xs text-white/70 m-0">Point-of-sale system</p>
            </div>
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 bg-[#7ba5c9]">
              <AvatarFallback className="bg-[#7ba5c9] text-white">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-white truncate m-0">{user.name}</p>
              <p className="text-xs text-white/70 m-0">{getRoleName(user.role)}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {allowedItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                currentPage === item.id
                  ? 'bg-white/20 text-white shadow-lg'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Logout Button */}
        <div className="p-4 border-t border-white/10">
          <Button
            onClick={logout}
            variant="ghost"
            className="w-full justify-start gap-3 text-white/80 hover:bg-white/10 hover:text-white"
          >
            <LogOut className="w-5 h-5" />
            <span>Log Out</span>
          </Button>
          <p className="text-xs text-white/50 text-center mt-4">© 2025 UNIPOS</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
