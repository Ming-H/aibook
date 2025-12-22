"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { authFetch } from "@/lib/auth";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";
import { FeatureAnalysisPanel } from "@/components/ui/FeatureAnalysisPanel";
import Link from "next/link";
import { executeWorkflow, type WorkflowState as ExecWorkflowState } from "@/lib/workflow-executor";

// 节点类型定义
type NodeType =
  | "data_upload"
  | "feature_analysis"
  | "feature_selection"
  | "algorithm_selection"
  | "model_training"
  | "model_evaluation"
  | "random_forest"
  | "svm"
  | "logistic_regression"
  | "linear_regression"
  | "gradient_boosting"
  | "knn";

interface Node {
  id: string;
  type: NodeType;
  x: number;
  y: number;
  config?: Record<string, unknown>;
  executionState?: "pending" | "running" | "success" | "error";
}

interface Connection {
  id: string;
  from: string;
  to: string;
}

interface WorkflowState {
  nodes: Node[];
  connections: Connection[];
}

// 功能模块定义
const MODULE_TYPES: Array<{
  type: NodeType;
  label: string;
  icon: string;
  description: string;
  color: string;
}> = [
    {
      type: "data_upload",
      label: "数据上传",
      icon: "📤",
      description: "上传 CSV 数据文件",
      color: "from-blue-500 to-cyan-500",
    },
    {
      type: "feature_analysis",
      label: "特征分析",
      icon: "📊",
      description: "分析数据特征统计信息",
      color: "from-purple-500 to-pink-500",
    },
    {
      type: "feature_selection",
      label: "特征选择",
      icon: "🎯",
      description: "选择重要特征",
      color: "from-green-500 to-emerald-500",
    },
    {
      type: "model_training",
      label: "模型训练",
      icon: "🚀",
      description: "训练机器学习模型",
      color: "from-indigo-500 to-purple-500",
    },
    {
      type: "model_evaluation",
      label: "模型评估",
      icon: "📈",
      description: "评估模型性能指标",
      color: "from-yellow-500 to-orange-500",
    },
  ];

// 算法定义
const ALGORITHM_TYPES: Array<{
  type: NodeType;
  label: string;
  icon: string;
  description: string;
  taskType: "classification" | "regression" | "both";
  parameters: Array<{
    name: string;
    label: string;
    type: "number" | "select" | "boolean";
    default: unknown;
    options?: Array<{ value: string; label: string }>;
    min?: number;
    max?: number;
  }>;
}> = [
    {
      type: "random_forest",
      label: "随机森林",
      icon: "🌲",
      description: "集成学习，适合大多数任务",
      taskType: "both",
      parameters: [
        { name: "n_estimators", label: "树的数量", type: "number", default: 100, min: 10, max: 500 },
        { name: "max_depth", label: "最大深度", type: "number", default: null, min: 1, max: 50 },
        { name: "min_samples_split", label: "最小分割样本数", type: "number", default: 2, min: 2, max: 20 },
      ],
    },
    {
      type: "svm",
      label: "支持向量机",
      icon: "⚡",
      description: "适合小样本、高维数据",
      taskType: "both",
      parameters: [
        {
          name: "kernel", label: "核函数", type: "select", default: "rbf", options: [
            { value: "rbf", label: "RBF" },
            { value: "linear", label: "线性" },
            { value: "poly", label: "多项式" },
            { value: "sigmoid", label: "Sigmoid" },
          ]
        },
        { name: "C", label: "正则化参数", type: "number", default: 1.0, min: 0.1, max: 100 },
      ],
    },
    {
      type: "logistic_regression",
      label: "逻辑回归",
      icon: "📉",
      description: "线性模型，解释性强",
      taskType: "classification",
      parameters: [
        { name: "max_iter", label: "最大迭代次数", type: "number", default: 1000, min: 100, max: 10000 },
        { name: "C", label: "正则化强度", type: "number", default: 1.0, min: 0.01, max: 100 },
      ],
    },
    {
      type: "linear_regression",
      label: "线性回归",
      icon: "📊",
      description: "简单快速，解释性强",
      taskType: "regression",
      parameters: [
        { name: "fit_intercept", label: "拟合截距", type: "boolean", default: true },
      ],
    },
    {
      type: "gradient_boosting",
      label: "梯度提升",
      icon: "📈",
      description: "强学习器，通常表现优秀",
      taskType: "both",
      parameters: [
        { name: "n_estimators", label: "估计器数量", type: "number", default: 100, min: 10, max: 500 },
        { name: "learning_rate", label: "学习率", type: "number", default: 0.1, min: 0.01, max: 1 },
        { name: "max_depth", label: "最大深度", type: "number", default: 3, min: 1, max: 20 },
      ],
    },
    {
      type: "knn",
      label: "K近邻",
      icon: "🎯",
      description: "简单直观，适合局部模式",
      taskType: "both",
      parameters: [
        { name: "n_neighbors", label: "邻居数量", type: "number", default: 5, min: 1, max: 50 },
        {
          name: "weights", label: "权重", type: "select", default: "uniform", options: [
            { value: "uniform", label: "均匀" },
            { value: "distance", label: "距离" },
          ]
        },
      ],
    },
  ];

