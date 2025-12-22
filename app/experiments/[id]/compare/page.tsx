"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { authFetch } from "@/lib/auth";
import { EnhancedCharts } from "@/components/ui/EnhancedCharts";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

interface ExperimentVersion {
  id: number;
  version: number;
  name: string | null;
  created_at: string;
  metrics: Array<{ name: string; value: number }>;
}

interface ComparisonResult {
  base_version: ExperimentVersion;
  compare_version: ExperimentVersion;
  metric_differences: Array<{
    name: string;
    base_value: number;
    compare_value: number;
    difference: number;
    percent_change: number;
  }>;
}

export default function CompareExperimentsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const baseId = parseInt(params?.id as string);
  const compareIdFromUrl = searchParams?.get("compare");
  
  const [versions, setVersions] = useState<ExperimentVersion[]>([]);
  const [selectedCompareId, setSelectedCompareId] = useState<number | null>(
    compareIdFromUrl ? parseInt(compareIdFromUrl) : null
  );
  const [comparison, setComparison] = useState<ComparisonResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [comparing, setComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchVersions();
  }, [baseId]);

  useEffect(() => {
    if (selectedCompareId && selectedCompareId !== baseId) {
      compareExperiments();
    }
  }, [selectedCompareId, baseId]);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      const res = await authFetch(`${BACKEND_BASE}/api/v1/experiments/${baseId}/versions`);

      if (!res.ok) {
        throw new Error("获取版本列表失败");
      }

      const data = await res.json();
      setVersions(data.versions || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "加载失败");
    } finally {
      setLoading(false);
    }
  };

  const compareExperiments = async () => {
    if (!selectedCompareId) return;

    try {
      setComparing(true);
      setError(null);
      const res = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/${baseId}/compare/${selectedCompareId}`
      );

      if (!res.ok) {
        throw new Error("对比失败");
      }

      const data = await res.json();
      setComparison(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "对比失败");
    } finally {
      setComparing(false);
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

  return (
    <div className="min-h-screen bg-slate-950">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-6 flex items-center gap-4">
          <Link href={`/experiments/${baseId}`}>
            <Button variant="ghost" size="sm">
              ← 返回实验详情
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-100">版本对比</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 版本选择 */}
          <Card className="lg:col-span-1">
            <div className="p-6">
              <h3 className="mb-4 text-lg font-semibold text-slate-100">选择对比版本</h3>
              <div className="space-y-2">
                {versions.map((version) => (
                  <button
                    key={version.id}
                    onClick={() => setSelectedCompareId(version.id)}
                    className={`w-full rounded-lg border p-3 text-left transition-all ${
                      selectedCompareId === version.id
                        ? "border-blue-500 bg-blue-500/20"
                        : "border-slate-700 bg-slate-800/50 hover:border-slate-600"
                    }`}
                  >
                    <div className="font-medium text-slate-200">
                      {version.name || `版本 ${version.version}`}
                    </div>
                    <div className="mt-1 text-xs text-slate-400">{formatDate(version.created_at)}</div>
                  </button>
                ))}
              </div>
            </div>
          </Card>

          {/* 对比结果 */}
          <div className="lg:col-span-2 space-y-6">
            {comparison ? (
              <>
                <Card>
                  <div className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-100">指标对比</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-700">
                            <th className="px-4 py-2 text-left text-slate-300">指标</th>
                            <th className="px-4 py-2 text-right text-slate-300">基准版本</th>
                            <th className="px-4 py-2 text-right text-slate-300">对比版本</th>
                            <th className="px-4 py-2 text-right text-slate-300">差异</th>
                            <th className="px-4 py-2 text-right text-slate-300">变化率</th>
                          </tr>
                        </thead>
                        <tbody>
                          {comparison.metric_differences.map((diff) => (
                            <tr key={diff.name} className="border-b border-slate-800/50">
                              <td className="px-4 py-2 font-medium text-slate-200">{diff.name}</td>
                              <td className="px-4 py-2 text-right text-slate-300">
                                {diff.base_value.toFixed(4)}
                              </td>
                              <td className="px-4 py-2 text-right text-slate-300">
                                {diff.compare_value.toFixed(4)}
                              </td>
                              <td
                                className={`px-4 py-2 text-right font-semibold ${
                                  diff.difference > 0 ? "text-green-400" : diff.difference < 0 ? "text-red-400" : "text-slate-400"
                                }`}
                              >
                                {diff.difference > 0 ? "+" : ""}
                                {diff.difference.toFixed(4)}
                              </td>
                              <td
                                className={`px-4 py-2 text-right ${
                                  diff.percent_change > 0 ? "text-green-400" : diff.percent_change < 0 ? "text-red-400" : "text-slate-400"
                                }`}
                              >
                                {diff.percent_change > 0 ? "+" : ""}
                                {diff.percent_change.toFixed(2)}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Card>

                {/* 可视化对比 */}
                <Card>
                  <div className="p-6">
                    <h3 className="mb-4 text-lg font-semibold text-slate-100">可视化对比</h3>
                    <div className="grid gap-6 md:grid-cols-2">
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-slate-400">基准版本</h4>
                        <EnhancedCharts
                          metrics={comparison.base_version.metrics}
                          taskType="classification"
                        />
                      </div>
                      <div>
                        <h4 className="mb-2 text-sm font-medium text-slate-400">对比版本</h4>
                        <EnhancedCharts
                          metrics={comparison.compare_version.metrics}
                          taskType="classification"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </>
            ) : (
              <Card>
                <div className="p-8 text-center">
                  <p className="text-slate-400">请选择一个版本进行对比</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
