import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { format, subHours } from "date-fns";

export default function ViolationChart({ logs }) {
  const getChartData = () => {
    const hours = [];
    for (let i = 23; i >= 0; i--) {
      hours.push(subHours(new Date(), i));
    }

    return hours.map(hour => {
      const hourLogs = logs.filter(log => {
        const logTime = new Date(log.timestamp);
        return logTime.getHours() === hour.getHours() && 
               logTime.getDate() === hour.getDate();
      });

      return {
        time: format(hour, 'HH:mm'),
        total: hourLogs.length,
        violations: hourLogs.filter(l => l.status !== 'passed').length,
        blocked: hourLogs.filter(l => l.status === 'blocked').length,
      };
    });
  };

  const data = getChartData();

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Security Events (24 Hours)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorViolations" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBlocked" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
            <XAxis 
              dataKey="time" 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#9ca3af"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#1f2937', 
                border: '1px solid #374151',
                borderRadius: '8px'
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="total" 
              stroke="#3b82f6" 
              fillOpacity={1} 
              fill="url(#colorTotal)"
              name="Total Checks"
            />
            <Area 
              type="monotone" 
              dataKey="violations" 
              stroke="#f59e0b" 
              fillOpacity={1} 
              fill="url(#colorViolations)"
              name="Violations"
            />
            <Area 
              type="monotone" 
              dataKey="blocked" 
              stroke="#ef4444" 
              fillOpacity={1} 
              fill="url(#colorBlocked)"
              name="Blocked"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}