export default function WorkflowPage() {
  const [workflow, setWorkflow] = useState<WorkflowState>({
    nodes: [],
    connections: [],
  });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [draggedModule, setDraggedModule] = useState<NodeType | null>(null);
  const [draggingNode, setDraggingNode] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [configDialog, setConfigDialog] = useState<string | null>(null);
  const [executionResult, setExecutionResult] = useState<unknown>(null);
  const [nodeExecutionStates, setNodeExecutionStates] = useState<Record<string, "pending" | "running" | "success" | "error">>({});
  const [contextMenu, setContextMenu] = useState<{ nodeId: string; x: number; y: number } | null>(null);
  const [fileInputRef, setFileInputRef] = useState<HTMLInputElement | null>(null);
  const [scale, setScale] = useState(1);
  const [csvColumns, setCsvColumns] = useState<string[]>([]);
  const [selectedFeatures, setSelectedFeatures] = useState<Record<string, boolean>>({});
  const [algorithmPanelExpanded, setAlgorithmPanelExpanded] = useState(false);
  const [rightPanelNode, setRightPanelNode] = useState<string | null>(null);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [saveName, setSaveName] = useState("");
  const [saveDescription, setSaveDescription] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  // 标记组件已挂载（hydration完成）
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 检查是否有导入的工作流（只在hydration完成后执行）
  useEffect(() => {
    // 只在客户端且hydration完成后执行
    if (!isMounted || typeof window === "undefined") return;

    const importWorkflow = localStorage.getItem("import_workflow");
    const importDatasetName = localStorage.getItem("import_dataset_name");

    if (importWorkflow) {
      try {
        const workflowData = JSON.parse(importWorkflow);
        if (workflowData.nodes && workflowData.connections) {
          // 重新生成节点ID，避免ID冲突
          const nodeIdMap = new Map<string, string>();
          const newNodes = workflowData.nodes.map((node: Node) => {
            const newId = generateId();
            nodeIdMap.set(node.id, newId);
            return {
              ...node,
              id: newId,
            };
          });

          const newConnections = workflowData.connections.map((conn: Connection) => ({
            ...conn,
            id: generateId(),
            from: nodeIdMap.get(conn.from) || conn.from,
            to: nodeIdMap.get(conn.to) || conn.to,
          }));

          setWorkflow({
            nodes: newNodes,
            connections: newConnections,
          });

          // 如果有数据集名称，显示在数据上传节点
          if (importDatasetName) {
            // 找到数据上传节点并设置提示
            const dataUploadNode = newNodes.find((n: Node) => n.type === "data_upload");
            if (dataUploadNode && dataUploadNode.config) {
              dataUploadNode.config.dataset_name = importDatasetName;
            }
          }

          // 延迟显示提示，确保UI已更新
          setTimeout(() => {
            alert("工作流已导入到画布，请上传数据文件后运行");
          }, 100);
        }
      } catch (error) {
        console.error("导入工作流失败:", error);
        alert("导入工作流失败，请重试");
      } finally {
        localStorage.removeItem("import_workflow");
        localStorage.removeItem("import_dataset_name");
      }
    }
  }, [isMounted]);

  // 生成唯一ID
  const generateId = () => `node-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // 处理从左侧拖拽模块
  const handleDragStart = (e: React.DragEvent, type: NodeType) => {
    setDraggedModule(type);
    e.dataTransfer.effectAllowed = "copy";
  };

  // 处理画布上的放置
  const handleCanvasDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (!draggedModule || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 检查是功能模块还是算法
    const module = MODULE_TYPES.find((m) => m.type === draggedModule);
    const algorithm = ALGORITHM_TYPES.find((a) => a.type === draggedModule);

    if (!module && !algorithm) return;

    const newNode: Node = {
      id: generateId(),
      type: draggedModule,
      x: Math.max(50, Math.min((x - 100) / scale, rect.width / scale - 200)),
      y: Math.max(50, Math.min((y - 50) / scale, rect.height / scale - 100)),
    };

    setWorkflow((prev) => ({
      ...prev,
      nodes: [...prev.nodes, newNode],
    }));

    setDraggedModule(null);
  };

  const handleCanvasDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  };

  // 处理节点拖拽
  const handleNodeDragStart = (e: React.MouseEvent, nodeId: string) => {
    setDraggingNode(nodeId);
    e.preventDefault();
  };

  const handleNodeDrag = useCallback(
    (e: MouseEvent) => {
      if (!draggingNode || !canvasRef.current) return;

      const rect = canvasRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node.id === draggingNode
            ? {
              ...node,
              x: Math.max(50, Math.min(x - 100, rect.width - 200)),
              y: Math.max(50, Math.min(y - 50, rect.height - 100)),
            }
            : node
        ),
      }));
    },
    [draggingNode]
  );

  const handleNodeDragEnd = () => {
    setDraggingNode(null);
  };

  useEffect(() => {
    if (draggingNode) {
      window.addEventListener("mousemove", handleNodeDrag);
      window.addEventListener("mouseup", handleNodeDragEnd);
      return () => {
        window.removeEventListener("mousemove", handleNodeDrag);
        window.removeEventListener("mouseup", handleNodeDragEnd);
      };
    }
  }, [draggingNode, handleNodeDrag]);

  // 点击外部关闭右键菜单
  useEffect(() => {
    const handleClickOutside = () => {
      if (contextMenu) {
        setContextMenu(null);
      }
    };
    if (contextMenu) {
      window.addEventListener("click", handleClickOutside);
      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }
  }, [contextMenu]);

  // 处理连线
  const handleNodeClick = (nodeId: string, e?: React.MouseEvent) => {
    // 如果点击的是连接点，不处理连接逻辑
    if (e && (e.target as HTMLElement).classList.contains("connection-point")) {
      return;
    }

    if (connectingFrom === null) {
      setConnectingFrom(nodeId);
    } else if (connectingFrom !== nodeId) {
      // 创建新连接
      const newConnection: Connection = {
        id: `conn-${Date.now()}`,
        from: connectingFrom,
        to: nodeId,
      };

      // 检查是否已存在相同连接
      const exists = workflow.connections.some(
        (conn) => conn.from === connectingFrom && conn.to === nodeId
      );

      if (!exists) {
        setWorkflow((prev) => ({
          ...prev,
          connections: [...prev.connections, newConnection],
        }));
      }

      setConnectingFrom(null);
    } else {
      setConnectingFrom(null);
    }
  };

  // 处理右键菜单
  const handleNodeRightClick = async (e: React.MouseEvent, nodeId: string) => {
    e.preventDefault();
    const node = workflow.nodes.find((n) => n.id === nodeId);
    if (!node) return;

    // 如果是特征选择节点，需要先获取CSV列名
    if (node.type === "feature_selection" && uploadedFile) {
      try {
        const form = new FormData();
        form.append("file", uploadedFile);
        const res = await authFetch(`${BACKEND_BASE}/api/v1/experiments/get-columns`, {
          method: "POST",
          body: form,
        });
        if (res.ok) {
          const data = await res.json();
          setCsvColumns(data.columns || []);
          // 初始化选中状态
          const initialSelection: Record<string, boolean> = {};
          data.columns.forEach((col: string) => {
            initialSelection[col] = node.config?.selected_features
              ? (node.config.selected_features as string[]).includes(col)
              : true;
          });
          setSelectedFeatures(initialSelection);
        }
      } catch (error) {
        console.error("获取列名失败:", error);
      }
    }

    setContextMenu({
      nodeId,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // 处理文件上传
  const handleFileUpload = (nodeId: string) => {
    if (fileInputRef) {
      fileInputRef.click();
    }
    setContextMenu(null);
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // 更新数据上传节点的配置
      setWorkflow((prev) => ({
        ...prev,
        nodes: prev.nodes.map((node) =>
          node.type === "data_upload"
            ? { ...node, config: { ...node.config, file: file.name } }
            : node
        ),
      }));
    }
  };

  // 删除节点
  const handleDeleteNode = (nodeId: string) => {
    setWorkflow((prev) => ({
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      connections: prev.connections.filter(
        (c) => c.from !== nodeId && c.to !== nodeId
      ),
    }));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  // 删除连接
  const handleDeleteConnection = (connId: string) => {
    setWorkflow((prev) => ({
      ...prev,
      connections: prev.connections.filter((c) => c.id !== connId),
    }));
  };

  // 获取节点位置（用于绘制连线）- n8n风格：连接点在节点边缘中心
  const getNodePosition = (nodeId: string, isOutput: boolean = true) => {
    const node = workflow.nodes.find((n) => n.id === nodeId);
    if (!node) return { x: 0, y: 0 };
    // n8n风格：输出点在右侧边缘中心，输入点在左侧边缘中心
    const nodeWidth = 200 * scale;
    const nodeHeight = 100 * scale; // 估算节点高度
    return {
      x: (node.x * scale) + (isOutput ? nodeWidth : 0),
      y: (node.y * scale) + (nodeHeight / 2),
    };
  };

  // 处理缩放
  const handleZoom = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(2, prev + delta)));
  };

  // 处理滚轮缩放
  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      handleZoom(delta);
    }
  };

  // 更新节点配置
  const handleUpdateNodeConfig = (nodeId: string, config: Record<string, unknown>) => {
    setWorkflow((prev) => ({
      ...prev,
      nodes: prev.nodes.map((node) =>
        node.id === nodeId ? { ...node, config: { ...node.config, ...config } } : node
      ),
    }));
    setConfigDialog(null);
  };

  // 运行工作流
  const handleRunWorkflow = async () => {
    if (workflow.nodes.length === 0) {
      alert("请先添加至少一个节点到画布");
      return;
    }

    // 检查是否有数据上传节点
    const hasDataUpload = workflow.nodes.some((n) => n.type === "data_upload");
    if (hasDataUpload && !uploadedFile) {
      alert('请先右键点击"数据上传"节点上传数据文件');
      return;
    }

    setRunning(true);
    setExecutionResult(null);

    try {
      const execWorkflow: ExecWorkflowState = {
        nodes: workflow.nodes.map((n) => ({
          id: n.id,
          type: n.type,
          x: n.x,
          y: n.y,
          config: n.config,
        })),
        connections: workflow.connections,
      };

      // 重置所有节点状态
      setNodeExecutionStates({});
      workflow.nodes.forEach((node) => {
        setNodeExecutionStates((prev) => ({ ...prev, [node.id]: "pending" }));
      });

      const result = await executeWorkflow(
        execWorkflow,
        uploadedFile || undefined,
        (nodeId, state) => {
          setNodeExecutionStates((prev) => ({ ...prev, [nodeId]: state }));
        }
      );
      setExecutionResult(result);

      if (result.success) {
        alert("工作流执行成功！");
        // 执行成功后，可以选择保存结果
        if (confirm("工作流执行成功！是否保存结果？")) {
          setShowSaveDialog(true);
        }
      } else {
        alert(`工作流执行失败: ${result.error}`);
      }
    } catch (error) {
      alert(`执行错误: ${error instanceof Error ? error.message : "未知错误"}`);
    } finally {
      setRunning(false);
    }
  };

  const handleSaveWorkflow = async () => {
    if (!saveName.trim()) {
      alert("请输入工作流名称");
      return;
    }

    try {
      // 提取实验结果（从模型训练和模型评估节点）
      const trainingNode = workflow.nodes.find((n) => n.type === "model_training");
      const evaluationNode = workflow.nodes.find((n) => n.type === "model_evaluation");

      let experimentResults = null;
      if (executionResult && typeof executionResult === "object" && "results" in executionResult) {
        const results = (executionResult as { results: Record<string, unknown> }).results;
        // 优先使用评估结果，如果没有则使用训练结果
        if (evaluationNode && results[evaluationNode.id]) {
          experimentResults = results[evaluationNode.id];
        } else if (trainingNode && results[trainingNode.id]) {
          experimentResults = results[trainingNode.id];
        }
      }

      const saveData = {
        name: saveName,
        description: saveDescription || undefined,
        workflow_config: {
          nodes: workflow.nodes,
          connections: workflow.connections,
        },
        execution_results: executionResult || undefined,
        experiment_results: experimentResults || undefined,
      };

      const res = await authFetch(`${BACKEND_BASE}/api/v1/workflows/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(saveData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail ?? "保存失败");
      }

      // 如果实验结果存在，尝试从实验结果中提取实验ID并更新名称
      // 实验结果可能包含 experiment 对象，其中可能有数据库ID
      if (experimentResults && typeof experimentResults === "object") {
        let experimentId: number | null = null;

        // 尝试从不同位置获取实验ID
        if ("id" in experimentResults) {
          experimentId = (experimentResults as { id: number }).id;
        } else if ("experiment" in experimentResults && typeof experimentResults.experiment === "object") {
          const exp = experimentResults.experiment as Record<string, unknown>;
          if ("id" in exp) {
            experimentId = exp.id as number;
          }
        }

        // 如果找到了实验ID，尝试更新名称
        if (experimentId) {
          try {
            await authFetch(`${BACKEND_BASE}/api/v1/experiments/${experimentId}/name`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: saveName }),
            });
          } catch (error) {
            // 更新实验名称失败不影响工作流保存
            console.error("更新实验名称失败:", error);
          }
        }
      }

      alert("工作流保存成功！");
      setShowSaveDialog(false);
      setSaveName("");
      setSaveDescription("");
    } catch (error) {
      alert(`保存失败: ${error instanceof Error ? error.message : "未知错误"}`);
    }
  };

  // 在hydration完成前，不渲染动态内容
  // 使用 suppressHydrationWarning 来避免 hydration 警告
  // 在hydration完成前，不渲染动态内容

  // 在 hydration 完成前，返回一个简单的加载状态，不包含任何按钮
  if (!isMounted) {
    return (
      <div className="flex h-[calc(100vh-120px)] flex-col bg-slate-950">
        <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-100">可视化工作流编辑器</h1>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="text-slate-400">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-[calc(100vh-120px)] flex-col bg-slate-950">
      {/* 顶部工具栏 */}
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 px-6 py-4">
        <div className="flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              ← 返回首页
            </Button>
          </Link>
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-slate-100">可视化工作流编辑器</h1>
            <Link href="/workflows">
              <Button variant="ghost" size="sm">
                📚 历史工作流
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (confirm("确定要清空画布吗？")) {
                setWorkflow({ nodes: [], connections: [] });
                setSelectedNode(null);
              }
            }}
          >
            清空画布
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              if (executionResult) {
                setShowSaveDialog(true);
              } else {
                alert("请先运行工作流");
              }
            }}
          >
            💾 保存结果
          </Button>
          <Button onClick={handleRunWorkflow} disabled={running} size="lg">
            {running ? "运行中..." : "▶ 运行工作流"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* 左侧功能模块栏 */}
        <div className="w-64 border-r border-slate-800 bg-slate-900/30 overflow-y-auto">
          <div className="p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              功能模块
            </h2>

            <div className="space-y-2">
              {MODULE_TYPES.map((module) => (
                <div
                  key={module.type}
                  draggable
                  onDragStart={(e) => handleDragStart(e, module.type)}
                  className="cursor-move rounded-lg border border-slate-700 bg-slate-800/50 p-3 transition-all hover:border-slate-600 hover:bg-slate-800"
                >
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xl">{module.icon}</span>
                    <span className="font-semibold text-slate-200">{module.label}</span>
                  </div>
                  <p className="text-xs text-slate-400">{module.description}</p>
                </div>
              ))}

              {/* 算法选择 - 折叠样式 */}
              <div className="mt-4 rounded-lg border border-slate-700 bg-slate-800/50 overflow-hidden">
                <button
                  onClick={() => setAlgorithmPanelExpanded(!algorithmPanelExpanded)}
                  className="w-full flex items-center justify-between p-3 hover:bg-slate-800 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xl">⚙️</span>
                    <span className="font-semibold text-slate-200">算法选择</span>
                  </div>
                  <span className={`text-slate-400 transition-transform ${algorithmPanelExpanded ? "rotate-180" : ""}`}>
                    ▼
                  </span>
                </button>
                {algorithmPanelExpanded && (
                  <div className="border-t border-slate-700 p-2 space-y-1">
                    {ALGORITHM_TYPES.map((alg) => (
                      <div
                        key={alg.type}
                        draggable
                        onDragStart={(e) => {
                          e.stopPropagation();
                          handleDragStart(e, alg.type);
                        }}
                        onContextMenu={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setRightPanelNode(alg.type);
                        }}
                        className="cursor-move rounded border border-slate-600 bg-slate-700/30 p-2 transition-all hover:border-slate-500 hover:bg-slate-700/50"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{alg.icon}</span>
                          <span className="text-sm font-medium text-slate-200">{alg.label}</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{alg.description}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 右侧画布 */}
        <div className="relative flex-1 overflow-hidden bg-slate-950">
          <div
            ref={canvasRef}
            onDrop={handleCanvasDrop}
            onDragOver={handleCanvasDragOver}
            onWheel={handleWheel}
            onClick={() => {
              setContextMenu(null);
              setConnectingFrom(null);
            }}
            className="relative h-full w-full overflow-auto"
            style={{
              backgroundImage: "radial-gradient(circle, #334155 1px, transparent 1px)",
              backgroundSize: `${20 * scale}px ${20 * scale}px`,
            }}
          >
            {/* 缩放控制按钮 */}
            <div className="absolute left-4 bottom-4 z-20 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/90 p-1 shadow-lg">
              <button
                onClick={() => handleZoom(-0.1)}
                className="rounded px-2 py-1 text-sm text-slate-200 hover:bg-slate-700 font-mono"
                title="缩小 (Ctrl + 滚轮下)"
              >
                Q-
              </button>
              <div className="text-center text-xs text-slate-400 px-2 min-w-[50px]">
                {Math.round(scale * 100)}%
              </div>
              <button
                onClick={() => handleZoom(0.1)}
                className="rounded px-2 py-1 text-sm text-slate-200 hover:bg-slate-700 font-mono"
                title="放大 (Ctrl + 滚轮上)"
              >
                Q+
              </button>
              <div className="h-4 w-px bg-slate-700 mx-1" />
              <button
                onClick={() => setScale(1)}
                className="rounded px-2 py-1 text-xs text-slate-400 hover:bg-slate-700 hover:text-slate-200"
                title="重置缩放"
              >
                重置
              </button>
            </div>
            {/* SVG 用于绘制连线 - n8n风格 */}
            <svg
              ref={svgRef}
              className="pointer-events-none absolute inset-0 h-full w-full"
              style={{ zIndex: 1 }}
            >
              <defs>
                {/* 箭头标记 - n8n风格：小三角形箭头 */}
                <marker
                  id="arrowhead"
                  markerWidth="6"
                  markerHeight="6"
                  refX="5"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 6 3 L 0 6 Z" fill="#6b7280" />
                </marker>
                {/* 删除按钮标记 */}
                <circle id="deleteDot" r="4" fill="#ef4444" />
              </defs>
              {isMounted && workflow.connections.map((conn) => {
                const fromPos = getNodePosition(conn.from, true);
                const toPos = getNodePosition(conn.to, false);
                const midX = (fromPos.x + toPos.x) / 2;
                const midY = (fromPos.y + toPos.y) / 2;

                return (
                  <g key={conn.id}>
                    {/* 主连接线 - n8n风格：直线，细灰色 */}
                    <line
                      x1={fromPos.x}
                      y1={fromPos.y}
                      x2={toPos.x}
                      y2={toPos.y}
                      stroke="#9ca3af"
                      strokeWidth="1.5"
                      fill="none"
                      markerEnd="url(#arrowhead)"
                      className="pointer-events-auto"
                    />
                    {/* 删除按钮 - 悬停时显示 */}
                    <g
                      className="pointer-events-auto cursor-pointer opacity-0 hover:opacity-100 transition-opacity"
                      onClick={() => handleDeleteConnection(conn.id)}
                    >
                      <circle
                        cx={midX}
                        cy={midY}
                        r="6"
                        fill="#ef4444"
                        stroke="#fff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={midX}
                        y={midY}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none text-[9px] fill-white font-semibold"
                      >
                        ×
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>

            {/* 节点 */}
            {isMounted && workflow.nodes.map((node) => {
              const module = MODULE_TYPES.find((m) => m.type === node.type);
              const algorithm = ALGORITHM_TYPES.find((a) => a.type === node.type);
              const displayInfo = module || algorithm;
              if (!displayInfo) return null;

              const isSelected = selectedNode === node.id;
              const isConnecting = connectingFrom === node.id;
              const executionState = nodeExecutionStates[node.id];

              // 根据执行状态设置边框颜色
              let borderColor = "border-slate-700";
              let shadowColor = "";
              if (executionState === "running") {
                borderColor = "border-green-400";
                shadowColor = "shadow-green-500/50";
              } else if (executionState === "success") {
                borderColor = "border-blue-400";
                shadowColor = "shadow-blue-500/50";
              } else if (executionState === "error") {
                borderColor = "border-red-400";
                shadowColor = "shadow-red-500/50";
              } else if (isSelected) {
                borderColor = "border-blue-400";
                shadowColor = "shadow-blue-500/50";
              } else if (isConnecting) {
                borderColor = "border-green-400";
                shadowColor = "shadow-green-500/50";
              }

              return (
                <div
                  key={node.id}
                  className={`absolute cursor-move rounded-lg border-2 p-4 shadow-lg transition-all ${borderColor} ${shadowColor} ${executionState === "running" ? "animate-pulse" : ""}`}
                  style={{
                    left: `${node.x * scale}px`,
                    top: `${node.y * scale}px`,
                    width: `${200 * scale}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    zIndex: isSelected ? 10 : 2,
                  }}
                  onMouseDown={(e) => handleNodeDragStart(e, node.id)}
                  onClick={(e) => {
                    if (connectingFrom) {
                      handleNodeClick(node.id, e);
                    } else {
                      setSelectedNode(node.id);
                    }
                  }}
                  onContextMenu={(e) => handleNodeRightClick(e, node.id)}
                  onDoubleClick={() => {
                    // 双击打开配置
                    if (node.type === "model_training" || node.type === "algorithm_selection") {
                      setConfigDialog(node.id);
                    }
                  }}
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{displayInfo.icon}</span>
                      <span className="font-semibold text-slate-200">{displayInfo.label}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteNode(node.id);
                      }}
                      className="text-red-400 hover:text-red-300"
                    >
                      ×
                    </button>
                  </div>

                  {/* 连接点 */}
                  <div className="relative mb-2 flex items-center justify-between">
                    {/* 输入连接点（左侧） */}
                    <div
                      className="connection-point h-4 w-4 cursor-pointer rounded-full border-2 border-blue-400 bg-blue-500/20 hover:bg-blue-500/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (connectingFrom && connectingFrom !== node.id) {
                          handleNodeClick(node.id, e);
                        }
                      }}
                      title="点击连接输入"
                    />

                    {/* 文件信息显示（仅数据上传节点） */}
                    {node.type === "data_upload" && uploadedFile && (
                      <div className="flex-1 px-2 text-xs text-slate-400">
                        {uploadedFile.name}
                      </div>
                    )}

                    {/* 输出连接点（右侧） */}
                    <div
                      className="connection-point h-4 w-4 cursor-pointer rounded-full border-2 border-green-400 bg-green-500/20 hover:bg-green-500/40"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!connectingFrom) {
                          setConnectingFrom(node.id);
                        }
                      }}
                      title="点击开始连接"
                    />
                  </div>

                  <div className="h-1 w-full rounded-full bg-gradient-to-r opacity-50" />
                  {isConnecting && (
                    <div className="mt-2 text-xs text-green-400">点击目标节点的输入点完成连接</div>
                  )}
                  {node.type === "data_upload" && !uploadedFile && (
                    <div className="mt-2 text-xs text-slate-500">
                      {node.config?.dataset_name ? `数据集: ${node.config.dataset_name}` : "右键点击上传文件"}
                    </div>
                  )}
                  {node.type === "feature_analysis" && executionResult && typeof executionResult === "object" && "results" in executionResult && (executionResult as { results: Record<string, unknown> }).results[node.id] ? (
                    <div className="mt-2 text-xs text-slate-400">
                      ✅ 分析完成 - 右键查看结果
                    </div>
                  ) : null}
                  {node.type === "model_evaluation" && node.config && (
                    <div className="mt-2 text-xs text-slate-400">
                      已配置评估选项
                    </div>
                  )}
                  {/* 执行状态指示 */}
                  {executionState && (
                    <div className="mt-2 flex items-center gap-2 text-xs">
                      {executionState === "running" && (
                        <>
                          <div className="h-2 w-2 animate-pulse rounded-full bg-green-400"></div>
                          <span className="text-green-400">执行中...</span>
                        </>
                      )}
                      {executionState === "success" && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
                          <span className="text-blue-400">已完成</span>
                        </>
                      )}
                      {executionState === "error" && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-red-400"></div>
                          <span className="text-red-400">执行失败</span>
                        </>
                      )}
                      {executionState === "pending" && running && (
                        <>
                          <div className="h-2 w-2 rounded-full bg-slate-500"></div>
                          <span className="text-slate-400">等待中</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* 空画布提示 */}
            {isMounted && workflow.nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <p className="mb-2 text-lg">从左侧拖拽功能模块到此处</p>
                  <p className="text-sm">点击节点的连接点可以连接数据流</p>
                  <p className="mt-1 text-xs">右键"数据上传"节点可上传文件</p>
                </div>
              </div>
            )}
            {!isMounted && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-slate-500">
                  <p className="mb-2 text-lg">加载中...</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 右侧参数配置面板 */}
        {isMounted && rightPanelNode && (() => {
          const node = workflow.nodes.find((n) => n.id === rightPanelNode);
          const algorithmType = node?.type || rightPanelNode;
          const isAlgorithmType = ALGORITHM_TYPES.some(a => a.type === algorithmType);

          // 检查是否是特征分析节点且有执行结果
          if (node?.type === "feature_analysis" && executionResult && typeof executionResult === "object" && "results" in executionResult) {
            const results = (executionResult as { results: Record<string, unknown> }).results;
            const analysisResult = results[node.id];
            if (analysisResult && typeof analysisResult === "object" && "n_features" in analysisResult) {
              return (
                <div className="w-96 border-l border-slate-800 bg-slate-900/50 flex flex-col overflow-y-auto">
                  <div className="p-4 border-b border-slate-800">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-bold text-slate-100">特征分析结果</h3>
                      <button
                        onClick={() => setRightPanelNode(null)}
                        className="text-slate-400 hover:text-slate-200"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto p-4">
                    <FeatureAnalysisPanel data={analysisResult as Parameters<typeof FeatureAnalysisPanel>[0]["data"]} />
                  </div>
                </div>
              );
            }
          }

          if (isAlgorithmType) {
            return (
              <AlgorithmConfigPanel
                nodeId={rightPanelNode}
                node={node || { type: algorithmType as NodeType, id: rightPanelNode, x: 0, y: 0 }}
                onSave={(config) => {
                  if (node) {
                    handleUpdateNodeConfig(rightPanelNode, config);
                  }
                }}
                onClose={() => setRightPanelNode(null)}
              />
            );
          }
          return null;
        })()}
      </div>

      {/* 底部状态栏 */}
      <div className="border-t border-slate-800 bg-slate-900/50 px-6 py-2">
        <div className="flex items-center justify-between text-sm text-slate-400">
          <div>
            {isMounted ? (
              connectingFrom ? (
                <span className="text-green-400">正在连接：点击目标节点完成连接</span>
              ) : (
                <span>节点数: {workflow.nodes.length} | 连接数: {workflow.connections.length}</span>
              )
            ) : (
              <span>加载中...</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span>提示：点击节点的输出点（绿色）开始连接，点击目标节点的输入点（蓝色）完成连接 | 右键节点可进行配置</span>
          </div>
        </div>
      </div>

      {/* 节点配置对话框 */}
      {isMounted && configDialog && (
        <NodeConfigDialog
          nodeId={configDialog}
          node={workflow.nodes.find((n) => n.id === configDialog)}
          workflow={workflow}
          onSave={(config) => {
            handleUpdateNodeConfig(configDialog, config);
          }}
          onClose={() => setConfigDialog(null)}
        />
      )}

      {/* 保存对话框 */}
      {isMounted && showSaveDialog && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setShowSaveDialog(false)}
        >
          <Card
            className="w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h2 className="mb-4 text-xl font-semibold text-slate-100">保存工作流结果</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    工作流名称 <span className="text-red-400">*</span>
                  </label>
                  <Input
                    type="text"
                    value={saveName}
                    onChange={(e) => setSaveName(e.target.value)}
                    placeholder="请输入工作流名称"
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-200 mb-2">
                    描述（可选）
                  </label>
                  <textarea
                    value={saveDescription}
                    onChange={(e) => setSaveDescription(e.target.value)}
                    placeholder="请输入工作流描述"
                    rows={3}
                    className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-3 text-sm text-slate-400">
                  <div>将保存以下内容：</div>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>工作流配置（节点和连接）</li>
                    <li>执行结果</li>
                    {executionResult && typeof executionResult === "object" && "results" in executionResult ? (
                      <li>实验结果</li>
                    ) : null}
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowSaveDialog(false);
                    setSaveName("");
                    setSaveDescription("");
                  }}
                  className="flex-1"
                >
                  取消
                </Button>
                <Button
                  onClick={handleSaveWorkflow}
                  className="flex-1"
                  disabled={!saveName.trim()}
                >
                  保存
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* 右键菜单 */}
      {isMounted && contextMenu && (() => {
        const node = workflow.nodes.find((n) => n.id === contextMenu.nodeId);
        if (!node) return null;

        return (
          <div
            className="fixed z-50 rounded-lg border border-slate-700 bg-slate-800 shadow-xl"
            style={{
              left: `${contextMenu.x}px`,
              top: `${contextMenu.y}px`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-1">
              {/* 数据上传节点 */}
              {node.type === "data_upload" && (
                <>
                  <button
                    onClick={() => handleFileUpload(contextMenu.nodeId)}
                    className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                  >
                    📁 上传 CSV 文件
                  </button>
                  {uploadedFile && (
                    <button
                      onClick={() => {
                        setUploadedFile(null);
                        setContextMenu(null);
                      }}
                      className="w-full rounded px-4 py-2 text-left text-sm text-red-400 hover:bg-slate-700"
                    >
                      🗑️ 清除文件
                    </button>
                  )}
                </>
              )}

              {/* 特征选择节点 */}
              {node.type === "feature_selection" && (
                <FeatureSelectionMenu
                  nodeId={contextMenu.nodeId}
                  columns={csvColumns}
                  selectedFeatures={selectedFeatures}
                  onFeaturesChange={(features) => {
                    setSelectedFeatures(features);
                    handleUpdateNodeConfig(contextMenu.nodeId, {
                      selected_features: Object.keys(features).filter((k) => features[k]),
                    });
                  }}
                  onClose={() => setContextMenu(null)}
                />
              )}

              {/* 算法节点 - 显示在右侧面板 */}
              {(node.type === "random_forest" ||
                node.type === "svm" ||
                node.type === "logistic_regression" ||
                node.type === "linear_regression" ||
                node.type === "gradient_boosting" ||
                node.type === "knn") && (
                  <button
                    onClick={() => {
                      setRightPanelNode(contextMenu.nodeId);
                      setContextMenu(null);
                    }}
                    className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                  >
                    ⚙️ 配置参数
                  </button>
                )}

              {/* 模型训练节点 */}
              {node.type === "model_training" && (
                <button
                  onClick={() => {
                    setConfigDialog(contextMenu.nodeId);
                    setContextMenu(null);
                  }}
                  className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                >
                  ⚙️ 配置训练参数
                </button>
              )}

              {/* 特征分析节点 */}
              {node.type === "feature_analysis" && (
                <>
                  <button
                    onClick={() => {
                      // 打开特征分析设置
                      setConfigDialog(contextMenu.nodeId);
                      setContextMenu(null);
                    }}
                    className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                  >
                    ⚙️ 设置
                  </button>
                  {executionResult && typeof executionResult === "object" && "results" in executionResult && (executionResult as { results: Record<string, unknown> }).results[contextMenu.nodeId] && (
                    <button
                      onClick={() => {
                        // 查看特征分析结果
                        setRightPanelNode(contextMenu.nodeId);
                        setContextMenu(null);
                      }}
                      className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                    >
                      📊 查看分析结果
                    </button>
                  )}
                </>
              )}

              {/* 模型评估节点 */}
              {node.type === "model_evaluation" && (
                <button
                  onClick={() => {
                    // 打开模型评估设置
                    setConfigDialog(contextMenu.nodeId);
                    setContextMenu(null);
                  }}
                  className="w-full rounded px-4 py-2 text-left text-sm text-slate-200 hover:bg-slate-700"
                >
                  ⚙️ 设置
                </button>
              )}
            </div>
          </div>
        );
      })()}

      {/* 隐藏的文件输入 */}
      <input
        ref={(el) => setFileInputRef(el)}
        type="file"
        accept=".csv"
        className="hidden"
        onChange={handleFileSelect}
      />
    </div>
  );
}

// 特征选择菜单组件
function FeatureSelectionMenu({
  nodeId,
  columns,
  selectedFeatures,
  onFeaturesChange,
  onClose,
}: {
  nodeId: string;
  columns: string[];
  selectedFeatures: Record<string, boolean>;
  onFeaturesChange: (features: Record<string, boolean>) => void;
  onClose: () => void;
}) {
  const [localSelection, setLocalSelection] = useState(selectedFeatures);

  const handleToggle = (feature: string) => {
    setLocalSelection((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  const handleSelectAll = () => {
    const allSelected: Record<string, boolean> = {};
    columns.forEach((col) => {
      allSelected[col] = true;
    });
    setLocalSelection(allSelected);
  };

  const handleDeselectAll = () => {
    const noneSelected: Record<string, boolean> = {};
    columns.forEach((col) => {
      noneSelected[col] = false;
    });
    setLocalSelection(noneSelected);
  };

  return (
    <div className="w-80 max-h-96 overflow-hidden flex flex-col">
      <div className="p-3 border-b border-slate-700">
        <h3 className="text-sm font-semibold text-slate-200 mb-2">选择特征</h3>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            className="text-xs px-2 py-1 rounded bg-blue-600/20 text-blue-400 hover:bg-blue-600/30"
          >
            全选
          </button>
          <button
            onClick={handleDeselectAll}
            className="text-xs px-2 py-1 rounded bg-slate-700 text-slate-300 hover:bg-slate-600"
          >
            全不选
          </button>
        </div>
      </div>
      <div className="overflow-y-auto p-2 max-h-64">
        {columns.length === 0 ? (
          <div className="text-sm text-slate-400 p-4 text-center">
            请先上传数据文件
          </div>
        ) : (
          <div className="space-y-1">
            {columns.map((col) => (
              <label
                key={col}
                className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-slate-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={localSelection[col] || false}
                  onChange={() => handleToggle(col)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-200 flex-1">{col}</span>
              </label>
            ))}
          </div>
        )}
      </div>
      <div className="p-3 border-t border-slate-700 flex gap-2">
        <button
          onClick={() => {
            onFeaturesChange(localSelection);
            onClose();
          }}
          className="flex-1 rounded px-3 py-1.5 text-sm bg-blue-600 text-white hover:bg-blue-500"
        >
          确定
        </button>
        <button
          onClick={onClose}
          className="px-3 py-1.5 text-sm text-slate-400 hover:text-slate-200"
        >
          取消
        </button>
      </div>
    </div>
  );
}

// 节点配置对话框组件
function NodeConfigDialog({
  nodeId,
  node,
  workflow,
  onSave,
  onClose,
}: {
  nodeId: string;
  node: Node | undefined;
  workflow?: WorkflowState;
  onSave: (config: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [targetColumn, setTargetColumn] = useState(() => {
    if (typeof window === "undefined") return "";
    return (node?.config?.target_column as string) || "";
  });
  const [taskType, setTaskType] = useState<"classification" | "regression">(() => {
    if (typeof window === "undefined") return "classification";
    return (node?.config?.task_type as "classification" | "regression") || "classification";
  });

  // 初始化算法：优先从节点配置获取，如果没有则尝试从连接的算法节点获取
  const getInitialAlgorithm = (): string => {
    // 首先从节点配置获取
    if (node?.config?.algorithm) {
      return node.config.algorithm as string;
    }

    // 如果没有配置，尝试从连接的算法节点获取
    if (workflow && node) {
      const inputConnections = workflow.connections.filter((c) => c.to === node.id);
      for (const conn of inputConnections) {
        const fromNode = workflow.nodes.find((n) => n.id === conn.from);
        if (fromNode && (
          fromNode.type === "random_forest" ||
          fromNode.type === "svm" ||
          fromNode.type === "logistic_regression" ||
          fromNode.type === "linear_regression" ||
          fromNode.type === "gradient_boosting" ||
          fromNode.type === "knn"
        )) {
          return fromNode.type;
        }
      }
    }

    return "random_forest";
  };

  const [algorithm, setAlgorithm] = useState(() => {
    // 使用函数初始化，避免在 SSR 时执行
    if (typeof window === "undefined") return "random_forest";
    return getInitialAlgorithm();
  });

  if (!node) return null;

  // 只在客户端挂载后渲染内容
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
        <Card className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-slate-400">加载中...</div>
        </Card>
      </div>
    );
  }

  const algorithms = {
    classification: [
      { value: "random_forest", label: "随机森林" },
      { value: "svm", label: "支持向量机" },
      { value: "logistic_regression", label: "逻辑回归" },
      { value: "gradient_boosting", label: "梯度提升" },
      { value: "knn", label: "K近邻" },
    ],
    regression: [
      { value: "random_forest", label: "随机森林" },
      { value: "svm", label: "支持向量机" },
      { value: "linear_regression", label: "线性回归" },
      { value: "gradient_boosting", label: "梯度提升" },
      { value: "knn", label: "K近邻" },
    ],
  };

  // 只在客户端挂载后渲染内容
  if (!mounted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
        <Card className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
          <div className="text-slate-400">加载中...</div>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <Card className="w-full max-w-md p-6" onClick={(e) => e.stopPropagation()}>
        <h3 className="mb-4 text-xl font-bold text-slate-100">配置节点</h3>
        {node.type === "model_training" && (
          <div className="space-y-4">
            <Input
              label="目标列（标签列）"
              value={targetColumn}
              onChange={(e) => setTargetColumn(e.target.value)}
              placeholder="例如：survived"
            />
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">任务类型</label>
              <div className="flex gap-3">
                <Button
                  variant={taskType === "classification" ? "primary" : "outline"}
                  size="md"
                  onClick={() => setTaskType("classification")}
                  className="flex-1"
                >
                  分类
                </Button>
                <Button
                  variant={taskType === "regression" ? "primary" : "outline"}
                  size="md"
                  onClick={() => setTaskType("regression")}
                  className="flex-1"
                >
                  回归
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-200">
                算法选择
                <span className="ml-2 text-xs text-slate-400">
                  (如果已连接算法节点，将自动使用该算法)
                </span>
              </label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                {algorithms[taskType].map((alg) => (
                  <option key={alg.value} value={alg.value}>
                    {alg.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
        {node.type === "feature_analysis" && (
          <div className="space-y-4">
            <p className="text-sm text-slate-400">
              特征分析将自动分析数据集的统计信息，包括缺失值、分布、相关性等。
            </p>
            <div className="rounded-lg bg-slate-800/50 p-3">
              <p className="text-xs text-slate-300">
                💡 提示：将特征分析节点连接到数据上传节点后运行工作流即可查看分析结果。
              </p>
            </div>
          </div>
        )}
        {node.type === "model_evaluation" && (
          <ModelEvaluationConfig
            node={node}
            onSave={(config) => {
              onSave(config);
              onClose();
            }}
          />
        )}
        {node.type !== "model_evaluation" && (
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={onClose}>
              取消
            </Button>
            <Button
              onClick={() => {
                if (node.type === "model_training") {
                  onSave({
                    target_column: targetColumn,
                    task_type: taskType,
                    algorithm: algorithm, // 保存算法选择
                  });
                  onClose();
                }
              }}
            >
              保存
            </Button>
          </div>
        )}
      </Card>
    </div>
  );
}

// 算法参数配置面板组件
function AlgorithmConfigPanel({
  nodeId,
  node,
  onSave,
  onClose,
}: {
  nodeId: string;
  node: Node | { type: NodeType } | null;
  onSave: (config: Record<string, unknown>) => void;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!node) return null;

  const algorithmType = node.type;
  const algorithm = ALGORITHM_TYPES.find((a) => a.type === algorithmType);

  if (!algorithm) {
    // 只在客户端挂载后渲染内容
    if (!mounted) {
      return (
        <div className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col">
          <div className="p-4 border-b border-slate-800">
            <div className="text-slate-400">加载中...</div>
          </div>
        </div>
      );
    }
    return null;
  }

  // 只在客户端挂载后渲染内容
  if (!mounted) {
    return (
      <div className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col">
        <div className="p-4 border-b border-slate-800">
          <div className="text-slate-400">加载中...</div>
        </div>
      </div>
    );
  }

  const [params, setParams] = useState<Record<string, unknown>>(() => {
    if (typeof window === "undefined") return {};
    const nodeConfig = (node as Node).config;
    if (nodeConfig?.parameters) {
      return nodeConfig.parameters as Record<string, unknown>;
    }
    const defaultParams: Record<string, unknown> = {};
    algorithm.parameters.forEach((p) => {
      defaultParams[p.name] = p.default;
    });
    return defaultParams;
  });

  const handleParamChange = (name: string, value: unknown) => {
    setParams((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="w-80 border-l border-slate-800 bg-slate-900/50 flex flex-col">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{algorithm.icon}</span>
            <h3 className="text-lg font-bold text-slate-100">{algorithm.label}</h3>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="!p-1 !min-w-0 w-6 h-6 text-slate-400 hover:text-slate-200"
          >
            ×
          </Button>
        </div>
        <p className="text-xs text-slate-400 mt-1">{algorithm.description}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {algorithm.parameters.map((param) => (
          <div key={param.name} className="space-y-2">
            <label className="block text-sm font-medium text-slate-200">
              {param.label}
            </label>
            {param.type === "number" && (
              <input
                type="number"
                value={params[param.name] as number ?? param.default as number}
                onChange={(e) => {
                  const val = param.name === "max_depth" && e.target.value === ""
                    ? null
                    : Number(e.target.value);
                  handleParamChange(param.name, val);
                }}
                min={param.min}
                max={param.max}
                placeholder={param.name === "max_depth" ? "无限制" : undefined}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              />
            )}
            {param.type === "select" && (
              <select
                value={params[param.name] as string ?? param.default as string}
                onChange={(e) => handleParamChange(param.name, e.target.value)}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
              >
                {param.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            )}
            {param.type === "boolean" && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={params[param.name] as boolean ?? param.default as boolean}
                  onChange={(e) => handleParamChange(param.name, e.target.checked)}
                  className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-300">
                  {params[param.name] ? "是" : "否"}
                </span>
              </label>
            )}
          </div>
        ))}
      </div>

      <div className="p-4 border-t border-slate-800 flex gap-2">
        <Button
          variant="outline"
          onClick={onClose}
          className="flex-1"
        >
          取消
        </Button>
        <Button
          onClick={() => {
            onSave({ parameters: params });
            onClose();
          }}
          className="flex-1"
        >
          保存
        </Button>
      </div>
    </div>
  );
}

// 模型评估配置组件
function ModelEvaluationConfig({
  node,
  onSave,
}: {
  node: Node;
  onSave: (config: Record<string, unknown>) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [includeConfusionMatrix, setIncludeConfusionMatrix] = useState(
    (node.config?.include_confusion_matrix as boolean) ?? true
  );
  const [includeClassificationReport, setIncludeClassificationReport] = useState(
    (node.config?.include_classification_report as boolean) ?? true
  );
  const [includeRocCurve, setIncludeRocCurve] = useState(
    (node.config?.include_roc_curve as boolean) ?? false
  );
  const [includePrecisionRecallCurve, setIncludePrecisionRecallCurve] = useState(
    (node.config?.include_precision_recall_curve as boolean) ?? false
  );
  const [includeResidualPlot, setIncludeResidualPlot] = useState(
    (node.config?.include_residual_plot as boolean) ?? false
  );
  const [topKFeatures, setTopKFeatures] = useState(
    (node.config?.top_k_features as number) ?? 10
  );

  // 只在客户端挂载后渲染内容
  if (!mounted) {
    return <div className="text-slate-400">加载中...</div>;
  }

  // 尝试从连接的训练节点获取任务类型
  const isClassification = node.config?.task_type === "classification" || !node.config?.task_type;

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-slate-300">评估选项</h4>

        {isClassification && (
          <>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeConfusionMatrix}
                onChange={(e) => setIncludeConfusionMatrix(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-200">包含混淆矩阵</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeClassificationReport}
                onChange={(e) => setIncludeClassificationReport(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-200">包含分类报告</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeRocCurve}
                onChange={(e) => setIncludeRocCurve(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-200">包含ROC曲线（仅二分类）</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePrecisionRecallCurve}
                onChange={(e) => setIncludePrecisionRecallCurve(e.target.checked)}
                className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-200">包含PR曲线（仅二分类）</span>
            </label>
          </>
        )}

        {!isClassification && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={includeResidualPlot}
              onChange={(e) => setIncludeResidualPlot(e.target.checked)}
              className="w-4 h-4 rounded border-slate-600 bg-slate-700 text-blue-500 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-200">包含残差图</span>
          </label>
        )}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-slate-200">
            显示前K个重要特征
          </label>
          <input
            type="number"
            value={topKFeatures}
            onChange={(e) => setTopKFeatures(Number(e.target.value))}
            min={1}
            max={50}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-slate-200 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="pt-2">
        <Button
          onClick={() => {
            onSave({
              include_confusion_matrix: includeConfusionMatrix,
              include_classification_report: includeClassificationReport,
              include_roc_curve: includeRocCurve,
              include_precision_recall_curve: includePrecisionRecallCurve,
              include_residual_plot: includeResidualPlot,
              top_k_features: topKFeatures,
            });
          }}
          className="w-full"
        >
          保存配置
        </Button>
      </div>
    </div>
  );
}
