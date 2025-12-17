interface MetricCardProps {
  name: string;
  value: number;
  unit?: string;
  trend?: "up" | "down" | "neutral";
  description?: string;
}

export function MetricCard({ name, value, unit = "", trend = "neutral", description }: MetricCardProps) {
  const trendColors = {
    up: "text-emerald-400",
    down: "text-red-400",
    neutral: "text-slate-300",
  };

  return (
    <div className="group relative overflow-hidden rounded-xl border border-slate-800/50 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-4 backdrop-blur-sm transition-all duration-300 hover:border-slate-700 hover:shadow-lg hover:shadow-blue-500/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {name}
          </div>
          <div className={`mt-2 text-2xl font-bold ${trendColors[trend]}`}>
            {value.toFixed(4)}
            {unit && <span className="ml-1 text-sm text-slate-500">{unit}</span>}
          </div>
          {description && (
            <div className="mt-1 text-xs text-slate-500">{description}</div>
          )}
        </div>
      </div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
    </div>
  );
}

