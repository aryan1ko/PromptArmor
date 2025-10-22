import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LogDetailsModal({ log, onClose }) {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Dialog open={!!log} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Security Log Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Request ID</p>
              <p className="font-mono text-sm">{log.request_id}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Timestamp</p>
              <p className="text-sm">
                {log.timestamp ? format(new Date(log.timestamp), 'PPpp') : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Check Type</p>
              <p className="text-sm">{log.check_type?.replace(/_/g, ' ')}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Status</p>
              <Badge>{log.status}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Severity</p>
              <Badge variant="outline">{log.severity}</Badge>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Latency</p>
              <p className="text-sm">{log.latency_ms}ms</p>
            </div>
          </div>

          {log.input_text && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Input Text</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(log.input_text)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-border">
                <p className="text-sm font-mono whitespace-pre-wrap">{log.input_text}</p>
              </div>
            </div>
          )}

          {log.output_text && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Output Text</p>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyToClipboard(log.output_text)}
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-border">
                <p className="text-sm font-mono whitespace-pre-wrap">{log.output_text}</p>
              </div>
            </div>
          )}

          {log.violations && log.violations.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Violations Detected</p>
              <div className="space-y-2">
                {log.violations.map((violation, index) => (
                  <div key={index} className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-medium text-sm">{violation.type}</p>
                      <Badge variant="outline" className="text-xs">
                        {(violation.confidence * 100).toFixed(0)}% confidence
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{violation.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {log.policy_applied && (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Policy Applied</p>
              <p className="text-sm font-medium">{log.policy_applied}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}