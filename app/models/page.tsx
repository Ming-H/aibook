"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { authFetch } from "@/lib/auth";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

interface SavedModel {
  id: number;
  user_id: number;
  experiment_id: number | null;
  model_name: string;
  model_path: string;
  model_type: string;
  task_type: "classification" | "regression";
  algorithm: string;
  metrics: Array<{ name: string; value: number }> | null;
  created_at: string;
  updated_at: string;
}

export default function ModelsPage() {
  const [models, setModels] = useState<SavedModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await authFetch(`${BACKEND_BASE}/api/v1/models`);

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = "/login";
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "获取模型列表失败");
      }

      const data = await res.json();
      setModels(data.models || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  const getAlgorithmLabel = (algorithm: string): string => {
    const labels: Record<string, string> = {
      random_forest: "随机森林",
      svm: "支持向量机",
      logistic_regression: "逻辑回归",
      linear_regression: "线性回归",
      gradient_boosting: "梯度提升",
      knn: "K近邻",
    };
    return labels[algorithm] || algorithm;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="mb-4 inline-block h-8 w-8 animate-spin rounded-full border-4 border-slate-600 border-t-blue-500"></div>
              <p className="text-slate-400">加载中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 py-8">
          <Card className="p-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <h2 className="mb-2 text-2xl font-bold text-slate-100">加载失败</h2>
              <p className="mb-6 text-slate-400">{error}</p>
              <Button onClick={fetchModels}>重试</Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-6 py-8">
        {/* 顶部导航 */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                ← 返回首页
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">模型管理</h1>
              <p className="mt-1 text-sm text-slate-400">查看和管理已保存的模型</p>
            </div>
          </div>
        </div>

        {/* 模型列表 */}
        {models.length === 0 ? (
          <Card className="p-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">📦</div>
              <h2 className="mb-2 text-2xl font-bold text-slate-100">暂无保存的模型</h2>
              <p className="mb-6 text-slate-400">在实验详情页保存模型后，将显示在这里</p>
              <Link href="/experiments">
                <Button>查看实验</Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {models.map((model) => (
              <Card key={model.id} className="p-6">
                <div className="mb-4 flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="mb-1 text-lg font-bold text-slate-100">{model.model_name}</h3>
                    <p className="text-sm text-slate-400">
                      {getAlgorithmLabel(model.algorithm)} · {model.task_type === "classification" ? "分类" : "回归"}
                    </p>
                  </div>
                </div>

                {model.metrics && model.metrics.length > 0 && (
                  <div className="mb-4 space-y-2">
                    {model.metrics.slice(0, 3).map((metric) => (
                      <div key={metric.name} className="flex items-center justify-between text-sm">
                        <span className="text-slate-400">{metric.name}</span>
                        <span className="font-semibold text-slate-200">{metric.value.toFixed(4)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-4 flex items-center justify-between border-t border-slate-700 pt-4">
                  <span className="text-xs text-slate-500">{formatDate(model.created_at)}</span>
                  <div className="flex gap-2">
                    {model.experiment_id && (
                      <Link href={`/experiments/${model.experiment_id}`}>
                        <Button variant="outline" size="sm">
                          查看实验
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
