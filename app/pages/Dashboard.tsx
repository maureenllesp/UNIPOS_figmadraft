import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Package, 
  ShoppingCart, 
  DollarSign,
  AlertTriangle,
  Sparkles,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/card';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data
const salesData = [
  { date: 'Dec 12', sales: 4200, transactions: 45 },
  { date: 'Dec 13', sales: 3800, transactions: 38 },
  { date: 'Dec 14', sales: 5100, transactions: 52 },
  { date: 'Dec 15', sales: 4600, transactions: 48 },
  { date: 'Dec 16', sales: 5400, transactions: 55 },
  { date: 'Dec 17', sales: 6200, transactions: 63 },
  { date: 'Dec 18', sales: 7100, transactions: 71 },
];

const forecastData = [
  { date: 'Dec 19', forecast: 7300, lower: 6800, upper: 7800 },
  { date: 'Dec 20', forecast: 7500, lower: 7000, upper: 8000 },
  { date: 'Dec 21', forecast: 7200, lower: 6700, upper: 7700 },
  { date: 'Dec 22', forecast: 7800, lower: 7300, upper: 8300 },
  { date: 'Dec 23', forecast: 8200, lower: 7700, upper: 8700 },
  { date: 'Dec 24', forecast: 8900, lower: 8400, upper: 9400 },
  { date: 'Dec 25', forecast: 9500, lower: 9000, upper: 10000 },
];

const topProducts = [
  { name: 'Coffee Beans 1kg', sales: 145, revenue: 7250, trend: 'up' },
  { name: 'Organic Milk', sales: 132, revenue: 3960, trend: 'up' },
  { name: 'Whole Wheat Bread', sales: 98, revenue: 2940, trend: 'down' },
  { name: 'Greek Yogurt', sales: 87, revenue: 2610, trend: 'up' },
];

const lowStockItems = [
  { name: 'Coffee Beans 1kg', stock: 8, threshold: 20 },
  { name: 'Almond Milk', stock: 5, threshold: 15 },
  { name: 'Protein Bars', stock: 12, threshold: 25 },
];

const peakHours = [
  { time: '8-9 AM', transactions: 15 },
  { time: '12-1 PM', transactions: 42 },
  { time: '5-6 PM', transactions: 38 },
  { time: '7-8 PM', transactions: 28 },
];

export default function Dashboard() {
  const { user } = useAuth();
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl m-0">Dashboard</h1>
          <p className="text-muted-foreground m-0">{currentDate}</p>
        </div>
        <div className="flex items-center gap-2 glass-card px-4 py-2 rounded-lg">
          <Sparkles className="w-5 h-5 text-[#5b8db8]" />
          <span className="text-sm">AI-Powered Insights</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Today's Sales</p>
              <h3 className="text-2xl mt-2 mb-0">₱7,100</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+12.5%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Transactions</p>
              <h3 className="text-2xl mt-2 mb-0">71</h3>
              <div className="flex items-center gap-1 mt-2 text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">+8.3%</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Products</p>
              <h3 className="text-2xl mt-2 mb-0">248</h3>
              <div className="flex items-center gap-1 mt-2 text-gray-600">
                <span className="text-sm">In stock</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Low Stock Items</p>
              <h3 className="text-2xl mt-2 mb-0">{lowStockItems.length}</h3>
              <div className="flex items-center gap-1 mt-2 text-orange-600">
                <AlertTriangle className="w-4 h-4" />
                <span className="text-sm">Needs attention</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* AI Insights Section */}
      <Card className="glass-card p-6 rounded-2xl border-2 border-[#5b8db8]/30">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#5b8db8]" />
          <h2 className="text-xl m-0">AI-Generated Insights & Predictions</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <h4 className="m-0">Sales Forecast</h4>
            </div>
            <p className="text-sm text-gray-600 m-0">
              Expected 15% increase in sales next week based on historical patterns and seasonal trends.
            </p>
            <p className="text-xs text-gray-500 mt-2 m-0">Confidence: 87%</p>
          </div>
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-5 h-5 text-green-600" />
              <h4 className="m-0">Inventory Alert</h4>
            </div>
            <p className="text-sm text-gray-600 m-0">
              Restock Coffee Beans within 3 days to avoid stockouts during peak demand period.
            </p>
            <p className="text-xs text-gray-500 mt-2 m-0">Confidence: 92%</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-5 h-5 text-purple-600" />
              <h4 className="m-0">Peak Hours</h4>
            </div>
            <p className="text-sm text-gray-600 m-0">
              Lunch time (12-1 PM) shows highest traffic. Consider additional staffing during this period.
            </p>
            <p className="text-xs text-gray-500 mt-2 m-0">Confidence: 94%</p>
          </div>
        </div>
      </Card>

      {/* Charts Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <h3 className="mb-4">Sales Overview (Last 7 Days)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#5b8db8" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#5b8db8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="sales" 
                stroke="#5b8db8" 
                strokeWidth={2}
                fill="url(#colorSales)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        {/* Sales Forecast */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-[#5b8db8]" />
            <h3 className="m-0">7-Day Sales Forecast (AI)</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecastData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="date" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#5b8db8" 
                strokeWidth={2}
                dot={{ fill: '#5b8db8', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="upper" 
                stroke="#7ba5c9" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line 
                type="monotone" 
                dataKey="lower" 
                stroke="#7ba5c9" 
                strokeWidth={1}
                strokeDasharray="5 5"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Top Selling Products */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <h3 className="mb-4">Top Selling Products</h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="m-0">{product.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-muted-foreground">{product.sales} sold</span>
                    {product.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="m-0">₱{product.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="glass-card p-6 rounded-2xl border-none bg-orange-50/50">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <h3 className="m-0">Low Stock Alerts</h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, index) => (
              <div key={index} className="bg-white p-3 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <p className="m-0">{item.name}</p>
                  <span className="text-sm text-orange-600">{item.stock} left</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full"
                    style={{ width: `${(item.stock / item.threshold) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Peak Sales Hours */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <h3 className="mb-4">Peak Sales Hours (Today)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={peakHours}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="transactions" fill="#5b8db8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
