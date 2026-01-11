import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Layout from './components/Layout';

// Page imports (will be created)
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Transactions from './pages/Transactions';
import Inventory from './pages/Inventory';
import Reports from './pages/Reports';
import Sales from './pages/Sales';
import Refunds from './pages/Refunds';
import AIInsights from './pages/AIInsights';
import Settings from './pages/Settings';
import UserManagement from './pages/UserManagement';

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  if (!isAuthenticated) {
    return <Login />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <Products />;
      case 'transactions':
        return <Transactions />;
      case 'inventory':
        return <Inventory />;
      case 'reports':
        return <Reports />;
      case 'sales':
        return <Sales />;
      case 'refunds':
        return <Refunds />;
      case 'ai-insights':
        return <AIInsights />;
      case 'settings':
        return <Settings />;
      case 'user-management':
        return <UserManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
