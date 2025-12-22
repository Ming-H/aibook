// 工作流执行器

import { authFetch } from "./auth";

const BACKEND_BASE = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

export interface Node {
  id: string;
  type: string;
  x: number;
  y: number;
  config?: Record<string, unknown>;
}

export interface Connection {
  id: string;
  from: string;
  to: string;
}

export interface WorkflowState {
  nodes: Node[];
  connections: Connection[];
}

export interface ExecutionResult {
  success: boolean;
  results: Record<string, unknown>;
  error?: string;
  nodeStates?: Record<string, "pending" | "running" | "success" | "error">;
}

// 执行工作流
export async function executeWorkflow(
  workflow: WorkflowState,
  file?: File,
  onNodeStateChange?: (nodeId: string, state: "pending" | "running" | "success" | "error") => void
): Promise<ExecutionResult> {
  const results: Record<string, unknown> = {};
  const nodeStates: Record<string, "pending" | "running" | "success" | "error"> = {};
  const nodeMap = new Map(workflow.nodes.map((n) => [n.id, n]));

  // 初始化所有节点状态为 pending
  workflow.nodes.forEach((node) => {
    nodeStates[node.id] = "pending";
    if (onNodeStateChange) {
      onNodeStateChange(node.id, "pending");
    }
  });

  // 构建执行顺序（拓扑排序）
  const executionOrder = topologicalSort(workflow.nodes, workflow.connections);

  try {
    // 按顺序执行每个节点
    for (const nodeId of executionOrder) {
      const node = nodeMap.get(nodeId);
      if (!node) continue;

      // 设置节点状态为 running
      nodeStates[nodeId] = "running";
      if (onNodeStateChange) {
        onNodeStateChange(nodeId, "running");
      }

      try {
        const inputData = getInputData(nodeId, workflow.connections, results, nodeMap);
        const result = await executeNode(node, inputData, file, workflow);
        results[nodeId] = result;

        // 设置节点状态为 success
        nodeStates[nodeId] = "success";
        if (onNodeStateChange) {
          onNodeStateChange(nodeId, "success");
        }
      } catch (error) {
        // 设置节点状态为 error
        nodeStates[nodeId] = "error";
        if (onNodeStateChange) {
          onNodeStateChange(nodeId, "error");
        }
        throw error;
      }
    }

    return { success: true, results, nodeStates };
  } catch (error) {
    return {
      success: false,
      results,
      nodeStates,
      error: error instanceof Error ? error.message : "执行失败",
    };
  }
}

// 拓扑排序，确定执行顺序
function topologicalSort(
  nodes: Node[],
  connections: Connection[]
): string[] {
  const inDegree = new Map<string, number>();
  const graph = new Map<string, string[]>();

  // 初始化
  nodes.forEach((node) => {
    inDegree.set(node.id, 0);
    graph.set(node.id, []);
  });

  // 构建图
  connections.forEach((conn) => {
    const current = inDegree.get(conn.to) ?? 0;
    inDegree.set(conn.to, current + 1);
    const neighbors = graph.get(conn.from) ?? [];
    neighbors.push(conn.to);
    graph.set(conn.from, neighbors);
  });

  // 找到所有入度为0的节点
  const queue: string[] = [];
  inDegree.forEach((degree, nodeId) => {
    if (degree === 0) {
      queue.push(nodeId);
    }
  });

  const result: string[] = [];

  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    result.push(nodeId);

    const neighbors = graph.get(nodeId) ?? [];
    neighbors.forEach((neighborId) => {
      const degree = inDegree.get(neighborId) ?? 0;
      inDegree.set(neighborId, degree - 1);
      if (degree - 1 === 0) {
        queue.push(neighborId);
      }
    });
  }

  return result;
}

