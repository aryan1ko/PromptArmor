import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Filter, Eye, Settings, FileBarChart, FileText, BarChart3, ArrowRight, Zap, Lock, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const featureCards = [
  {
    icon: Filter,
    title: "Input Sanitizer",
    description: "Detect jailbreaks, prompt injections, and malicious inputs before they reach your LLM",
    path: "InputSanitizer",
    color: "from-blue-500 to-cyan-500",
    stats: "99.2% detection rate"
  },
  {
    icon: Eye,
    title: "Output Inspector",
    description: "Find PII, secrets, API keys, and credentials in LLM outputs automatically",
    path: "OutputInspector",
    color: "from-purple-500 to-pink-500",
    stats: "Real-time scanning"
  },
  {
    icon: Settings,
    title: "Policy Editor",
    description: "Define and manage security rules with YAML-based policy-as-code configuration",
    path: "PolicyEditor",
    color: "from-orange-500 to-red-500",
    stats: "Version controlled"
  },
  {
    icon: FileBarChart,
    title: "Reports",
    description: "Generate comprehensive audit reports with charts, metrics, and detailed analysis",
    path: "Reports",
    color: "from-green-500 to-emerald-500",
    stats: "Export HTML/JSON"
  },
  {
    icon: FileText,
    title: "Audit Logs",
    description: "Complete audit trail of all security checks with filtering and search capabilities",
    path: "SecurityLogs",
    color: "from-indigo-500 to-purple-500",
    stats: "Full history"
  },
  {
    icon: BarChart3,
    title: "Metrics Dashboard",
    description: "Real-time monitoring of security events, violations, and system performance",
    path: "Dashboard",
    color: "from-pink-500 to-rose-500",
    stats: "Live updates"
  },
];

const quickStats = [
  { label: "Detection Accuracy", value: "99.2%", icon: CheckCircle },
  { label: "Avg Response Time", value: "<50ms", icon: Zap },
  { label: "Active Policies", value: "2", icon: Lock },
  { label: "Protected Endpoints", value: "6", icon: Shield },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-medium text-emerald-500">Enterprise LLM Security Platform</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-400 bg-clip-text text-transparent">
              Secure Your AI Agents
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Enterprise middleware that intercepts LLM calls to detect jailbreaks, prevent data leaks, 
              and enforce security policies across your AI infrastructure.
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link to={createPageUrl("LiveDemo")}>
                <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                  Try Live Demo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={createPageUrl("Dashboard")}>
                <Button size="lg" variant="outline" className="border-emerald-500/50 hover:bg-emerald-500/10">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
          >
            {quickStats.map((stat, index) => (
              <Card key={index} className="bg-card/50 backdrop-blur-sm border-border">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-emerald-500" />
                  <p className="text-2xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Security Modules</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive protection across your entire AI stack
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={createPageUrl(feature.path)}>
                <Card className="group h-full bg-card border-border hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10 cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="px-3 py-1 bg-primary/10 rounded-full">
                        <span className="text-xs font-medium text-muted-foreground">{feature.stats}</span>
                      </div>
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-emerald-500 transition-colors">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-emerald-500 font-medium text-sm group-hover:gap-4 transition-all">
                      <span>Explore Module</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Integration Banner */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">Ready to Secure Your Infrastructure?</h3>
                <p className="text-muted-foreground">
                  Start protecting your LLM agents from security threats in minutes. 
                  Compatible with OpenAI, LangChain, AutoGen, CrewAI, and more.
                </p>
              </div>
              <Link to={createPageUrl("LiveDemo")}>
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 whitespace-nowrap">
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}