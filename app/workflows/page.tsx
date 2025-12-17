"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/lib/auth";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

interface WorkflowResult {
  id: number;
  name: string;
  description?: string;
  workflow_config: {
    nodes: Array<{
      id: string;
      type: string;
      x: number;
      y: number;
      config?: Record<string, unknown>;
    }>;
    connections: Array<{
      id: string;
      from: string;
      to: string;
    }>;
  };
  execution_results?: Record<string, unknown>;
  experiment_results?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

export default function WorkflowsPage() {
  const router = useRouter();
  const [workflows, setWorkflows] = useState<WorkflowResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedWorkflow, setSelectedWorkflow] = useState<WorkflowResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadWorkflows();
  }, []);

  const loadWorkflows = async () => {
    try {
      setLoading(true);
      const res = await authFetch(`${BACKEND_BASE}/api/v1/workflows`);
      if (!res.ok) {
        if (res.status === 401) {
          router.push("/login");
          return;
        }
        throw new Error("加载工作流列表失败");
      }
      const data = await res.json();
      setWorkflows(data.workflows || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  const handleImportToCanvas = (workflow: WorkflowResult) => {
    // 将工作流配置保存到localStorage，然后跳转到工作流编辑器
    localStorage.setItem("import_workflow", JSON.stringify(workflow.workflow_config));
    router.push("/workflow");
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

  const getMetricsSummary = (experimentResults: Record<string, unknown> | undefined) => {
    if (!experimentResults) return null;

    // 尝试从实验结果中提取指标
    if (typeof experimentResults === "object" && "metrics" in experimentResults) {
      const metrics = (experimentResults.metrics as Array<{ name: string; value: number }>) || [];
      return metrics.map((m) => `${m.name}: ${m.value.toFixed(4)}`).join(", ");
    }

    // 尝试从execution_results中提取
    if (typeof experimentResults === "object" && "experiment" in experimentResults) {
      const exp = (experimentResults.experiment as Record<string, unknown>) || {};
      if ("metrics" in exp) {
        const metrics = (exp.metrics as Array<{ name: string; value: number }>) || [];
        return metrics.map((m) => `${m.name}: ${m.value.toFixed(4)}`).join(", ");
      }
    }

    return null;
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-slate-400">加载中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 顶部导航栏 */}
      <div className="border-b border-slate-800 bg-slate-900/50 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/workflow">
              <Button variant="ghost" size="sm">
                ← 返回工作流编辑器
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-100">历史工作流</h1>
          </div>
          <Link href="/">
            <Button variant="ghost" size="sm">
              返回首页
            </Button>
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-red-400">
            {error}
          </div>
        )}

        {workflows.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-slate-400">暂无保存的工作流</p>
            <Link href="/workflow">
              <Button className="mt-4">创建新工作流</Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workflows.map((workflow) => (
              <Card
                key={workflow.id}
                className="cursor-pointer transition-all hover:border-slate-600 hover:shadow-lg"
                onClick={() => setSelectedWorkflow(workflow)}
              >
                <div className="p-6">
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-200">{workflow.name}</h3>
                    <span className="text-xs text-slate-500">
                      #{workflow.id}
                    </span>
                  </div>

                  {workflow.description && (
                    <p className="mb-3 text-sm text-slate-400">{workflow.description}</p>
                  )}

                  <div className="mb-3 space-y-1 text-xs text-slate-500">
                    <div>节点数: {workflow.workflow_config?.nodes?.length || 0}</div>
                    <div>连接数: {workflow.workflow_config?.connections?.length || 0}</div>
                    {workflow.experiment_results && (
                      <div className="mt-2 text-slate-400">
                        {getMetricsSummary(workflow.experiment_results) || "已保存实验结果"}
                      </div>
                    )}
                  </div>

                  <div className="mb-4 text-xs text-slate-500">
                    创建时间: {formatDate(workflow.created_at)}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImportToCanvas(workflow);
                      }}
                      className="flex-1"
                    >
                      📥 导入到画布
                    </Button>
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWorkflow(workflow);
                      }}
                      className="flex-1"
                    >
                      查看详情
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 详情对话框 */}
      {selectedWorkflow && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setSelectedWorkflow(null)}
        >
          <Card
            className="max-h-[90vh] w-full max-w-4xl overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-100">{selectedWorkflow.name}</h2>
                  {selectedWorkflow.description && (
                    <p className="mt-1 text-slate-400">{selectedWorkflow.description}</p>
                  )}
                </div>
                <button
                  onClick={() => setSelectedWorkflow(null)}
                  className="text-slate-400 hover:text-slate-200"
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-200">基本信息</h3>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-slate-400">工作流ID:</span>
                        <span className="ml-2 text-slate-200">#{selectedWorkflow.id}</span>
                      </div>
                      <div>
                        <span className="text-slate-400">节点数:</span>
                        <span className="ml-2 text-slate-200">
                          {selectedWorkflow.workflow_config?.nodes?.length || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">连接数:</span>
                        <span className="ml-2 text-slate-200">
                          {selectedWorkflow.workflow_config?.connections?.length || 0}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-400">创建时间:</span>
                        <span className="ml-2 text-slate-200">
                          {formatDate(selectedWorkflow.created_at)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 实验结果 */}
                {selectedWorkflow.experiment_results && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-200">实验结果</h3>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <pre className="overflow-x-auto text-xs text-slate-300">
                        {JSON.stringify(selectedWorkflow.experiment_results, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* 执行结果 */}
                {selectedWorkflow.execution_results && (
                  <div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-200">执行结果</h3>
                    <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                      <pre className="overflow-x-auto text-xs text-slate-300">
                        {JSON.stringify(selectedWorkflow.execution_results, null, 2)}
                      </pre>
                    </div>
                  </div>
                )}

                {/* 工作流配置 */}
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-slate-200">工作流配置</h3>
                  <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-4">
                    <pre className="overflow-x-auto text-xs text-slate-300">
                      {JSON.stringify(selectedWorkflow.workflow_config, null, 2)}
                    </pre>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      handleImportToCanvas(selectedWorkflow);
                      setSelectedWorkflow(null);
                    }}
                    className="flex-1"
                  >
                    📥 导入到画布
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedWorkflow(null)}
                    className="flex-1"
                  >
                    关闭
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