// 获取节点的输入数据
function getInputData(
  nodeId: string,
  connections: Connection[],
  results: Record<string, unknown>,
  nodeMap?: Map<string, Node>
): unknown {
  const inputConnections = connections.filter((c) => c.to === nodeId);
  if (inputConnections.length === 0) {
    return null;
  }

  // 查找算法节点的输出（如果存在）
  const algorithmConnections = inputConnections.filter((c) => {
    if (!nodeMap) return false;
    const fromNode = nodeMap.get(c.from);
    return fromNode && (
      fromNode.type === "random_forest" ||
      fromNode.type === "svm" ||
      fromNode.type === "logistic_regression" ||
      fromNode.type === "linear_regression" ||
      fromNode.type === "gradient_boosting" ||
      fromNode.type === "knn"
    );
  });

  // 如果有算法节点连接，返回算法类型信息
  if (algorithmConnections.length > 0 && nodeMap) {
    const algorithmNode = nodeMap.get(algorithmConnections[0].from);
    if (algorithmNode) {
      return {
        algorithmType: algorithmNode.type,
        ...(results[algorithmConnections[0].from] || {}),
      };
    }
  }

  // 如果有多个输入，返回第一个（可以扩展为合并多个输入）
  const firstInput = inputConnections[0];
  return results[firstInput.from] ?? null;
}

