import React, { useState } from 'react';
import { Save, Store, DollarSign, FileText, Bell, Shield } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

export default function Settings() {
  const [storeName, setStoreName] = useState('UNIPOS Store');
  const [storeAddress, setStoreAddress] = useState('123 Main Street, City');
  const [storePhone, setStorePhone] = useState('+63 912 345 6789');
  const [currency, setCurrency] = useState('PHP');
  const [taxRate, setTaxRate] = useState('12');
  const [receiptHeader, setReceiptHeader] = useState('Thank you for shopping with us!');
  const [receiptFooter, setReceiptFooter] = useState('Please come again!');
  const [emailNotif, setEmailNotif] = useState(true);
  const [lowStockAlert, setLowStockAlert] = useState(true);
  const [dailyReport, setDailyReport] = useState(true);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl m-0">Settings</h1>
        <p className="text-muted-foreground m-0">Configure system preferences and store information</p>
      </div>

      <Tabs defaultValue="store" className="space-y-6">
        <TabsList className="glass-card p-1 rounded-xl">
          <TabsTrigger value="store" className="rounded-lg gap-2">
            <Store className="w-4 h-4" />
            Store Info
          </TabsTrigger>
          <TabsTrigger value="financial" className="rounded-lg gap-2">
            <DollarSign className="w-4 h-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="receipt" className="rounded-lg gap-2">
            <FileText className="w-4 h-4" />
            Receipt
          </TabsTrigger>
          <TabsTrigger value="notifications" className="rounded-lg gap-2">
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="security" className="rounded-lg gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Store Information */}
        <TabsContent value="store" className="space-y-4">
          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Store Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={storeName}
                  onChange={(e) => setStoreName(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeAddress">Address</Label>
                <Input
                  id="storeAddress"
                  value={storeAddress}
                  onChange={(e) => setStoreAddress(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storePhone">Phone Number</Label>
                <Input
                  id="storePhone"
                  value={storePhone}
                  onChange={(e) => setStorePhone(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeEmail">Email</Label>
                <Input
                  id="storeEmail"
                  type="email"
                  placeholder="store@unipos.com"
                  className="glass-input rounded-xl"
                />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Financial Settings */}
        <TabsContent value="financial" className="space-y-4">
          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Tax & Currency Settings</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currency">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency" className="glass-input rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PHP">Philippine Peso (₱)</SelectItem>
                    <SelectItem value="USD">US Dollar ($)</SelectItem>
                    <SelectItem value="EUR">Euro (€)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="priceFormat">Price Display Format</Label>
                <Select defaultValue="symbol">
                  <SelectTrigger id="priceFormat" className="glass-input rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="symbol">₱ 1,234.56</SelectItem>
                    <SelectItem value="code">PHP 1,234.56</SelectItem>
                    <SelectItem value="plain">1,234.56</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Receipt Settings */}
        <TabsContent value="receipt" className="space-y-4">
          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Receipt Layout</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="receiptHeader">Header Message</Label>
                <Input
                  id="receiptHeader"
                  value={receiptHeader}
                  onChange={(e) => setReceiptHeader(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiptFooter">Footer Message</Label>
                <Input
                  id="receiptFooter"
                  value={receiptFooter}
                  onChange={(e) => setReceiptFooter(e.target.value)}
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label>Receipt Options</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span className="text-sm">Show store logo</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span className="text-sm">Print item images</span>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white/50 rounded-xl">
                    <span className="text-sm">Show cashier name</span>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-4">
          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Notification Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Email Notifications</p>
                  <p className="text-sm text-muted-foreground m-0">Receive updates via email</p>
                </div>
                <Switch checked={emailNotif} onCheckedChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground m-0">Get notified when stock is low</p>
                </div>
                <Switch checked={lowStockAlert} onCheckedChange={setLowStockAlert} />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Daily Sales Report</p>
                  <p className="text-sm text-muted-foreground m-0">Daily summary at 11:59 PM</p>
                </div>
                <Switch checked={dailyReport} onCheckedChange={setDailyReport} />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Transaction Alerts</p>
                  <p className="text-sm text-muted-foreground m-0">Notify on large transactions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Security */}
        <TabsContent value="security" className="space-y-4">
          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Security Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground m-0">Add extra security layer</p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Session Timeout</p>
                  <p className="text-sm text-muted-foreground m-0">Auto logout after inactivity</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 bg-white/50 rounded-xl">
                <div>
                  <p className="m-0">Activity Logging</p>
                  <p className="text-sm text-muted-foreground m-0">Track all user actions</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </Card>

          <Card className="glass-card p-6 rounded-2xl border-none">
            <h3 className="mb-4">Change Password</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input
                  id="newPassword"
                  type="password"
                  className="glass-input rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  className="glass-input rounded-xl"
                />
              </div>
              <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl">
                Update Password
              </Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end mt-6">
        <Button className="bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2 px-8">
          <Save className="w-5 h-5" />
          Save All Changes
        </Button>
      </div>
    </div>
  );
}
