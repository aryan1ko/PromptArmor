
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, AlertTriangle, CheckCircle } from "lucide-react";
import BackButton from "../components/navigation/BackButton";

export default function InputSanitizer() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <BackButton />
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Input Sanitizer</h1>
        <p className="text-muted-foreground">Detect and block malicious prompts before they reach your LLM</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Shield className="w-5 h-5 text-blue-500" />
              </div>
              <CardTitle className="text-lg">Jailbreak Detection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Identifies attempts to bypass system instructions like "ignore previous instructions" or role-playing attacks.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detection Rate</span>
                <span className="font-semibold">99.2%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>False Positives</span>
                <span className="font-semibold">0.3%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
              </div>
              <CardTitle className="text-lg">Prompt Injection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Detects malicious instructions hidden in user input that attempt to manipulate the model's behavior.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detection Rate</span>
                <span className="font-semibold">97.8%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>False Positives</span>
                <span className="font-semibold">1.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <CardTitle className="text-lg">Context Integrity</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Ensures prompts don't contain recursive modifications or attempts to leak system context.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Detection Rate</span>
                <span className="font-semibold">98.5%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>False Positives</span>
                <span className="font-semibold">0.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              1
            </div>
            <div>
              <h3 className="font-semibold mb-1">Pattern Matching</h3>
              <p className="text-sm text-muted-foreground">
                Uses regex and keyword detection to identify known jailbreak patterns and injection attempts.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              2
            </div>
            <div>
              <h3 className="font-semibold mb-1">Semantic Analysis</h3>
              <p className="text-sm text-muted-foreground">
                Leverages embeddings to detect semantically similar attacks that use different wording.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              3
            </div>
            <div>
              <h3 className="font-semibold mb-1">Context Comparison</h3>
              <p className="text-sm text-muted-foreground">
                Compares against baseline "golden context" to detect drift or unauthorized modifications.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
              4
            </div>
            <div>
              <h3 className="font-semibold mb-1">Policy Enforcement</h3>
              <p className="text-sm text-muted-foreground">
                Applies configured policies to block, flag, or sanitize suspicious inputs before LLM processing.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
