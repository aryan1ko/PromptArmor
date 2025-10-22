import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

const colorClasses = {
  blue: "from-blue-500 to-cyan-500",
  orange: "from-orange-500 to-red-500",
  red: "from-red-500 to-pink-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-pink-500"
};

export default function MetricCard({ title, value, change, trend, icon: Icon, color }) {
  const getTrendIcon = () => {
    if (trend === "up") return <TrendingUp className="w-4 h-4" />;
    if (trend === "down") return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-card border-border hover:border-primary/50 transition-all duration-300">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className={`p-2 rounded-lg bg-gradient-to-r ${colorClasses[color]} bg-opacity-10`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-baseline justify-between">
            <h2 className="text-3xl font-bold">{value}</h2>
            <div className={`flex items-center gap-1 text-sm ${getTrendColor()}`}>
              {getTrendIcon()}
              <span className="font-medium">{change}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}