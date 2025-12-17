from typing import List, Literal, Optional

from pydantic import BaseModel, Field


TaskType = Literal["classification", "regression"]

# 算法选择类型
AlgorithmType = Literal[
    "random_forest",  # 随机森林
    "svm",  # 支持向量机
    "logistic_regression",  # 逻辑回归（分类）
    "linear_regression",  # 线性回归
    "gradient_boosting",  # 梯度提升
    "knn",  # K近邻
]


class TrainRequest(BaseModel):
    """请求体（仅 JSON 调试用）。

    真正文件上传走 multipart/form-data，对应 FastAPI 的 Form/File。
    """

    target_column: str = Field(..., description="作为标签的列名")
    task_type: TaskType = Field(..., description="任务类型：classification 或 regression")
    algorithm: AlgorithmType = Field(default="random_forest", description="选择的算法")


class MetricItem(BaseModel):
    name: str
    value: float


class FeatureImportanceItem(BaseModel):
    feature: str
    importance: float


class ExperimentResult(BaseModel):
    """一次实验的核心结果结构，后续会作为大模型总结的输入。"""

    model_config = {"protected_namespaces": ()}

    dataset_name: str
    n_samples: int
    n_features: int
    target_column: str
    task_type: TaskType

    model_name: str
    hyperparams: dict

    metrics: List[MetricItem]
    feature_importance: Optional[List[FeatureImportanceItem]] = None
    id: Optional[int] = None  # 实验ID（如果已保存到数据库）


class TrainResponse(BaseModel):
    message: str
    experiment: ExperimentResult


class SummaryRequest(BaseModel):
    experiment: ExperimentResult


class SummaryResponse(BaseModel):
    summary_markdown: str


# 特征分析相关模型
class FeatureStat(BaseModel):
    """单个特征的统计信息"""
    feature: str
    dtype: str
    missing_count: int
    missing_rate: float
    mean: Optional[float] = None
    std: Optional[float] = None
    min: Optional[float] = None
    max: Optional[float] = None
    median: Optional[float] = None
    unique_count: Optional[int] = None
    top_values: Optional[List[dict]] = None  # [{"value": ..., "count": ...}]


class FeatureAnalysisResponse(BaseModel):
    """特征分析响应"""
    n_features: int
    n_samples: int
    features: List[FeatureStat]
    correlation_matrix: Optional[List[List[float]]] = None  # 数值特征的相关性矩阵
    correlation_features: Optional[List[str]] = None  # 对应的特征名


class EvaluationConfig(BaseModel):
    """模型评估配置"""
    include_confusion_matrix: bool = True  # 是否包含混淆矩阵（仅分类）
    include_classification_report: bool = True  # 是否包含分类报告（仅分类）
    include_roc_curve: bool = False  # 是否包含ROC曲线（仅二分类）
    include_precision_recall_curve: bool = False  # 是否包含PR曲线（仅二分类）
    include_residual_plot: bool = False  # 是否包含残差图（仅回归）
    top_k_features: int = 10  # 显示前K个重要特征


class EvaluationResponse(BaseModel):
    """模型评估响应"""
    experiment: ExperimentResult
    evaluation_config: EvaluationConfig
    confusion_matrix: Optional[List[List[int]]] = None  # 混淆矩阵（仅分类）
    classification_report: Optional[dict] = None  # 分类报告（仅分类）
    additional_metrics: List[MetricItem] = []  # 额外指标


class WorkflowSaveRequest(BaseModel):
    """保存工作流请求"""
    name: str
    description: Optional[str] = None
    workflow_config: dict  # 工作流配置（节点、连接等）
    execution_results: Optional[dict] = None  # 执行结果
    experiment_results: Optional[dict] = None  # 实验结果


class WorkflowResult(BaseModel):
    """工作流结果"""
    id: int
    name: str
    description: Optional[str] = None
    workflow_config: dict
    execution_results: Optional[dict] = None
    experiment_results: Optional[dict] = None
    created_at: str
    updated_at: str


class WorkflowListResponse(BaseModel):
    """工作流列表响应"""
    workflows: List[WorkflowResult]


