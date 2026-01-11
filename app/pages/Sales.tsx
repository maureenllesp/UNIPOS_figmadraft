import React, { useState } from 'react';
import { Calendar, Download, TrendingUp, DollarSign } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock sales data
const dailySales = [
  { date: 'Dec 12', revenue: 4200, profit: 1260, transactions: 45 },
  { date: 'Dec 13', revenue: 3800, profit: 1140, transactions: 38 },
  { date: 'Dec 14', revenue: 5100, profit: 1530, transactions: 52 },
  { date: 'Dec 15', revenue: 4600, profit: 1380, transactions: 48 },
  { date: 'Dec 16', revenue: 5400, profit: 1620, transactions: 55 },
  { date: 'Dec 17', revenue: 6200, profit: 1860, transactions: 63 },
  { date: 'Dec 18', revenue: 7100, profit: 2130, transactions: 71 },
];

const weeklySales = [
  { week: 'Week 1', revenue: 28500, profit: 8550 },
  { week: 'Week 2', revenue: 31200, profit: 9360 },
  { week: 'Week 3', revenue: 29800, profit: 8940 },
  { week: 'Week 4', revenue: 33400, profit: 10020 },
];

const monthlySales = [
  { month: 'Sep', revenue: 98000, profit: 29400 },
  { month: 'Oct', revenue: 105000, profit: 31500 },
  { month: 'Nov', revenue: 112000, profit: 33600 },
  { month: 'Dec', revenue: 122900, profit: 36870 },
];

const categoryBreakdown = [
  { category: 'Beverages', value: 35, amount: 42980 },
  { category: 'Dairy', value: 28, amount: 34384 },
  { category: 'Bakery', value: 22, amount: 27038 },
  { category: 'Snacks', value: 15, amount: 18435 },
];

const COLORS = ['#5b8db8', '#7ba5c9', '#4a7194', '#adb5bd'];

const paymentMethods = [
  { method: 'Cash', count: 145, percentage: 41 },
  { method: 'Card', count: 98, percentage: 28 },
  { method: 'GCash', count: 76, percentage: 21 },
  { method: 'PayMaya', count: 35, percentage: 10 },
];

export default function Sales() {
  const [period, setPeriod] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const getCurrentData = () => {
    switch (period) {
      case 'daily':
        return dailySales;
      case 'weekly':
        return weeklySales;
      case 'monthly':
        return monthlySales;
    }
  };

  const totalRevenue = getCurrentData().reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = getCurrentData().reduce((sum, item) => sum + item.profit, 0);
  const avgTransaction = period === 'daily' 
    ? dailySales.reduce((sum, item) => sum + item.revenue / item.transactions, 0) / dailySales.length
    : 0;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl m-0">Sales Analytics</h1>
        <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2">
          <Download className="w-5 h-5" />
          Export Report
        </Button>
      </div>

      {/* Period Selector */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={period === 'daily' ? 'default' : 'outline'}
          onClick={() => setPeriod('daily')}
          className={period === 'daily' ? 'bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl' : 'rounded-xl'}
        >
          Daily
        </Button>
        <Button
          variant={period === 'weekly' ? 'default' : 'outline'}
          onClick={() => setPeriod('weekly')}
          className={period === 'weekly' ? 'bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl' : 'rounded-xl'}
        >
          Weekly
        </Button>
        <Button
          variant={period === 'monthly' ? 'default' : 'outline'}
          onClick={() => setPeriod('monthly')}
          className={period === 'monthly' ? 'bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl' : 'rounded-xl'}
        >
          Monthly
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Revenue</p>
              <h3 className="text-2xl mt-2 mb-0">₱{totalRevenue.toLocaleString()}</h3>
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
              <p className="text-sm text-muted-foreground m-0">Total Profit</p>
              <h3 className="text-2xl mt-2 mb-0">₱{totalProfit.toLocaleString()}</h3>
              <p className="text-sm text-muted-foreground mt-2 m-0">
                {((totalProfit / totalRevenue) * 100).toFixed(1)}% margin
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {period === 'daily' && (
          <>
            <Card className="glass-card p-6 rounded-2xl border-none">
              <div>
                <p className="text-sm text-muted-foreground m-0">Avg Transaction</p>
                <h3 className="text-2xl mt-2 mb-0">₱{avgTransaction.toFixed(2)}</h3>
                <p className="text-sm text-muted-foreground mt-2 m-0">Per sale</p>
              </div>
            </Card>

            <Card className="glass-card p-6 rounded-2xl border-none">
              <div>
                <p className="text-sm text-muted-foreground m-0">Transactions</p>
                <h3 className="text-2xl mt-2 mb-0">
                  {dailySales.reduce((sum, item) => sum + item.transactions, 0)}
                </h3>
                <p className="text-sm text-muted-foreground mt-2 m-0">Total count</p>
              </div>
            </Card>
          </>
        )}
      </div>

      {/* Revenue & Profit Chart */}
      <Card className="glass-card p-6 rounded-2xl border-none mb-6">
        <h3 className="mb-4">Revenue & Profit Overview</h3>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={getCurrentData()}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5b8db8" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#5b8db8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7ba5c9" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#7ba5c9" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey={period === 'daily' ? 'date' : period === 'weekly' ? 'week' : 'month'} 
              stroke="#666" 
            />
            <YAxis stroke="#666" />
            <Tooltip 
              contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.95)', 
                border: '1px solid #e0e0e0',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#5b8db8" 
              strokeWidth={2}
              fill="url(#colorRevenue)" 
              name="Revenue"
            />
            <Area 
              type="monotone" 
              dataKey="profit" 
              stroke="#7ba5c9" 
              strokeWidth={2}
              fill="url(#colorProfit)" 
              name="Profit"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <h3 className="mb-4">Sales by Category</h3>
          <div className="flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryBreakdown}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, value }) => `${category}: ${value}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    background: 'rgba(255, 255, 255, 0.95)', 
                    border: '1px solid #e0e0e0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {categoryBreakdown.map((cat, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: COLORS[index] }}
                ></div>
                <div>
                  <p className="text-sm m-0">{cat.category}</p>
                  <p className="text-xs text-muted-foreground m-0">₱{cat.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Payment Methods */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <h3 className="mb-4">Payment Methods</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={paymentMethods}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="method" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(255, 255, 255, 0.95)', 
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="count" fill="#5b8db8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-3">
            {paymentMethods.map((method, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{method.method}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-[#5b8db8] h-2 rounded-full"
                      style={{ width: `${method.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {method.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
