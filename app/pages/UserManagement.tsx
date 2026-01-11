import React, { useState } from 'react';
import { Search, Plus, Edit, Trash2, Lock, UserCheck, UserX } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback } from '../components/ui/avatar';

const mockUsers = [
  {
    id: '1',
    name: 'Ashley Graham',
    email: 'cashier@unipos.com',
    role: 'cashier' as const,
    active: true,
    lastLogin: new Date('2025-12-18T09:30:00'),
    createdAt: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'John Smith',
    email: 'admin@unipos.com',
    role: 'admin' as const,
    active: true,
    lastLogin: new Date('2025-12-18T08:15:00'),
    createdAt: new Date('2025-01-10'),
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'owner@unipos.com',
    role: 'owner' as const,
    active: true,
    lastLogin: new Date('2025-12-18T10:00:00'),
    createdAt: new Date('2025-01-05'),
  },
  {
    id: '4',
    name: 'Michael Brown',
    email: 'cashier2@unipos.com',
    role: 'cashier' as const,
    active: true,
    lastLogin: new Date('2025-12-17T14:30:00'),
    createdAt: new Date('2025-02-20'),
  },
  {
    id: '5',
    name: 'Emily Davis',
    email: 'cashier3@unipos.com',
    role: 'cashier' as const,
    active: false,
    lastLogin: new Date('2025-11-28T16:45:00'),
    createdAt: new Date('2025-03-10'),
  },
];

export default function UserManagement() {
  const [search, setSearch] = useState('');

  const filteredUsers = mockUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.role.toLowerCase().includes(search.toLowerCase())
  );

  const getRoleBadge = (role: string) => {
    const colors: Record<string, string> = {
      cashier: 'bg-blue-100 text-blue-700 border-blue-300',
      admin: 'bg-purple-100 text-purple-700 border-purple-300',
      owner: 'bg-green-100 text-green-700 border-green-300',
    };
    return (
      <Badge variant="outline" className={colors[role]}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const activeCount = filteredUsers.filter((u) => u.active).length;
  const inactiveCount = filteredUsers.filter((u) => !u.active).length;
  const cashierCount = filteredUsers.filter((u) => u.role === 'cashier').length;
  const adminCount = filteredUsers.filter((u) => u.role === 'admin').length;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl m-0">User Management</h1>
          <p className="text-muted-foreground m-0">Manage users, roles, and permissions</p>
        </div>
        <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2">
          <Plus className="w-5 h-5" />
          Add New User
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Total Users</p>
              <h3 className="text-2xl mt-2 mb-0">{filteredUsers.length}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Active</p>
              <h3 className="text-2xl mt-2 mb-0">{activeCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Cashiers</p>
              <h3 className="text-2xl mt-2 mb-0">{cashierCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-muted-foreground m-0">Admins</p>
              <h3 className="text-2xl mt-2 mb-0">{adminCount}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <Card className="glass-card p-4 rounded-2xl border-none mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search users by name, email, or role..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 glass-input rounded-xl h-11"
          />
        </div>
      </Card>

      {/* Users Table */}
      <Card className="glass-card rounded-2xl border-none overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="text-left p-4">User</th>
                <th className="text-left p-4">Email</th>
                <th className="text-left p-4">Role</th>
                <th className="text-left p-4">Status</th>
                <th className="text-left p-4">Last Login</th>
                <th className="text-left p-4">Created</th>
                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10 bg-[#7ba5c9]">
                        <AvatarFallback className="bg-[#7ba5c9] text-white">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span>{user.name}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">{user.email}</td>
                  <td className="p-4">{getRoleBadge(user.role)}</td>
                  <td className="p-4">
                    {user.active ? (
                      <Badge className="bg-green-100 text-green-700 border-green-300">
                        Active
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700 border-gray-300">
                        Inactive
                      </Badge>
                    )}
                  </td>
                  <td className="p-4 text-sm">{formatDateTime(user.lastLogin)}</td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {formatDate(user.createdAt)}
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        title="Edit User"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg"
                        title="Reset Password"
                      >
                        <Lock className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={user.active ? 'rounded-lg text-orange-600 border-orange-300' : 'rounded-lg text-green-600 border-green-300'}
                        title={user.active ? 'Deactivate' : 'Activate'}
                      >
                        {user.active ? <UserX className="w-4 h-4" /> : <UserCheck className="w-4 h-4" />}
                      </Button>
                    </div>
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
