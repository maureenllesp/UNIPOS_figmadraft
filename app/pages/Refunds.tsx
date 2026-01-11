import React, { useState } from 'react';
import { Search, RotateCcw, Check, X } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';

const mockRefunds = [
  {
    id: 'REF-001',
    transactionId: 'TXN-001239',
    date: new Date('2025-12-18T14:05:00'),
    customer: 'John Doe',
    amount: 560,
    reason: 'Defective product',
    status: 'approved' as const,
    processedBy: 'Admin',
  },
  {
    id: 'REF-002',
    transactionId: 'TXN-001185',
    date: new Date('2025-12-17T16:30:00'),
    customer: 'Jane Smith',
    amount: 340,
    reason: 'Wrong item delivered',
    status: 'pending' as const,
    processedBy: null,
  },
  {
    id: 'REF-003',
    transactionId: 'TXN-001156',
    date: new Date('2025-12-16T11:20:00'),
    customer: 'Mike Johnson',
    amount: 780,
    reason: 'Change of mind',
    status: 'rejected' as const,
    processedBy: 'Admin',
  },
  {
    id: 'REF-004',
    transactionId: 'TXN-001098',
    date: new Date('2025-12-15T09:45:00'),
    customer: 'Sarah Williams',
    amount: 1250,
    reason: 'Product expired',
    status: 'approved' as const,
    processedBy: 'Admin',
  },
];

export default function Refunds() {
  const [search, setSearch] = useState('');

  const filteredRefunds = mockRefunds.filter(
    (refund) =>
      refund.id.toLowerCase().includes(search.toLowerCase()) ||
      refund.transactionId.toLowerCase().includes(search.toLowerCase()) ||
      refund.customer.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Approved</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Pending</Badge>;
      case 'rejected':
        return <Badge className="bg-red-100 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
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

  const pendingCount = filteredRefunds.filter((r) => r.status === 'pending').length;
  const approvedCount = filteredRefunds.filter((r) => r.status === 'approved').length;
  const totalRefundAmount = filteredRefunds
    .filter((r) => r.status === 'approved')
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl m-0">Refund Management</h1>
        <p className="text-muted-foreground m-0">Process and track refund requests</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Refunds</p>
              <h3 className="text-2xl mt-2 mb-0">{filteredRefunds.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Pending</p>
              <h3 className="text-2xl mt-2 mb-0">{pendingCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Approved</p>
              <h3 className="text-2xl mt-2 mb-0">{approvedCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <Check className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Amount</p>
              <h3 className="text-2xl mt-2 mb-0">₱{totalRefundAmount.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <RotateCcw className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass-card p-4 rounded-2xl border-none mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search by refund ID, transaction ID, or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-input rounded-xl h-11"
          />
        </div>
      </Card>

      {/* Refunds Table */}
      <Card className="glass-card rounded-2xl border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left p-4">Refund ID</th>
                <th className="text-left p-4">Transaction ID</th>
                <th className="text-left p-4">Date & Time</th>
                <th className="text-left p-4">Customer</th>
                <th className="text-left p-4">Amount</th>
                <th className="text-left p-4">Reason</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRefunds.map((refund) => (
                <tr key={refund.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                  <td className="p-4">
                    <span className="font-mono">{refund.id}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">{refund.transactionId}</span>
                  </td>
                  <td className="p-4">
                    <div>
                      <p className="m-0">{formatDate(refund.date)}</p>
                      <p className="text-sm text-muted-foreground m-0">{formatTime(refund.date)}</p>
                    </div>
                  </td>
                  <td className="p-4">{refund.customer}</td>
                  <td className="p-4">₱{refund.amount.toLocaleString()}</td>
                  <td className="p-4">
                    <span className="text-sm">{refund.reason}</span>
                  </td>
                  <td className="p-4">{getStatusBadge(refund.status)}</td>
                  <td className="p-4">
                    {refund.status === 'pending' ? (
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg gap-1 border-green-300 text-green-600 hover:bg-green-50"
                        >
                          <Check className="w-4 h-4" />
                          Approve
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-lg gap-1 border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                          Reject
                        </Button>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        {refund.processedBy}
                      </span>
                    )}
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