// 执行单个节点
async function executeNode(
  node: Node,
  inputData: unknown,
  file?: File,
  workflow?: WorkflowState
): Promise<unknown> {
  switch (node.type) {
    case "data_upload":
      if (!file) {
        throw new Error("数据上传节点需要文件");
      }
      // 返回文件信息，实际执行会在后续节点中使用
      return { file, type: "data_upload" };

    case "feature_analysis":
      if (!inputData || typeof inputData !== "object" || !("file" in inputData)) {
        throw new Error("特征分析节点需要数据上传节点的输出");
      }
      const analysisFile = (inputData as { file: File }).file;
      const form = new FormData();
      form.append("file", analysisFile);

      const analysisRes = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/analyze-features`,
        {
          method: "POST",
          body: form,
        }
      );

      if (!analysisRes.ok) {
        const data = await analysisRes.json().catch(() => ({}));
        throw new Error(data.detail ?? "特征分析失败");
      }

      return await analysisRes.json();

    case "data_cleaning":
      // 数据清洗节点：需要前置节点的文件输出
      let cleaningFile: File;
      if (inputData && typeof inputData === "object" && "file" in inputData) {
        cleaningFile = (inputData as { file: File }).file;
      } else if (file) {
        cleaningFile = file;
      } else {
        throw new Error("数据清洗节点需要数据文件");
      }

      const cleaningConfig = node.config ?? {};
      const cleaningForm = new FormData();
      cleaningForm.append("file", cleaningFile);
      cleaningForm.append(
        "config",
        JSON.stringify({
          missing_value_strategy: cleaningConfig.missing_value_strategy || "mean",
          handle_outliers: cleaningConfig.handle_outliers || false,
          outlier_method: cleaningConfig.outlier_method || "iqr",
          outlier_threshold: cleaningConfig.outlier_threshold || 3.0,
        })
      );

      const cleaningRes = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/data-cleaning`,
        {
          method: "POST",
          body: cleaningForm,
        }
      );

      if (!cleaningRes.ok) {
        const data = await cleaningRes.json().catch(() => ({}));
        throw new Error(data.detail ?? "数据清洗失败");
      }

      const cleaningResult = await cleaningRes.json();
      
      // 将 Base64 编码的 CSV 转换回 File 对象，供后续节点使用
      const cleanedCsvContent = atob(cleaningResult.cleaned_data_csv);
      const cleanedBlob = new Blob([cleanedCsvContent], { type: "text/csv" });
      const cleanedFile = new File([cleanedBlob], `cleaned_${cleaningFile.name}`, {
        type: "text/csv",
      });

      return {
        ...cleaningResult,
        file: cleanedFile, // 返回清洗后的文件供后续节点使用
        type: "data_cleaning",
      };

    case "feature_transform":
      // 特征变换节点：需要前置节点的文件输出
      let transformFile: File;
      if (inputData && typeof inputData === "object" && "file" in inputData) {
        transformFile = (inputData as { file: File }).file;
      } else if (file) {
        transformFile = file;
      } else {
        throw new Error("特征变换节点需要数据文件");
      }

      const transformConfig = node.config ?? {};
      const transformForm = new FormData();
      transformForm.append("file", transformFile);
      transformForm.append(
        "config",
        JSON.stringify({
          transform_type: transformConfig.transform_type || "standardize",
          columns: transformConfig.columns || null,
        })
      );

      const transformRes = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/feature-transform`,
        {
          method: "POST",
          body: transformForm,
        }
      );

      if (!transformRes.ok) {
        const data = await transformRes.json().catch(() => ({}));
        throw new Error(data.detail ?? "特征变换失败");
      }

      const transformResult = await transformRes.json();
      
      // 将 Base64 编码的 CSV 转换回 File 对象，供后续节点使用
      const transformedCsvContent = atob(transformResult.transformed_data_csv);
      const transformedBlob = new Blob([transformedCsvContent], { type: "text/csv" });
      const transformedFile = new File([transformedBlob], `transformed_${transformFile.name}`, {
        type: "text/csv",
      });

      return {
        ...transformResult,
        file: transformedFile, // 返回变换后的文件供后续节点使用
        type: "feature_transform",
      };

    case "model_training":
      if (!inputData || typeof inputData !== "object") {
        throw new Error("模型训练节点需要前置节点的输出");
      }

      const trainingFile = "file" in inputData ? (inputData as { file: File }).file : file;
      if (!trainingFile) {
        throw new Error("模型训练需要数据文件");
      }

      const config = node.config ?? {};
      const targetColumn = (config.target_column as string) || "";
      const taskType = (config.task_type as string) || "classification";

      // 获取算法类型：优先从连接的算法节点获取，然后从配置中获取
      let algorithm = "";

      // 首先尝试从连接的算法节点获取（算法节点的优先级最高）
      if (workflow) {
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
            algorithm = fromNode.type;
            console.log(`[Workflow Executor] 从算法节点获取算法: ${algorithm}`);
            break;
          }
        }
      }

      // 如果没有算法节点连接，从配置中获取
      if (!algorithm) {
        algorithm = (config.algorithm as string) || "";
        if (algorithm) {
          console.log(`[Workflow Executor] 从节点配置获取算法: ${algorithm}`);
        }
      }

      // 如果还是没有，使用默认值
      if (!algorithm) {
        algorithm = "random_forest";
        console.warn(`[Workflow Executor] 未找到算法配置，使用默认值: ${algorithm}`);
      }

      // 确保算法类型正确传递（调试用）
      console.log(`[Workflow Executor] 最终使用的算法: ${algorithm}, 任务类型: ${taskType}`);

      if (!targetColumn) {
        throw new Error("请配置目标列");
      }

      const trainForm = new FormData();
      trainForm.append("file", trainingFile);
      trainForm.append("target_column", targetColumn);
      trainForm.append("task_type", taskType);
      trainForm.append("algorithm", algorithm);

      const trainRes = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/upload-and-train`,
        {
          method: "POST",
          body: trainForm,
        }
      );

      if (!trainRes.ok) {
        const data = await trainRes.json().catch(() => ({}));
        throw new Error(data.detail ?? "模型训练失败");
      }

      const trainData = await trainRes.json();
      return trainData.experiment;

    case "model_evaluation":
      if (!inputData || typeof inputData !== "object") {
        throw new Error("模型评估节点需要模型训练节点的输出");
      }

      // 调用评估API
      const evalConfig = node.config?.evaluation_config || {
        include_confusion_matrix: node.config?.include_confusion_matrix ?? true,
        include_classification_report: node.config?.include_classification_report ?? true,
        include_roc_curve: node.config?.include_roc_curve ?? false,
        include_precision_recall_curve: node.config?.include_precision_recall_curve ?? false,
        include_residual_plot: node.config?.include_residual_plot ?? false,
        top_k_features: node.config?.top_k_features ?? 10,
      };

      const evalRes = await authFetch(
        `${BACKEND_BASE}/api/v1/experiments/evaluate-model`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            experiment: inputData,
            config: evalConfig,
          }),
        }
      );

      if (!evalRes.ok) {
        const data = await evalRes.json().catch(() => ({}));
        throw new Error(data.detail ?? "模型评估失败");
      }

      const evalData = await evalRes.json();
      return evalData;

    default:
      // 其他节点类型暂时返回输入数据
      return inputData;
  }
}
