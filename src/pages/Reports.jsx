import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, FileText, FileJson, AlertTriangle } from "lucide-react";
import { format, subDays } from "date-fns";
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import BackButton from "../components/navigation/BackButton";

export default function Reports() {
  const [timeRange, setTimeRange] = useState("7");
  const [reportType, setReportType] = useState("summary");

  const { data: logs = [], isLoading, error } = useQuery({
    queryKey: ['securityLogs'],
    queryFn: async () => {
      try {
        return await base44.entities.SecurityLog.list('-timestamp');
      } catch (err) {
        console.error("Error loading logs:", err);
        return [];
      }
    },
    initialData: [],
    retry: 1,
  });

  const filteredLogs = logs.filter(log => {
    if (!log.timestamp) return false;
    try {
      const logDate = new Date(log.timestamp);
      const cutoffDate = subDays(new Date(), parseInt(timeRange));
      return logDate >= cutoffDate;
    } catch (err) {
      return false;
    }
  });

  const violationsByType = filteredLogs.reduce((acc, log) => {
    if (log.violations && log.violations.length > 0) {
      log.violations.forEach(v => {
        if (v.type) {
          acc[v.type] = (acc[v.type] || 0) + 1;
        }
      });
    }
    return acc;
  }, {});

  const severityDistribution = filteredLogs.reduce((acc, log) => {
    if (log.severity) {
      acc[log.severity] = (acc[log.severity] || 0) + 1;
    }
    return acc;
  }, {});

  const violationChartData = Object.entries(violationsByType).map(([name, value]) => ({
    name: name.replace(/_/g, ' '),
    count: value
  }));

  const severityChartData = Object.entries(severityDistribution).map(([name, value]) => ({
    name,
    value
  }));

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const exportReport = (format) => {
    try {
      const reportData = {
        generated_at: new Date().toISOString(),
        time_range_days: timeRange,
        total_checks: filteredLogs.length,
        violations_by_type: violationsByType,
        severity_distribution: severityDistribution,
        detailed_logs: filteredLogs.slice(0, 100)
      };

      if (format === 'json') {
        const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `promptarmor-report-${format(new Date(), 'yyyy-MM-dd')}.json`;
        a.click();
        URL.revokeObjectURL(url);
      } else {
        const html = `
<!DOCTYPE html>
<html>
<head>
  <title>PromptArmor Security Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; background: #f5f5f5; }
    .container { background: white; padding: 40px; border-radius: 8px; }
    h1 { color: #10b981; }
    .metric { display: inline-block; margin: 20px; padding: 20px; background: #ecfdf5; border-radius: 8px; }
    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #e5e7eb; }
    th { background: #f3f4f6; font-weight: bold; }
  </style>
</head>
<body>
  <div class="container">
    <h1>PromptArmor Security Report</h1>
    <p>Generated: ${format(new Date(), 'PPpp')}</p>
    <p>Time Range: Last ${timeRange} days</p>
    
    <h2>Summary Metrics</h2>
    <div class="metric">
      <h3>${filteredLogs.length}</h3>
      <p>Total Checks</p>
    </div>
    <div class="metric">
      <h3>${Object.values(violationsByType).reduce((a, b) => a + b, 0)}</h3>
      <p>Violations Detected</p>
    </div>
    
    <h2>Violations by Type</h2>
    <table>
      <tr><th>Type</th><th>Count</th></tr>
      ${Object.entries(violationsByType).map(([type, count]) => 
        `<tr><td>${type.replace(/_/g, ' ')}</td><td>${count}</td></tr>`
      ).join('')}
    </table>
    
    <h2>Recent Logs</h2>
    <table>
      <tr><th>Timestamp</th><th>Check Type</th><th>Status</th><th>Severity</th></tr>
      ${filteredLogs.slice(0, 20).map(log => `
        <tr>
          <td>${log.timestamp ? format(new Date(log.timestamp), 'PPpp') : 'N/A'}</td>
          <td>${log.check_type?.replace(/_/g, ' ') || 'N/A'}</td>
          <td>${log.status || 'N/A'}</td>
          <td>${log.severity || 'N/A'}</td>
        </tr>
      `).join('')}
    </table>
  </div>
</body>
</html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `promptarmor-report-${format(new Date(), 'yyyy-MM-dd')}.html`;
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      console.error("Error exporting report:", err);
      alert("Failed to export report. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <BackButton />
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Reports</h3>
            <p className="text-muted-foreground">
              There was an error loading the report data. Please try refreshing the page.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-6">
      <BackButton />
      
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Security Reports</h1>
          <p className="text-muted-foreground">Generate comprehensive audit reports</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => exportReport('html')} variant="outline" className="hover:bg-emerald-500/10 hover:text-emerald-500">
            <FileText className="w-4 h-4 mr-2" />
            Export HTML
          </Button>
          <Button onClick={() => exportReport('json')} variant="outline" className="hover:bg-emerald-500/10 hover:text-emerald-500">
            <FileJson className="w-4 h-4 mr-2" />
            Export JSON
          </Button>
        </div>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Report Configuration</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Time Range</label>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Last 24 Hours</SelectItem>
                  <SelectItem value="7">Last 7 Days</SelectItem>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type</label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="summary">Summary Report</SelectItem>
                  <SelectItem value="detailed">Detailed Analysis</SelectItem>
                  <SelectItem value="compliance">Compliance Audit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <p className="text-sm text-muted-foreground">Total Checks</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{filteredLogs.length.toLocaleString()}</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <p className="text-sm text-muted-foreground">Violations Detected</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-500">
              {Object.values(violationsByType).reduce((a, b) => a + b, 0)}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <p className="text-sm text-muted-foreground">Blocked Requests</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-red-500">
              {filteredLogs.filter(l => l.status === 'blocked').length}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <p className="text-sm text-muted-foreground">Avg Latency</p>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-500">
              {filteredLogs.length > 0 
                ? Math.round(filteredLogs.reduce((sum, l) => sum + (l.latency_ms || 0), 0) / filteredLogs.length)
                : 0}ms
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Violations by Type</CardTitle>
          </CardHeader>
          <CardContent>
            {violationChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={violationChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="name" stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <YAxis stroke="#9ca3af" style={{ fontSize: '12px' }} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar dataKey="count" fill="#10b981" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No violation data available
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Severity Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            {severityChartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={severityChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => entry.name}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {severityChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                No severity data available
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}