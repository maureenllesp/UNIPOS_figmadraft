import React, { useState } from 'react';
import { Search, Download, Filter, Eye } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

// Mock transaction data
const mockTransactions = [
  {
    id: 'TXN-001234',
    date: new Date('2025-12-18T09:30:00'),
    cashier: 'Ashley Graham',
    paymentMethod: 'cash' as const,
    total: 450,
    status: 'completed' as const,
    items: 3,
  },
  {
    id: 'TXN-001235',
    date: new Date('2025-12-18T10:15:00'),
    cashier: 'Ashley Graham',
    paymentMethod: 'card' as const,
    total: 1250,
    status: 'completed' as const,
    items: 5,
  },
  {
    id: 'TXN-001236',
    date: new Date('2025-12-18T11:45:00'),
    cashier: 'John Smith',
    paymentMethod: 'gcash' as const,
    total: 780,
    status: 'completed' as const,
    items: 4,
  },
  {
    id: 'TXN-001237',
    date: new Date('2025-12-18T12:20:00'),
    cashier: 'Ashley Graham',
    paymentMethod: 'paymaya' as const,
    total: 320,
    status: 'completed' as const,
    items: 2,
  },
  {
    id: 'TXN-001238',
    date: new Date('2025-12-18T13:10:00'),
    cashier: 'John Smith',
    paymentMethod: 'cash' as const,
    total: 890,
    status: 'pending' as const,
    items: 6,
  },
  {
    id: 'TXN-001239',
    date: new Date('2025-12-18T14:05:00'),
    cashier: 'Ashley Graham',
    paymentMethod: 'card' as const,
    total: 560,
    status: 'refunded' as const,
    items: 3,
  },
];

export default function Transactions() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [paymentFilter, setPaymentFilter] = useState<string>('all');

  const filteredTransactions = mockTransactions.filter((txn) => {
    const matchesSearch =
      txn.id.toLowerCase().includes(search.toLowerCase()) ||
      txn.cashier.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || txn.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Completed</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'refunded':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Refunded</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getPaymentMethodBadge = (method: string) => {
    const colors: Record<string, string> = {
      cash: 'bg-blue-100 text-blue-700',
      card: 'bg-purple-100 text-purple-700',
      gcash: 'bg-indigo-100 text-indigo-700',
      paymaya: 'bg-green-100 text-green-700',
    };
    return (
      <Badge variant="secondary" className={colors[method]}>
        {method.toUpperCase()}
      </Badge>
    );
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl m-0">Transactions</h1>
        <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2">
          <Download className="w-5 h-5" />
          Export to CSV
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="glass-card p-4 rounded-2xl border-none mb-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search by ID or cashier..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 glass-input rounded-xl h-11"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] glass-input rounded-xl h-11">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
          <Select value={paymentFilter} onValueChange={setPaymentFilter}>
            <SelectTrigger className="w-[180px] glass-input rounded-xl h-11">
              <SelectValue placeholder="Payment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Payments</SelectItem>
              <SelectItem value="cash">Cash</SelectItem>
              <SelectItem value="card">Card</SelectItem>
              <SelectItem value="gcash">GCash</SelectItem>
              <SelectItem value="paymaya">PayMaya</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card p-4 rounded-2xl border-none">
          <p className="text-sm text-muted-foreground m-0">Total Transactions</p>
          <h3 className="text-2xl mt-2 mb-0">{filteredTransactions.length}</h3>
        </Card>
        <Card className="glass-card p-4 rounded-2xl border-none">
          <p className="text-sm text-muted-foreground m-0">Total Amount</p>
          <h3 className="text-2xl mt-2 mb-0">
            ₱{filteredTransactions.reduce((sum, txn) => sum + txn.total, 0).toLocaleString()}
          </h3>
        </Card>
        <Card className="glass-card p-4 rounded-2xl border-none">
          <p className="text-sm text-muted-foreground m-0">Completed</p>
          <h3 className="text-2xl mt-2 mb-0">
            {filteredTransactions.filter((t) => t.status === 'completed').length}
          </h3>
        </Card>
        <Card className="glass-card p-4 rounded-2xl border-none">
          <p className="text-sm text-muted-foreground m-0">Refunded</p>
          <h3 className="text-2xl mt-2 mb-0">
            {filteredTransactions.filter((t) => t.status === 'refunded').length}
          </h3>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="glass-card rounded-2xl border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left p-4">Transaction ID</th>
                <th className="text-left p-4">Date & Time</th>
                <th className="text-left p-4">Cashier</th>
                <th className="text-left p-4">Payment Method</th>
                <th className="text-left p-4">Items</th>
                <th className="text-left p-4">Total Amount</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((txn) => (
                <tr key={txn.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                  <td className="p-4">
                    <span className="font-mono">{txn.id}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="m-0">{formatDate(txn.date)}</p>
                      <p className="text-sm text-muted-foreground m-0">{formatTime(txn.date)}</p>
                    </div>
                  </td>
                  <td className="p-4">{txn.cashier}</td>
                  <td className="p-4">{getPaymentMethodBadge(txn.paymentMethod)}</td>
                  <td className="p-4 text-center">{txn.items}</td>
                  <td className="p-4">₱{txn.total.toLocaleString()}</td>
                  <td className="p-4">{getStatusBadge(txn.status)}</td>
                  <td className="p-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-lg gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
