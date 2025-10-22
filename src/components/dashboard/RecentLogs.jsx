import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";

const statusColors = {
  passed: "bg-green-500/10 text-green-500 border-green-500/30",
  flagged: "bg-orange-500/10 text-orange-500 border-orange-500/30",
  blocked: "bg-red-500/10 text-red-500 border-red-500/30"
};

const checkTypeLabels = {
  input_sanitizer: "Input Sanitizer",
  output_inspector: "Output Inspector",
  tool_policy: "Tool Policy",
  context_diff: "Context Diff"
};

export default function RecentLogs({ logs }) {
  const getStatusIcon = (status) => {
    if (status === 'passed') return <CheckCircle className="w-4 h-4" />;
    if (status === 'blocked') return <AlertTriangle className="w-4 h-4" />;
    return <Shield className="w-4 h-4" />;
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle>Recent Security Checks</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {logs.map((log) => (
            <div 
              key={log.id} 
              className="flex items-center justify-between p-4 bg-primary/5 rounded-lg border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`p-2 rounded-lg ${statusColors[log.status]}`}>
                  {getStatusIcon(log.status)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium">{checkTypeLabels[log.check_type]}</p>
                    <Badge variant="outline" className="text-xs">
                      {log.severity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {log.input_text?.substring(0, 60)}...
                  </p>
                </div>
              </div>
              <div className="text-right ml-4">
                <p className="text-sm font-medium">{log.latency_ms}ms</p>
                <p className="text-xs text-muted-foreground">
                  {log.timestamp ? format(new Date(log.timestamp), 'HH:mm:ss') : 'N/A'}
                </p>
              </div>
            </div>
          ))}
          {logs.length === 0 && (
            <p className="text-center text-muted-foreground py-8">No recent logs</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}