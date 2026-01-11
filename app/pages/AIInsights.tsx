import React from 'react';
import { Sparkles, TrendingUp, AlertTriangle, Lightbulb, Target, Calendar } from 'lucide-react';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock AI insights
const predictions = [
  {
    id: '1',
    title: 'Sales Spike Expected Next Week',
    description: 'Based on historical data and seasonal patterns, we predict a 23% increase in sales during December 23-30.',
    confidence: 89,
    type: 'prediction' as const,
    impact: 'high',
  },
  {
    id: '2',
    title: 'Inventory Optimization Opportunity',
    description: 'Coffee Beans Premium shows consistent demand. Consider increasing stock by 40% to avoid stockouts.',
    confidence: 92,
    type: 'recommendation' as const,
    impact: 'medium',
  },
  {
    id: '3',
    title: 'Peak Hour Staffing Alert',
    description: 'Lunch hours (12-1 PM) consistently exceed capacity. Adding 1 more cashier could reduce wait times by 35%.',
    confidence: 87,
    type: 'alert' as const,
    impact: 'high',
  },
  {
    id: '4',
    title: 'Product Bundle Opportunity',
    description: 'Customers who buy Coffee Beans often purchase Organic Milk. Creating a bundle could increase sales by 15%.',
    confidence: 78,
    type: 'recommendation' as const,
    impact: 'medium',
  },
];

const forecastData = [
  { date: 'Dec 19', actual: 7100, predicted: 7300, lower: 6800, upper: 7800 },
  { date: 'Dec 20', predicted: 7500, lower: 7000, upper: 8000 },
  { date: 'Dec 21', predicted: 7200, lower: 6700, upper: 7700 },
  { date: 'Dec 22', predicted: 7800, lower: 7300, upper: 8300 },
  { date: 'Dec 23', predicted: 9200, lower: 8700, upper: 9700 },
  { date: 'Dec 24', predicted: 10500, lower: 10000, upper: 11000 },
  { date: 'Dec 25', predicted: 8900, lower: 8400, upper: 9400 },
  { date: 'Dec 26', predicted: 9800, lower: 9300, upper: 10300 },
];

const demandPatterns = [
  { product: 'Coffee Beans', current: 145, predicted: 189, change: 30 },
  { product: 'Organic Milk', current: 132, predicted: 158, change: 20 },
  { product: 'Protein Bars', current: 87, predicted: 113, change: 30 },
  { product: 'Greek Yogurt', current: 98, predicted: 108, change: 10 },
];

const customerBehavior = [
  { time: '8-9 AM', avgSpend: 125, avgItems: 3.2 },
  { time: '12-1 PM', avgSpend: 245, avgItems: 5.8 },
  { time: '5-6 PM', avgSpend: 198, avgItems: 4.5 },
  { time: '7-8 PM', avgSpend: 165, avgItems: 3.9 },
];

export default function AIInsights() {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'prediction':
        return <Sparkles className="w-5 h-5 text-purple-600" />;
      case 'recommendation':
        return <Lightbulb className="w-5 h-5 text-yellow-600" />;
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-orange-600" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case 'high':
        return <Badge className="bg-red-100 text-red-700 border-red-300">High Impact</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-300">Medium Impact</Badge>;
      case 'low':
        return <Badge className="bg-green-100 text-green-700 border-green-300">Low Impact</Badge>;
      default:
        return <Badge>{impact}</Badge>;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-8 h-8 text-[#5b8db8]" />
          <h1 className="text-3xl m-0">AI-Powered Business Insights</h1>
        </div>
        <p className="text-muted-foreground m-0">
          Advanced predictions and recommendations powered by machine learning
        </p>
      </div>

      {/* AI Predictions & Recommendations */}
      <div className="mb-6">
        <h2 className="text-xl mb-4">Key Insights & Recommendations</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {predictions.map((insight) => (
            <Card
              key={insight.id}
              className="glass-card p-6 rounded-2xl border-none hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start gap-3 mb-3">
                {getTypeIcon(insight.type)}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="m-0">{insight.title}</h4>
                    {getImpactBadge(insight.impact)}
                  </div>
                  <p className="text-sm text-muted-foreground m-0">{insight.description}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#5b8db8] h-2 rounded-full"
                      style={{ width: `${insight.confidence}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {insight.confidence}% confidence
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Sales Forecast Chart */}
      <Card className="glass-card p-6 rounded-2xl border-none mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-[#5b8db8]" />
          <h3 className="m-0">30-Day Sales Forecast</h3>
          <Badge variant="secondary" className="ml-auto">AI-Generated</Badge>
        </div>
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart data={forecastData}>
            <defs>
              <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
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
              dataKey="actual" 
              stroke="#4a7194" 
              strokeWidth={2}
              fill="none"
              name="Actual Sales"
            />
            <Area 
              type="monotone" 
              dataKey="predicted" 
              stroke="#5b8db8" 
              strokeWidth={3}
              fill="url(#colorPredicted)" 
              name="Predicted Sales"
            />
            <Line 
              type="monotone" 
              dataKey="upper" 
              stroke="#7ba5c9" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Upper Bound"
            />
            <Line 
              type="monotone" 
              dataKey="lower" 
              stroke="#7ba5c9" 
              strokeWidth={1}
              strokeDasharray="5 5"
              dot={false}
              name="Lower Bound"
            />
          </AreaChart>
        </ResponsiveContainer>
        <div className="mt-4 p-4 bg-blue-50 rounded-xl">
          <div className="flex items-start gap-2">
            <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="m-0">
                <strong>AI Analysis:</strong> The model predicts a significant sales increase starting December 23, 
                reaching peak on December 24. This pattern is consistent with holiday shopping behavior from previous years.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Demand Predictions */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-[#5b8db8]" />
            <h3 className="m-0">Product Demand Forecast</h3>
          </div>
          <div className="space-y-4">
            {demandPatterns.map((item, index) => (
              <div key={index} className="p-4 bg-white/50 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <span>{item.product}</span>
                  <Badge className="bg-green-100 text-green-700 border-green-300">
                    +{item.change}%
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground m-0">Current: {item.current} units/week</p>
                    <p className="text-sm m-0">Predicted: <strong>{item.predicted} units/week</strong></p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Customer Behavior Analysis */}
        <Card className="glass-card p-6 rounded-2xl border-none">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-[#5b8db8]" />
            <h3 className="m-0">Customer Behavior Patterns</h3>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerBehavior}>
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
              <Bar dataKey="avgSpend" fill="#5b8db8" radius={[8, 8, 0, 0]} name="Avg Spend (₱)" />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {customerBehavior.map((period, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{period.time}</span>
                <span>₱{period.avgSpend} • {period.avgItems} items</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
