import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { TrendingUp, Users, Target, Heart } from "lucide-react";

export default function Visualizations() {
  const { ref, isVisible } = useIntersectionObserver();

  const salesData = [
    { month: "Jan", sales: 65 },
    { month: "Feb", sales: 78 },
    { month: "Mar", sales: 85 },
    { month: "Apr", sales: 92 },
    { month: "May", sales: 98 },
    { month: "Jun", sales: 105 },
  ];

  const segmentData = [
    { name: "Premium", value: 45, color: "hsl(217, 91%, 60%)" },
    { name: "Standard", value: 30, color: "hsl(188, 95%, 43%)" },
    { name: "Basic", value: 15, color: "hsl(282, 100%, 50%)" },
    { name: "Trial", value: 10, color: "hsl(47, 96%, 53%)" },
  ];

  const performanceData = [
    { metric: "Accuracy", value: 94 },
    { metric: "Precision", value: 89 },
    { metric: "Recall", value: 92 },
    { metric: "F1-Score", value: 90 },
  ];

  const sentimentData = [
    { sentiment: "Positive", value: 65 },
    { sentiment: "Neutral", value: 25 },
    { sentiment: "Negative", value: 10 },
  ];

  const charts = [
    {
      title: "Sales Performance Analysis",
      icon: TrendingUp,
      color: "text-primary",
      chart: (
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={salesData}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(217, 91%, 60%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
            <XAxis dataKey="month" stroke="hsl(240, 5%, 64%)" />
            <YAxis stroke="hsl(240, 5%, 64%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 4%, 8%)",
                border: "1px solid hsl(240, 6%, 20%)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="sales"
              stroke="hsl(217, 91%, 60%)"
              fillOpacity={1}
              fill="url(#salesGradient)"
              strokeWidth={3}
            />
          </AreaChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Customer Segmentation",
      icon: Users,
      color: "text-accent",
      chart: (
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={segmentData}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {segmentData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 4%, 8%)",
                border: "1px solid hsl(240, 6%, 20%)",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Model Performance Metrics",
      icon: Target,
      color: "text-purple-400",
      chart: (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
            <XAxis dataKey="metric" stroke="hsl(240, 5%, 64%)" />
            <YAxis domain={[0, 100]} stroke="hsl(240, 5%, 64%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 4%, 8%)",
                border: "1px solid hsl(240, 6%, 20%)",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="value" fill="hsl(282, 100%, 50%)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
    {
      title: "Sentiment Analysis Results",
      icon: Heart,
      color: "text-pink-400",
      chart: (
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={sentimentData} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(240, 6%, 20%)" />
            <XAxis type="number" stroke="hsl(240, 5%, 64%)" />
            <YAxis dataKey="sentiment" type="category" stroke="hsl(240, 5%, 64%)" />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(240, 4%, 8%)",
                border: "1px solid hsl(240, 6%, 20%)",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="value"
              fill="hsl(142, 76%, 36%)"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ),
    },
  ];

  return (
    <section id="visualizations" className="py-20" data-testid="visualizations-section">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4" data-testid="visualizations-title">
            Data Visualizations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto" data-testid="visualizations-description">
            Interactive charts and dashboards showcasing data insights and analytical capabilities.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {charts.map((chart, index) => {
            const Icon = chart.icon;
            return (
              <motion.div
                key={chart.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                data-testid={`chart-${chart.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="glassmorphism rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Icon className={`${chart.color}`} size={24} />
                    {chart.title}
                  </h3>
                  <div className="h-64">
                    {chart.chart}
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
