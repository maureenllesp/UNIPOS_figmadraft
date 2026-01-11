import React from 'react';
import { Download, FileText, TrendingUp, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';

const reportTemplates = [
  {
    id: '1',
    title: 'Daily Sales Report',
    description: 'Summary of all sales transactions for today',
    icon: <FileText className="w-6 h-6 text-blue-600" />,
    color: 'bg-blue-100',
  },
  {
    id: '2',
    title: 'Weekly Performance',
    description: 'Comprehensive weekly sales and inventory analysis',
    icon: <TrendingUp className="w-6 h-6 text-green-600" />,
    color: 'bg-green-100',
  },
  {
    id: '3',
    title: 'Monthly Summary',
    description: 'Complete monthly revenue, profit, and trends',
    icon: <Calendar className="w-6 h-6 text-purple-600" />,
    color: 'bg-purple-100',
  },
  {
    id: '4',
    title: 'Inventory Report',
    description: 'Stock levels, low-stock items, and reorder alerts',
    icon: <FileText className="w-6 h-6 text-orange-600" />,
    color: 'bg-orange-100',
  },
  {
    id: '5',
    title: 'Transaction History',
    description: 'Detailed transaction records with filters',
    icon: <FileText className="w-6 h-6 text-indigo-600" />,
    color: 'bg-indigo-100',
  },
  {
    id: '6',
    title: 'Product Performance',
    description: 'Top-selling and underperforming products',
    icon: <TrendingUp className="w-6 h-6 text-pink-600" />,
    color: 'bg-pink-100',
  },
];

const recentReports = [
  {
    id: '1',
    name: 'Daily_Sales_Dec_18_2025.pdf',
    date: '2025-12-18',
    size: '2.4 MB',
  },
  {
    id: '2',
    name: 'Weekly_Performance_Dec_11-18.pdf',
    date: '2025-12-18',
    size: '4.8 MB',
  },
  {
    id: '3',
    name: 'Monthly_Summary_November_2025.pdf',
    date: '2025-12-01',
    size: '6.2 MB',
  },
  {
    id: '4',
    name: 'Inventory_Report_Dec_17_2025.pdf',
    date: '2025-12-17',
    size: '1.9 MB',
  },
];

export default function Reports() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl m-0">Reports</h1>
        <p className="text-muted-foreground m-0">Generate and download business reports</p>
      </div>

      {/* Report Templates */}
      <div className="mb-8">
        <h2 className="text-xl mb-4">Generate New Report</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reportTemplates.map((template) => (
            <Card
              key={template.id}
              className="glass-card p-6 rounded-2xl border-none hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 rounded-xl ${template.color} flex items-center justify-center mb-4`}>
                {template.icon}
              </div>
              <h3 className="mb-2">{template.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 m-0">{template.description}</p>
              <Button className="w-full bg-[#5b8db8] hover:bg-[#4a7194] rounded-xl gap-2">
                <Download className="w-4 h-4" />
                Generate PDF
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Reports */}
      <div>
        <h2 className="text-xl mb-4">Recent Reports</h2>
        <Card className="glass-card rounded-2xl border-none overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="text-left p-4">Report Name</th>
                  <th className="text-left p-4">Generated Date</th>
                  <th className="text-left p-4">File Size</th>
                  <th className="text-left p-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-t border-gray-100 hover:bg-gray-50/30">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-red-600" />
                        <span>{report.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      {new Date(report.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-4 text-muted-foreground">{report.size}</td>
                    <td className="p-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-lg gap-2"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
