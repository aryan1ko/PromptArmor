import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, AlertCircle } from "lucide-react";

export default function SystemHealth({ policies, totalChecks, violations, criticalCount }) {
  const activePolicies = policies.filter(p => p.enabled).length;
  const healthScore = totalChecks > 0 
    ? Math.round(((totalChecks - violations) / totalChecks) * 100)
    : 100;

  const getHealthColor = (score) => {
    if (score >= 95) return "text-green-500";
    if (score >= 80) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5" />
          System Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Health Score</span>
            <span className={`text-2xl font-bold ${getHealthColor(healthScore)}`}>
              {healthScore}%
            </span>
          </div>
          <Progress value={healthScore} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
            <span className="text-sm">Active Policies</span>
            <span className="font-semibold">{activePolicies}/{policies.length}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-primary/5 rounded-lg">
            <span className="text-sm">Total Checks</span>
            <span className="font-semibold">{totalChecks.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-orange-500/10 rounded-lg border border-orange-500/30">
            <span className="text-sm">Violations</span>
            <span className="font-semibold text-orange-500">{violations}</span>
          </div>
          {criticalCount > 0 && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 rounded-lg border border-red-500/30">
              <AlertCircle className="w-4 h-4 text-red-500" />
              <span className="text-sm text-red-500 font-medium">
                {criticalCount} Critical Alert{criticalCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}