import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, Filter, Zap, CheckCircle, ArrowRight, Github, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-lg border-b border-blue-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">PromptArmor</span>
          </div>
          <div className="flex gap-4">
            <Button variant="ghost" className="text-white hover:text-blue-400">
              Documentation
            </Button>
            <Link to={createPageUrl("Dashboard")}>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Launch Dashboard
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-blue-400 text-sm font-medium">
                🔒 Enterprise-Grade LLM Security
              </span>
            </div>
            <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              PromptArmor
            </h1>
            <p className="text-xl md:text-2xl text-blue-200 mb-4">
              Secure Your AI Agents from Input to Output
            </p>
            <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-10">
              Enterprise middleware that intercepts LLM calls to detect jailbreaks, prevent data leaks, 
              and enforce security policies for OpenAI Agents, LangChain, AutoGen, and CrewAI.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to={createPageUrl("LiveDemo")}>
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8">
                  <Play className="w-5 h-5 mr-2" />
                  Try Live Demo
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 text-lg px-8">
                <Github className="w-5 h-5 mr-2" />
                View on GitHub
              </Button>
            </div>
          </motion.div>

          {/* Animated Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 blur-3xl"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-2 shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop" 
                alt="Dashboard Preview"
                className="w-full rounded-xl opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">
            Complete Security Architecture
          </h2>
          <p className="text-center text-slate-400 mb-12 text-lg">
            Six layers of protection for your AI infrastructure
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Filter,
                title: "Input Sanitizer",
                description: "Detects and blocks jailbreak attempts, prompt injections, and recursive self-modifications before they reach your LLM.",
                color: "from-blue-500 to-cyan-500"
              },
              {
                icon: Eye,
                title: "Output Inspector",
                description: "Scans LLM responses for PII, API keys, secrets, and hallucinated credentials using regex and embedding similarity.",
                color: "from-purple-500 to-pink-500"
              },
              {
                icon: Lock,
                title: "Tool Policy Gatekeeper",
                description: "Enforces YAML-defined rules for allowed tool names and API domains. Blocks unauthorized tool calls at runtime.",
                color: "from-green-500 to-emerald-500"
              },
              {
                icon: Zap,
                title: "Context Diff Engine",
                description: "Compares live prompts to golden context using embeddings. Detects semantic drift and hidden injections.",
                color: "from-orange-500 to-red-500"
              },
              {
                icon: CheckCircle,
                title: "Policy-as-Code",
                description: "Define security rules in YAML with version control. Enforce blocking, redaction, and alerting actions automatically.",
                color: "from-indigo-500 to-purple-500"
              },
              {
                icon: Shield,
                title: "Audit & Reporting",
                description: "Comprehensive logs stored in PostgreSQL with OpenTelemetry integration. Export HTML/JSON reports on demand.",
                color: "from-pink-500 to-rose-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 backdrop-blur-xl border border-blue-500/30 rounded-2xl p-12">
            <h2 className="text-4xl font-bold text-center mb-6">
              Works With Your Existing Stack
            </h2>
            <p className="text-center text-slate-300 mb-10 text-lg max-w-3xl mx-auto">
              PromptArmor integrates seamlessly as middleware between your AI agents and LLM providers. 
              No code changes required.
            </p>
            <div className="flex flex-wrap justify-center gap-8 items-center">
              {["OpenAI", "LangChain", "AutoGen", "CrewAI", "LlamaIndex", "Anthropic"].map((tech) => (
                <div key={tech} className="px-6 py-3 bg-slate-800/50 border border-slate-700 rounded-lg font-medium">
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Secure Your AI Infrastructure?
          </h2>
          <p className="text-xl text-slate-400 mb-10">
            Start protecting your LLM agents from security threats in minutes.
          </p>
          <Link to={createPageUrl("Dashboard")}>
            <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-10">
              Launch Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 py-8 px-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-500" />
            <span className="font-semibold">PromptArmor</span>
          </div>
          <p className="text-slate-500">© 2025 PromptArmor. Built with base44.</p>
        </div>
      </footer>
    </div>
  );
}