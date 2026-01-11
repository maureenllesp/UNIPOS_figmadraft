import React, { useState } from 'react';
import { Search, AlertTriangle, TrendingUp, TrendingDown, Edit, Package } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock inventory data
const inventoryItems = [
  { id: '1', name: 'Coffee Beans Premium', category: 'Beverages', stock: 24, threshold: 20, lastRestocked: '2025-12-15', trend: 'down', supplier: 'Bean Supply Co.' },
  { id: '2', name: 'Organic Whole Milk', category: 'Dairy', stock: 45, threshold: 30, lastRestocked: '2025-12-17', trend: 'up', supplier: 'Fresh Farms' },
  { id: '3', name: 'Whole Wheat Bread', category: 'Bakery', stock: 30, threshold: 25, lastRestocked: '2025-12-18', trend: 'stable', supplier: 'Bakery Plus' },
  { id: '4', name: 'Greek Yogurt', category: 'Dairy', stock: 18, threshold: 25, lastRestocked: '2025-12-16', trend: 'down', supplier: 'Fresh Farms' },
  { id: '5', name: 'Almond Milk', category: 'Dairy', stock: 12, threshold: 15, lastRestocked: '2025-12-14', trend: 'down', supplier: 'Nut Milk Co.' },
  { id: '6', name: 'Protein Bars', category: 'Snacks', stock: 8, threshold: 25, lastRestocked: '2025-12-12', trend: 'down', supplier: 'Health Foods Inc.' },
];

const stockTrends = [
  { week: 'Week 1', inStock: 245, lowStock: 5 },
  { week: 'Week 2', inStock: 238, lowStock: 8 },
  { week: 'Week 3', inStock: 242, lowStock: 6 },
  { week: 'Week 4', inStock: 235, lowStock: 13 },
];

export default function Inventory() {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<'all' | 'low-stock' | 'critical'>('all');

  const isAdmin = user?.role === 'admin';
  const isOwner = user?.role === 'owner';

  const filteredItems = inventoryItems
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                          item.category.toLowerCase().includes(search.toLowerCase());
      if (!matchesSearch) return false;

      if (filter === 'low-stock') return item.stock < item.threshold;
      if (filter === 'critical') return item.stock < item.threshold * 0.5;
      return true;
    });

  const getStockStatus = (stock: number, threshold: number) => {
    const percentage = (stock / threshold) * 100;
    if (percentage >= 100) return { label: 'In Stock', color: 'bg-green-500', textColor: 'text-green-600' };
    if (percentage >= 50) return { label: 'Low Stock', color: 'bg-orange-500', textColor: 'text-orange-600' };
    return { label: 'Critical', color: 'bg-red-500', textColor: 'text-red-600' };
  };

  const lowStockCount = inventoryItems.filter(item => item.stock < item.threshold).length;
  const criticalCount = inventoryItems.filter(item => item.stock < item.threshold * 0.5).length;
  const totalStock = inventoryItems.reduce((sum, item) => sum + item.stock, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl m-0">Inventory Management</h1>
          <p className="text-muted-foreground m-0">
            {isOwner ? 'View-only access' : 'Manage stock levels and inventory'}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Items</p>
              <h3 className="text-2xl mt-2 mb-0">{inventoryItems.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Stock</p>
              <h3 className="text-2xl mt-2 mb-0">{totalStock}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Low Stock</p>
              <h3 className="text-2xl mt-2 mb-0">{lowStockCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Critical</p>
              <h3 className="text-2xl mt-2 mb-0">{criticalCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Inventory Trends Chart */}
      <Card className="glass-card p-6 rounded-2xl border-none mb-6">
        <h3 className="mb-4">Stock Level Trends</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={stockTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="week" stroke="#666" />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Line type="monotone" dataKey="inStock" stroke="#5b8db8" strokeWidth={2} name="In Stock" />
            <Line type="monotone" dataKey="lowStock" stroke="#f97316" strokeWidth={2} name="Low Stock" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Search and Filters */}
      <div className="flex gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search inventory..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-input rounded-xl h-12"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl' : 'rounded-xl'}
          >
            All
          </Button>
          <Button
            variant={filter === 'low-stock' ? 'default' : 'outline'}
            onClick={() => setFilter('low-stock')}
            className={filter === 'low-stock' ? 'bg-orange-500 hover:bg-orange-600 rounded-xl' : 'rounded-xl'}
          >
            Low Stock
          </Button>
          <Button
            variant={filter === 'critical' ? 'default' : 'outline'}
            onClick={() => setFilter('critical')}
            className={filter === 'critical' ? 'bg-red-500 hover:bg-red-600 rounded-xl' : 'rounded-xl'}
          >
            Critical
          </Button>
        </div>
      </div>

      {/* Inventory Table */}
      <Card className="glass-card rounded-2xl border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left p-4">Product</th>
                <th className="text-left p-4">Category</th>
                <th className="text-left p-4">Stock Level</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Trend</th>
                <th className="text-left p-4">Last Restocked</th>
                <th className="text-left p-4">Supplier</th>
                {isAdmin && <th className="text-left p-4">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => {
                const status = getStockStatus(item.stock, item.threshold);
                return (
                  <tr key={item.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                    <td className="p-4">{item.name}</td>
                    <td className="p-4">
                      <Badge variant="secondary">{item.category}</Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <span>{item.stock} units</span>
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`${status.color} h-2 rounded-full`}
                            style={{ width: `${Math.min((item.stock / item.threshold) * 100, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge className={status.textColor + ' bg-transparent border border-current'}>
                        {status.label}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {item.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                      {item.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                      {item.trend === 'stable' && <span className="text-gray-400">—</span>}
                    </td>
                    <td className="p-4 text-sm text-muted-foreground">
                      {new Date(item.lastRestocked).toLocaleDateString()}
                    </td>
                    <td className="p-4 text-sm">{item.supplier}</td>
                    {isAdmin && (
                      <td className="p-4">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg gap-2"
                        >
                          <Edit className="w-4 h-4" />
                          Update
                        </Button>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
