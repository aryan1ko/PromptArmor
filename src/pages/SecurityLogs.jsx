import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Download, Eye, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import BackButton from "../components/navigation/BackButton";
import LogDetailsModal from "../components/logs/LogDetailsModal";

export default function SecurityLogs() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [checkTypeFilter, setCheckTypeFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState(null);

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
    const matchesSearch = !searchQuery || 
      log.input_text?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.request_id?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    const matchesType = checkTypeFilter === "all" || log.check_type === checkTypeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const statusColors = {
    passed: "bg-green-500/10 text-green-500 border-green-500/30",
    flagged: "bg-orange-500/10 text-orange-500 border-orange-500/30",
    blocked: "bg-red-500/10 text-red-500 border-red-500/30"
  };

  const severityColors = {
    low: "bg-blue-500/10 text-blue-500",
    medium: "bg-yellow-500/10 text-yellow-500",
    high: "bg-orange-500/10 text-orange-500",
    critical: "bg-red-500/10 text-red-500"
  };

  const exportLogs = () => {
    try {
      const csv = [
        ['Timestamp', 'Request ID', 'Check Type', 'Status', 'Severity', 'Latency (ms)'],
        ...filteredLogs.map(log => [
          log.timestamp || '',
          log.request_id || '',
          log.check_type || '',
          log.status || '',
          log.severity || '',
          log.latency_ms || ''
        ])
      ].map(row => row.join(',')).join('\n');

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `security-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error exporting logs:", err);
      alert("Failed to export logs. Please try again.");
    }
  };

  if (error) {
    return (
      <div className="p-6 md:p-8">
        <BackButton />
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Logs</h3>
            <p className="text-muted-foreground">
              There was an error loading the security logs. Please try refreshing the page.
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
          <h1 className="text-3xl font-bold mb-2">Audit Logs</h1>
          <p className="text-muted-foreground">Detailed audit trail of all security checks</p>
        </div>
        <Button onClick={exportLogs} variant="outline" className="hover:bg-emerald-500/10 hover:text-emerald-500">
          <Download className="w-4 h-4 mr-2" />
          Export CSV
        </Button>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search logs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="passed">Passed</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
                <SelectItem value="blocked">Blocked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={checkTypeFilter} onValueChange={setCheckTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Check Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="input_sanitizer">Input Sanitizer</SelectItem>
                <SelectItem value="output_inspector">Output Inspector</SelectItem>
                <SelectItem value="tool_policy">Tool Policy</SelectItem>
                <SelectItem value="context_diff">Context Diff</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-card border-border">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-primary/5 border-b border-border">
                <tr>
                  <th className="text-left p-4 font-medium">Timestamp</th>
                  <th className="text-left p-4 font-medium">Request ID</th>
                  <th className="text-left p-4 font-medium">Check Type</th>
                  <th className="text-left p-4 font-medium">Status</th>
                  <th className="text-left p-4 font-medium">Severity</th>
                  <th className="text-left p-4 font-medium">Latency</th>
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-muted-foreground">
                      Loading logs...
                    </td>
                  </tr>
                )}
                {!isLoading && filteredLogs.map((log) => (
                  <tr key={log.id} className="border-b border-border hover:bg-primary/5 transition-colors">
                    <td className="p-4 text-sm">
                      {log.timestamp ? format(new Date(log.timestamp), 'MMM dd, HH:mm:ss') : 'N/A'}
                    </td>
                    <td className="p-4 text-sm font-mono">{log.request_id?.substring(0, 8)}...</td>
                    <td className="p-4 text-sm">{log.check_type?.replace(/_/g, ' ')}</td>
                    <td className="p-4">
                      <Badge className={statusColors[log.status]}>
                        {log.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={severityColors[log.severity]}>
                        {log.severity}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm">{log.latency_ms}ms</td>
                    <td className="p-4">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedLog(log)}
                        className="hover:bg-emerald-500/10 hover:text-emerald-500"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {!isLoading && filteredLogs.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-muted-foreground">
                      No logs found matching your filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {selectedLog && (
        <LogDetailsModal 
          log={selectedLog} 
          onClose={() => setSelectedLog(null)} 
        />
      )}
    </div>
  );
}