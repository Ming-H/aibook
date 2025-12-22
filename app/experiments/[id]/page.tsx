"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EnhancedCharts } from "@/components/ui/EnhancedCharts";
import { authFetch } from "@/lib/auth";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

interface Experiment {
  id: number;
  name?: string | null;
  dataset_name: string;
  n_samples: number;
  n_features: number;
  target_column: string;
  task_type: "classification" | "regression";
  model_name: string;
  hyperparams: Record<string, unknown>;
  metrics: Array<{ name: string; value: number }>;
  feature_importance: Array<{ feature: string; importance: number }>;
  created_at: string;
}

export default function ExperimentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const experimentId = params?.id as string;

  const [experiment, setExperiment] = useState<Experiment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (experimentId) {
      fetchExperiment();
    }
  }, [experimentId]);

  const fetchExperiment = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await authFetch(`${BACKEND_BASE}/api/v1/experiments/${experimentId}`);

      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        if (res.status === 404) {
          setError("实验不存在");
          return;
        }
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "获取实验详情失败");
      }

      const data = await res.json();
      setExperiment(data.experiment);
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
        second: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // 将模型名称映射到算法类型
  const mapModelNameToAlgorithm = (modelName: string, hyperparams?: Record<string, unknown>): string => {
    // 优先从 hyperparams 中获取算法信息（最准确）
    if (hyperparams && hyperparams.algorithm) {
      return hyperparams.algorithm as string;
    }

    // 如果 hyperparams 中没有，尝试从模型名称推断
    const modelLower = modelName.toLowerCase();
    if (modelLower.includes("randomforest")) return "random_forest";
    if (modelLower.includes("svc") || modelLower.includes("svr") || modelLower.includes("support")) return "svm";
    if (modelLower.includes("logistic")) return "logistic_regression";
    if (modelLower.includes("linear") && !modelLower.includes("logistic")) return "linear_regression";
    if (modelLower.includes("gradient")) return "gradient_boosting";
    if (modelLower.includes("kneighbors") || modelLower.includes("knn")) return "knn";
    return "random_forest"; // 默认
  };

  // 构建工作流配置
  const buildWorkflowFromExperiment = () => {
    if (!experiment) return null;

    const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const algorithmType = mapModelNameToAlgorithm(experiment.model_name, experiment.hyperparams);

    // 构建节点
    const nodes = [
      {
        id: generateId(),
        type: "data_upload" as const,
        x: 100,
        y: 200,
        config: {
          dataset_name: experiment.dataset_name, // 保存数据集名称，用于显示
        },
      },
      {
        id: generateId(),
        type: algorithmType as any,
        x: 350,
        y: 200,
        config: {
          parameters: experiment.hyperparams || {},
        },
      },
      {
        id: generateId(),
        type: "model_training" as const,
        x: 600,
        y: 200,
        config: {
          target_column: experiment.target_column,
          task_type: experiment.task_type,
          algorithm: algorithmType,
        },
      },
      {
        id: generateId(),
        type: "model_evaluation" as const,
        x: 850,
        y: 200,
        config: {},
      },
    ];

    // 构建连接
    const connections = [
      {
        id: generateId(),
        from: nodes[0].id,
        to: nodes[1].id,
      },
      {
        id: generateId(),
        from: nodes[1].id,
        to: nodes[2].id,
      },
      {
        id: generateId(),
        from: nodes[2].id,
        to: nodes[3].id,
      },
    ];

    return { nodes, connections, dataset_name: experiment.dataset_name };
  };

  const handleRetrain = () => {
    const workflow = buildWorkflowFromExperiment();
    if (!workflow) {
      alert("无法构建工作流配置");
      return;
    }

    // 保存到localStorage，包含数据集名称
    localStorage.setItem("import_workflow", JSON.stringify(workflow));
    localStorage.setItem("import_dataset_name", workflow.dataset_name || "");

    // 跳转到工作流编辑器
    router.push("/workflow");
  };

  const getMetricColor = (name: string, value: number) => {
    if (name.includes("accuracy") || name.includes("r2")) {
      if (value >= 0.9) return "text-green-400";
      if (value >= 0.7) return "text-yellow-400";
      return "text-red-400";
    }
    if (name.includes("error") || name.includes("loss") || name.includes("mse") || name.includes("mae")) {
      if (value < 0.1) return "text-green-400";
      if (value < 0.3) return "text-yellow-400";
      return "text-red-400";
    }
    return "text-slate-200";
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

  if (error || !experiment) {
    return (
      <div className="min-h-screen bg-slate-950">
        <div className="container mx-auto px-6 py-8">
          <Card className="p-8">
            <div className="text-center">
              <div className="mb-4 text-6xl">⚠️</div>
              <h2 className="mb-2 text-2xl font-bold text-slate-100">加载失败</h2>
              <p className="mb-6 text-slate-400">{error || "实验不存在"}</p>
              <div className="flex justify-center gap-4">
                <Button onClick={fetchExperiment}>重试</Button>
                <Link href="/experiments">
                  <Button variant="outline">返回实验列表</Button>
                </Link>
              </div>
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
            <Link href="/experiments">
              <Button variant="ghost" size="sm">
                ← 返回实验列表
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-slate-100">实验详情</h1>
              <p className="mt-1 text-sm text-slate-400">实验 ID: #{experiment.id}</p>
            </div>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">返回首页</Button>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 左侧主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本信息 */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-100">基本信息</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {experiment.name && (
                    <div>
                      <label className="text-sm font-medium text-slate-400">实验名称</label>
                      <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.name}</p>
                    </div>
                  )}
                  <div>
                    <label className="text-sm font-medium text-slate-400">数据集名称</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.dataset_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">任务类型</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">
                      {experiment.task_type === "classification" ? "分类任务" : "回归任务"}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">目标列</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.target_column}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">模型</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.model_name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">样本数</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.n_samples.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-slate-400">特征数</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{experiment.n_features}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-sm font-medium text-slate-400">创建时间</label>
                    <p className="mt-1 text-lg font-semibold text-slate-200">{formatDate(experiment.created_at)}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* 模型指标 */}
            <Card>
              <div className="p-6">
                <h2 className="mb-4 text-xl font-semibold text-slate-100">模型指标</h2>
                {experiment.metrics && experiment.metrics.length > 0 ? (
                  <>
                    <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {experiment.metrics.map((metric) => (
                        <div
                          key={metric.name}
                          className="rounded-lg border border-slate-700 bg-slate-800/50 p-4"
                        >
                          <div className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-400">
                            {metric.name}
                          </div>
                          <div className={`text-2xl font-bold ${getMetricColor(metric.name, metric.value)}`}>
                            {metric.value.toFixed(4)}
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* 增强的可视化图表 */}
                    <div className="mt-6 border-t border-slate-700 pt-6">
                      <EnhancedCharts
                        metrics={experiment.metrics}
                        featureImportance={experiment.feature_importance}
                        taskType={experiment.task_type}
                      />
                    </div>
                  </>
                ) : (
                  <p className="text-slate-400">暂无指标数据</p>
                )}
              </div>
            </Card>

            {/* 特征重要性 */}
            {experiment.feature_importance && experiment.feature_importance.length > 0 && (
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-semibold text-slate-100">特征重要性</h2>
                  <div className="space-y-2">
                    {experiment.feature_importance.slice(0, 10).map((item, index) => (
                      <div key={item.feature} className="flex items-center gap-4">
                        <div className="flex w-full items-center gap-2">
                          <div className="w-8 text-center text-sm font-medium text-slate-400">
                            #{index + 1}
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 flex items-center justify-between">
                              <span className="text-sm font-medium text-slate-200">{item.feature}</span>
                              <span className="text-sm font-semibold text-slate-300">
                                {item.importance.toFixed(4)}
                              </span>
                            </div>
                            <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                              <div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all"
                                style={{
                                  width: `${(item.importance / experiment.feature_importance[0].importance) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {experiment.feature_importance.length > 10 && (
                      <p className="mt-4 text-center text-sm text-slate-400">
                        显示前 10 个特征，共 {experiment.feature_importance.length} 个特征
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* 超参数 */}
            {Object.keys(experiment.hyperparams).length > 0 && (
              <Card>
                <div className="p-6">
                  <h2 className="mb-4 text-xl font-semibold text-slate-100">超参数配置</h2>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      {Object.entries(experiment.hyperparams).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-400">{key}</span>
                          <span className="text-sm font-semibold text-slate-200">
                            {typeof value === "object" ? JSON.stringify(value) : String(value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* 右侧操作栏 */}
          <div className="space-y-6">
            {/* 快速操作 */}
            <Card>
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-100">快速操作</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={async () => {
                      try {
                        const res = await authFetch(`${BACKEND_BASE}/api/v1/models/save`, {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            experiment_id: experiment.id,
                            model_name: experiment.name || `模型_${experiment.id}`,
                          }),
                        });
                        if (res.ok) {
                          alert("模型保存成功！");
                        } else {
                          const data = await res.json().catch(() => ({}));
                          alert(`保存失败: ${data.detail || "未知错误"}`);
                        }
                      } catch (err) {
                        alert(`保存失败: ${err instanceof Error ? err.message : "未知错误"}`);
                      }
                    }}
                  >
                    💾 保存模型
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      const data = JSON.stringify(experiment, null, 2);
                      const blob = new Blob([data], { type: "application/json" });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement("a");
                      a.href = url;
                      a.download = `experiment_${experiment.id}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    📥 导出 JSON
                  </Button>
                  <Button
                    className="w-full"
                    onClick={handleRetrain}
                  >
                    🔄 重新训练
                  </Button>
                  <Link href="/models">
                    <Button variant="outline" className="w-full">
                      📦 查看所有模型
                    </Button>
                  </Link>
                  <Link href={`/experiments/${experiment.id}/share`}>
                    <Button variant="outline" className="w-full">
                      👥 分享实验
                    </Button>
                  </Link>
                  <Link href={`/experiments/${experiment.id}/compare`}>
                    <Button variant="outline" className="w-full">
                      📊 版本对比
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>

            {/* 实验摘要 */}
            <Card>
              <div className="p-6">
                <h3 className="mb-4 text-lg font-semibold text-slate-100">实验摘要</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">状态</span>
                    <span className="rounded-full bg-green-500/20 px-2 py-1 text-xs font-medium text-green-400">
                      已完成
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">最佳指标</span>
                    <span className="font-semibold text-slate-200">
                      {experiment.metrics && experiment.metrics.length > 0
                        ? `${experiment.metrics[0].name}: ${experiment.metrics[0].value.toFixed(4)}`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">特征数</span>
                    <span className="font-semibold text-slate-200">{experiment.n_features}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">样本数</span>
                    <span className="font-semibold text-slate-200">
                      {experiment.n_samples.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
