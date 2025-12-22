"use client";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface ChartData {
  name: string;
  value: number;
  [key: string]: unknown;
}

interface EnhancedChartsProps {
  metrics: Array<{ name: string; value: number }>;
  featureImportance?: Array<{ feature: string; importance: number }>;
  taskType: "classification" | "regression";
}

const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981", "#ef4444"];

export function MetricsBarChart({ metrics }: { metrics: Array<{ name: string; value: number }> }) {
  const data = metrics.map((m) => ({
    name: m.name,
    value: m.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
          }}
        />
        <Bar dataKey="value" fill="#3b82f6" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function FeatureImportanceChart({
  featureImportance,
}: {
  featureImportance: Array<{ feature: string; importance: number }>;
}) {
  const data = featureImportance
    .slice(0, 10)
    .map((item) => ({
      name: item.feature.length > 15 ? `${item.feature.substring(0, 15)}...` : item.feature,
      importance: item.importance,
      fullName: item.feature,
    }))
    .sort((a, b) => b.importance - a.importance);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={data} layout="vertical">
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis type="number" stroke="#94a3b8" />
        <YAxis dataKey="name" type="category" width={120} stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
          }}
          labelFormatter={(label) => {
            const item = data.find((d) => d.name === label);
            return item?.fullName || label;
          }}
        />
        <Bar dataKey="importance" fill="#8b5cf6" radius={[0, 8, 8, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function MetricsPieChart({ metrics }: { metrics: Array<{ name: string; value: number }> }) {
  const data = metrics.map((m, idx) => ({
    name: m.name,
    value: m.value,
    color: COLORS[idx % COLORS.length],
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) => `${name}: ${percent ? (percent * 100).toFixed(0) : 0}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function MetricsLineChart({ metrics }: { metrics: Array<{ name: string; value: number }> }) {
  const data = metrics.map((m) => ({
    name: m.name,
    value: m.value,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
        <XAxis dataKey="name" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
          }}
        />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function EnhancedCharts({ metrics, featureImportance, taskType }: EnhancedChartsProps) {
  return (
    <div className="space-y-6">
      {/* 指标柱状图 */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">指标对比（柱状图）</h3>
        <MetricsBarChart metrics={metrics} />
      </div>

      {/* 指标折线图 */}
      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
        <h3 className="mb-4 text-lg font-semibold text-slate-100">指标趋势（折线图）</h3>
        <MetricsLineChart metrics={metrics} />
      </div>

      {/* 特征重要性 */}
      {featureImportance && featureImportance.length > 0 && (
        <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
          <h3 className="mb-4 text-lg font-semibold text-slate-100">特征重要性（Top 10）</h3>
          <FeatureImportanceChart featureImportance={featureImportance} />
        </div>
      )}
    </div>
  );
}
