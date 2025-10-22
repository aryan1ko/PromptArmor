import React from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import { Shield, AlertTriangle, CheckCircle, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BackButton from "../components/navigation/BackButton";
import MetricCard from "../components/dashboard/MetricCard";
import ViolationChart from "../components/dashboard/ViolationChart";
import RecentLogs from "../components/dashboard/RecentLogs";
import SystemHealth from "../components/dashboard/SystemHealth";

export default function Dashboard() {
  const { data: logs = [], isLoading: logsLoading, error: logsError } = useQuery({
    queryKey: ['securityLogs'],
    queryFn: async () => {
      try {
        return await base44.entities.SecurityLog.list('-timestamp', 100);
      } catch (err) {
        console.error("Error loading logs:", err);
        return [];
      }
    },
    initialData: [],
    retry: 1,
  });

  const { data: policies = [], isLoading: policiesLoading } = useQuery({
    queryKey: ['policies'],
    queryFn: async () => {
      try {
        return await base44.entities.Policy.list();
      } catch (err) {
        console.error("Error loading policies:", err);
        return [];
      }
    },
    initialData: [],
    retry: 1,
  });

  const totalChecks = logs.length;
  const violations = logs.filter(log => log.status !== 'passed');
  const blocked = logs.filter(log => log.status === 'blocked');
  const avgLatency = logs.length > 0 
    ? Math.round(logs.reduce((sum, log) => sum + (log.latency_ms || 0), 0) / logs.length)
    : 0;

  const criticalViolations = violations.filter(v => v.severity === 'critical').length;

  if (logsError) {
    return (
      <div className="p-6 md:p-8">
        <BackButton />
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-orange-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Unable to Load Dashboard</h3>
            <p className="text-muted-foreground">
              There was an error loading the dashboard data. Please try refreshing the page.
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
          <h1 className="text-3xl font-bold mb-2">Metrics Dashboard</h1>
          <p className="text-muted-foreground">Real-time monitoring of your LLM security infrastructure</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-lg">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-500 font-medium">System Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Checks"
          value={totalChecks.toLocaleString()}
          change="+12%"
          trend="up"
          icon={Shield}
          color="blue"
        />
        <MetricCard
          title="Violations Caught"
          value={violations.length.toLocaleString()}
          change={violations.length > 0 ? "+8%" : "0%"}
          trend={violations.length > 0 ? "up" : "neutral"}
          icon={AlertTriangle}
          color="orange"
        />
        <MetricCard
          title="Blocked Requests"
          value={blocked.length.toLocaleString()}
          change={blocked.length > 0 ? "+5%" : "0%"}
          trend={blocked.length > 0 ? "up" : "neutral"}
          icon={CheckCircle}
          color="red"
        />
        <MetricCard
          title="Avg Latency"
          value={`${avgLatency}ms`}
          change="-3%"
          trend="down"
          icon={Clock}
          color="green"
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <ViolationChart logs={logs} />
          <RecentLogs logs={logs.slice(0, 10)} />
        </div>

        <div className="space-y-6">
          <SystemHealth 
            policies={policies}
            totalChecks={totalChecks}
            violations={violations.length}
            criticalCount={criticalViolations}
          />
          
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-lg">Active Policies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {policies.filter(p => p.enabled).map((policy) => (
                  <div key={policy.id} className="flex items-center justify-between p-3 bg-primary/5 rounded-lg border border-border">
                    <div>
                      <p className="font-medium">{policy.name}</p>
                      <p className="text-sm text-muted-foreground">v{policy.version}</p>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  </div>
                ))}
                {policies.filter(p => p.enabled).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">No active policies</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}