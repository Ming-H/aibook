"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { authFetch } from "@/lib/auth";

interface Experiment {
  id: number;
  name?: string | null;
  dataset_name: string;
  task_type: "classification" | "regression";
  model_name: string;
  created_at: string;
  metrics: Array<{ name: string; value: number }>;
}

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export default function ExperimentsPage() {
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchExperiments() {
      try {
        const res = await authFetch(`${BACKEND_BASE}/api/v1/experiments`);
        if (!res.ok) {
          throw new Error("获取实验列表失败");
        }
        const data = await res.json();
        setExperiments(data.experiments || []);
      } catch (e) {
        setError(e instanceof Error ? e.message : "未知错误");
      } finally {
        setLoading(false);
      }
    }
    fetchExperiments();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100">实验历史</h1>
          <p className="mt-2 text-slate-400">查看和管理你的所有机器学习实验</p>
        </div>
        <Link href="/">
          <Button>创建新实验</Button>
        </Link>
      </div>

      {loading ? (
        <Card>
          <div className="py-12 text-center">
            <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
            <p className="text-slate-400">加载中...</p>
          </div>
        </Card>
      ) : error ? (
        <Card>
          <div className="py-12 text-center">
            <div className="mb-4 text-4xl">⚠️</div>
            <p className="text-red-400">{error}</p>
            <Button onClick={() => window.location.reload()} className="mt-4" variant="outline">
              重试
            </Button>
          </div>
        </Card>
      ) : experiments.length === 0 ? (
        <Card>
          <div className="py-12 text-center">
            <p className="text-slate-400">还没有实验记录</p>
            <Link href="/" className="mt-4 inline-block">
              <Button>创建第一个实验</Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {experiments.map((exp) => {
            const bestMetric = exp.metrics && exp.metrics.length > 0 ? exp.metrics[0] : null;
            const getMetricColor = (name: string, value: number) => {
              if (name.includes("accuracy") || name.includes("r2")) {
                if (value >= 0.9) return "text-green-400";
                if (value >= 0.7) return "text-yellow-400";
                return "text-red-400";
              }
              return "text-slate-200";
            };

            return (
              <Card
                key={exp.id}
                className="cursor-pointer transition-all hover:border-slate-600 hover:shadow-lg"
              >
                <div className="space-y-4 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100">
                        {exp.name || exp.dataset_name}
                      </h3>
                      {exp.name && (
                        <p className="mt-1 text-xs text-slate-500">数据集: {exp.dataset_name}</p>
                      )}
                      <p className="mt-1 text-sm text-slate-400">
                        {exp.task_type === "classification" ? "分类任务" : "回归任务"}
                      </p>
                    </div>
                    <span className="rounded-full bg-blue-500/20 px-2 py-1 text-xs font-medium text-blue-400">
                      #{exp.id}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">模型</span>
                      <span className="font-medium text-slate-200">{exp.model_name}</span>
                    </div>

                    {bestMetric && (
                      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3">
                        <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                          最佳指标
                        </div>
                        <div className={`text-xl font-bold ${getMetricColor(bestMetric.name, bestMetric.value)}`}>
                          {bestMetric.value.toFixed(4)}
                        </div>
                        <div className="mt-1 text-xs text-slate-500">{bestMetric.name}</div>
                      </div>
                    )}

                    {exp.metrics && exp.metrics.length > 1 && (
                      <div className="space-y-1">
                        {exp.metrics.slice(1, 3).map((m) => (
                          <div key={m.name} className="flex items-center justify-between text-xs">
                            <span className="text-slate-500">{m.name}</span>
                            <span className="font-semibold text-slate-300">{m.value.toFixed(4)}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-700">
                      <div className="text-xs text-slate-500">
                        {new Date(exp.created_at).toLocaleString("zh-CN", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>

                  <Link href={`/experiments/${exp.id}`}>
                    <Button variant="outline" size="sm" className="w-full">
                      查看详情 →
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

