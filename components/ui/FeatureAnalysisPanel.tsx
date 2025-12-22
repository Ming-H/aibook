"use client";

import { Card } from "./Card";

interface FeatureStat {
  feature: string;
  dtype: string;
  missing_count: number;
  missing_rate: number;
  mean?: number | null;
  std?: number | null;
  min?: number | null;
  max?: number | null;
  median?: number | null;
  unique_count?: number | null;
  top_values?: Array<{ value: string; count: number }> | null;
}

interface FeatureAnalysisData {
  n_features: number;
  n_samples: number;
  features: FeatureStat[];
  correlation_matrix?: number[][] | null;
  correlation_features?: string[] | null;
}

interface FeatureAnalysisPanelProps {
  data: FeatureAnalysisData;
}

export function FeatureAnalysisPanel({ data }: FeatureAnalysisPanelProps) {
  const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return "N/A";
    if (Math.abs(num) < 0.01 || Math.abs(num) > 1000000) {
      return num.toExponential(2);
    }
    return num.toFixed(2);
  };

  const getCorrelationColor = (value: number): string => {
    const absValue = Math.abs(value);
    if (absValue > 0.7) return "bg-red-500";
    if (absValue > 0.5) return "bg-orange-500";
    if (absValue > 0.3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* 概览统计 */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-100">数据集概览</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400">样本数量</div>
            <div className="mt-1 text-2xl font-bold text-blue-400">{data.n_samples.toLocaleString()}</div>
          </div>
          <div className="rounded-lg bg-slate-800/50 p-4">
            <div className="text-sm text-slate-400">特征数量</div>
            <div className="mt-1 text-2xl font-bold text-purple-400">{data.n_features}</div>
          </div>
        </div>
      </Card>

      {/* 特征统计表格 */}
      <Card className="p-6">
        <h3 className="mb-4 text-lg font-bold text-slate-100">特征统计信息</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-4 py-2 text-left text-slate-300">特征名</th>
                <th className="px-4 py-2 text-left text-slate-300">数据类型</th>
                <th className="px-4 py-2 text-right text-slate-300">缺失值</th>
                <th className="px-4 py-2 text-right text-slate-300">缺失率</th>
                <th className="px-4 py-2 text-right text-slate-300">均值</th>
                <th className="px-4 py-2 text-right text-slate-300">标准差</th>
                <th className="px-4 py-2 text-right text-slate-300">最小值</th>
                <th className="px-4 py-2 text-right text-slate-300">最大值</th>
                <th className="px-4 py-2 text-right text-slate-300">唯一值</th>
              </tr>
            </thead>
            <tbody>
              {data.features.map((feature, idx) => (
                <tr key={idx} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                  <td className="px-4 py-2 font-medium text-slate-200">{feature.feature}</td>
                  <td className="px-4 py-2 text-slate-400">{feature.dtype}</td>
                  <td className="px-4 py-2 text-right text-slate-300">{feature.missing_count}</td>
                  <td className="px-4 py-2 text-right text-slate-300">
                    {(feature.missing_rate * 100).toFixed(1)}%
                  </td>
                  <td className="px-4 py-2 text-right text-slate-300">{formatNumber(feature.mean)}</td>
                  <td className="px-4 py-2 text-right text-slate-300">{formatNumber(feature.std)}</td>
                  <td className="px-4 py-2 text-right text-slate-300">{formatNumber(feature.min)}</td>
                  <td className="px-4 py-2 text-right text-slate-300">{formatNumber(feature.max)}</td>
                  <td className="px-4 py-2 text-right text-slate-300">
                    {feature.unique_count ?? "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 类别特征 Top 值 */}
      {data.features.some((f) => f.top_values && f.top_values.length > 0) && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-100">类别特征分布</h3>
          <div className="space-y-4">
            {data.features
              .filter((f) => f.top_values && f.top_values.length > 0)
              .map((feature, idx) => (
                <div key={idx} className="rounded-lg bg-slate-800/50 p-4">
                  <div className="mb-2 font-medium text-slate-200">{feature.feature}</div>
                  <div className="space-y-1">
                    {feature.top_values?.slice(0, 5).map((item, itemIdx) => {
                      const percentage = (item.count / data.n_samples) * 100;
                      return (
                        <div key={itemIdx} className="flex items-center gap-2">
                          <div className="w-32 truncate text-sm text-slate-300">{item.value}</div>
                          <div className="flex-1">
                            <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                              <div
                                className="h-full bg-blue-500"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                          </div>
                          <div className="w-16 text-right text-xs text-slate-400">
                            {item.count} ({percentage.toFixed(1)}%)
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        </Card>
      )}

      {/* 相关性矩阵 */}
      {data.correlation_matrix && data.correlation_features && (
        <Card className="p-6">
          <h3 className="mb-4 text-lg font-bold text-slate-100">特征相关性矩阵</h3>
          <div className="overflow-x-auto">
            <div className="inline-block min-w-full">
              <table className="w-full text-xs">
                <thead>
                  <tr>
                    <th className="px-2 py-1 text-left text-slate-400"></th>
                    {data.correlation_features.map((feat, idx) => (
                      <th
                        key={idx}
                        className="max-w-[80px] truncate px-2 py-1 text-left text-slate-400"
                        title={feat}
                      >
                        {feat}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.correlation_matrix.map((row, rowIdx) => {
                    const rowFeature = data.correlation_features?.[rowIdx] ?? "";
                    return (
                      <tr key={rowIdx}>
                        <td className="max-w-[80px] truncate px-2 py-1 font-medium text-slate-300" title={rowFeature}>
                          {rowFeature}
                        </td>
                        {row.map((value, colIdx) => {
                          const colFeature = data.correlation_features?.[colIdx] ?? "";
                          return (
                            <td key={colIdx} className="px-2 py-1">
                              <div
                                className={`${getCorrelationColor(value)} rounded px-1 text-center text-white`}
                                style={{ opacity: Math.abs(value) }}
                                title={`${rowFeature} vs ${colFeature}: ${value.toFixed(3)}`}
                              >
                                {value.toFixed(2)}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-400">
            <div className="mb-2">图例：</div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-red-500"></div>
                <span>强相关 (&gt;0.7)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-orange-500"></div>
                <span>中等相关 (0.5-0.7)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-yellow-500"></div>
                <span>弱相关 (0.3-0.5)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 rounded bg-green-500"></div>
                <span>低相关 (&lt;0.3)</span>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
