
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, Key, User, Link as LinkIcon } from "lucide-react";
import BackButton from "../components/navigation/BackButton";

export default function OutputInspector() {
  return (
    <div className="p-6 md:p-8 space-y-6">
      <BackButton />
      
      <div>
        <h1 className="text-3xl font-bold mb-2">Output Inspector</h1>
        <p className="text-muted-foreground">Scan LLM responses for sensitive data and security risks</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <User className="w-5 h-5 text-purple-500" />
              </div>
              <CardTitle className="text-lg">PII Detection</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Identifies emails, phone numbers, SSNs, addresses, and other personally identifiable information.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <Key className="w-5 h-5 text-red-500" />
              </div>
              <CardTitle className="text-lg">Secret Scanning</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Detects API keys, passwords, tokens, and credentials that may have been leaked in responses.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg">
                <LinkIcon className="w-5 h-5 text-orange-500" />
              </div>
              <CardTitle className="text-lg">URL Validation</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Checks for hallucinated or unauthorized URLs that don't match allowed domain lists.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Eye className="w-5 h-5 text-green-500" />
              </div>
              <CardTitle className="text-lg">Context Leakage</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prevents system prompts or internal context from being exposed in model outputs.
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Detection Techniques</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              Regular Expression Patterns
            </h3>
            <p className="text-sm text-muted-foreground ml-4">
              High-precision regex patterns for common PII formats like emails (name@domain.com), 
              phone numbers (XXX-XXX-XXXX), SSNs (XXX-XX-XXXX), and API key structures.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Embedding Similarity
            </h3>
            <p className="text-sm text-muted-foreground ml-4">
              Uses vector embeddings to detect semantically similar sensitive content even when 
              exact patterns don't match, catching obfuscated or paraphrased secrets.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Named Entity Recognition
            </h3>
            <p className="text-sm text-muted-foreground ml-4">
              ML models identify person names, organizations, locations, and other entities 
              that might constitute sensitive information based on context.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Entropy Analysis
            </h3>
            <p className="text-sm text-muted-foreground ml-4">
              High-entropy strings are flagged as potential secrets, passwords, or tokens 
              even if they don't match known patterns.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
        <CardContent className="p-6">
          <h3 className="font-semibold mb-2">Redaction Options</h3>
          <p className="text-sm text-muted-foreground mb-4">
            When sensitive data is detected, PromptArmor can automatically:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Mask:</strong> Replace with asterisks or [REDACTED] placeholders</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Block:</strong> Prevent the entire response from being returned</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Log & Alert:</strong> Record the violation and notify security teams</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500">•</span>
              <span><strong>Replace:</strong> Substitute with safe synthetic alternatives</span>
            </li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
