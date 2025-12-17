from __future__ import annotations

from dataclasses import dataclass
from typing import Dict, List, Tuple

import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.ensemble import (
    GradientBoostingClassifier,
    GradientBoostingRegressor,
    RandomForestClassifier,
    RandomForestRegressor,
)
from sklearn.linear_model import LinearRegression, LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    f1_score,
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)
from sklearn.model_selection import train_test_split
from sklearn.neighbors import KNeighborsClassifier, KNeighborsRegressor
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.svm import SVC, SVR

from schemas import AlgorithmType, ExperimentResult, FeatureImportanceItem, MetricItem, TaskType


@dataclass
class TrainConfig:
    target_column: str
    task_type: TaskType
    algorithm: AlgorithmType = "random_forest"
    test_size: float = 0.2
    random_state: int = 42


def _split_features_target(df: pd.DataFrame, cfg: TrainConfig) -> Tuple[pd.DataFrame, pd.Series]:
    if cfg.target_column not in df.columns:
        raise ValueError(f"目标列 '{cfg.target_column}' 不在数据集中")
    X = df.drop(columns=[cfg.target_column])
    y = df[cfg.target_column]
    return X, y


def _build_pipeline(X: pd.DataFrame, cfg: TrainConfig) -> Tuple[Pipeline, Dict]:
    numeric_cols = X.select_dtypes(include=["number"]).columns.tolist()
    cat_cols = X.select_dtypes(exclude=["number"]).columns.tolist()

    transformers = []
    if numeric_cols:
        transformers.append(
            ("num", StandardScaler(), numeric_cols),
        )
    if cat_cols:
        transformers.append(
            ("cat", OneHotEncoder(handle_unknown="ignore"), cat_cols),
        )

    preprocessor = ColumnTransformer(transformers)

    # 根据算法类型和任务类型选择模型
    model = None
    hyperparams = {
        "algorithm": cfg.algorithm,
        "random_state": cfg.random_state,
        "test_size": cfg.test_size,
    }

    if cfg.task_type == "classification":
        if cfg.algorithm == "random_forest":
            model = RandomForestClassifier(
                n_estimators=100,
                max_depth=None,
                random_state=cfg.random_state,
            )
            hyperparams["n_estimators"] = model.n_estimators
            hyperparams["max_depth"] = model.max_depth
        elif cfg.algorithm == "svm":
            model = SVC(random_state=cfg.random_state, probability=True)
            hyperparams["kernel"] = "rbf"
        elif cfg.algorithm == "logistic_regression":
            model = LogisticRegression(random_state=cfg.random_state, max_iter=1000)
            hyperparams["max_iter"] = 1000
        elif cfg.algorithm == "gradient_boosting":
            model = GradientBoostingClassifier(
                n_estimators=100,
                random_state=cfg.random_state,
            )
            hyperparams["n_estimators"] = model.n_estimators
        elif cfg.algorithm == "knn":
            model = KNeighborsClassifier(n_neighbors=5)
            hyperparams["n_neighbors"] = 5
        else:
            # 默认使用随机森林
            model = RandomForestClassifier(
                n_estimators=100,
                max_depth=None,
                random_state=cfg.random_state,
            )
    else:  # regression
        if cfg.algorithm == "random_forest":
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=None,
                random_state=cfg.random_state,
            )
            hyperparams["n_estimators"] = model.n_estimators
            hyperparams["max_depth"] = model.max_depth
        elif cfg.algorithm == "svm":
            model = SVR(kernel="rbf")
            hyperparams["kernel"] = "rbf"
        elif cfg.algorithm == "linear_regression":
            model = LinearRegression()
        elif cfg.algorithm == "gradient_boosting":
            model = GradientBoostingRegressor(
                n_estimators=100,
                random_state=cfg.random_state,
            )
            hyperparams["n_estimators"] = model.n_estimators
        elif cfg.algorithm == "knn":
            model = KNeighborsRegressor(n_neighbors=5)
            hyperparams["n_neighbors"] = 5
        else:
            # 默认使用随机森林
            model = RandomForestRegressor(
                n_estimators=100,
                max_depth=None,
                random_state=cfg.random_state,
            )

    if model is None:
        raise ValueError(f"不支持的算法组合: task_type={cfg.task_type}, algorithm={cfg.algorithm}")

    pipe = Pipeline(
        steps=[
            ("preprocess", preprocessor),
            ("model", model),
        ]
    )

    # 保存模型类型和算法信息
    hyperparams["model_type"] = type(model).__name__
    hyperparams["algorithm"] = cfg.algorithm  # 确保算法信息被保存
    return pipe, hyperparams


def _compute_metrics(
    cfg: TrainConfig, y_true: np.ndarray, y_pred: np.ndarray
) -> List[MetricItem]:
    metrics: List[MetricItem] = []
    if cfg.task_type == "classification":
        metrics.append(MetricItem(name="accuracy", value=float(accuracy_score(y_true, y_pred))))
        metrics.append(
            MetricItem(
                name="f1_macro",
                value=float(f1_score(y_true, y_pred, average="macro")),
            )
        )
    else:
        mse = mean_squared_error(y_true, y_pred)
        metrics.append(MetricItem(name="mse", value=float(mse)))
        metrics.append(MetricItem(name="rmse", value=float(mse ** 0.5)))
        metrics.append(MetricItem(name="mae", value=float(mean_absolute_error(y_true, y_pred))))
        metrics.append(MetricItem(name="r2", value=float(r2_score(y_true, y_pred))))
    return metrics


def _extract_feature_importance(
    pipe: Pipeline,
    X: pd.DataFrame,
) -> List[FeatureImportanceItem]:
    """从模型中抽取特征重要性，映射回原始特征名（近似）。"""
    model = pipe.named_steps["model"]
    
    # 支持特征重要性的模型
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_
        # 这里简化处理：按原始列名均匀分配重要性，只用于教学展示
        raw_cols = X.columns.tolist()
        n = len(raw_cols)
        agg = np.zeros(n)
        for i, val in enumerate(importances):
            agg[i % n] += val
        total = agg.sum() or 1.0

        items = [
            FeatureImportanceItem(feature=col, importance=float(imp / total))
            for col, imp in zip(raw_cols, agg)
        ]
        # 按重要性降序
        items.sort(key=lambda x: x.importance, reverse=True)
        return items
    
    # 对于不支持特征重要性的模型（如SVM, KNN），返回空列表或使用其他方法
    # 这里可以后续扩展使用permutation importance等方法
    return []


def train_simple_experiment(
    df: pd.DataFrame,
    cfg: TrainConfig,
    dataset_name: str = "uploaded_dataset",
) -> ExperimentResult:
    """执行一次简单的端到端训练，并返回结构化实验结果。

    注意：对于分类任务，如果某个类别样本数过少（< 2），将自动关闭 stratify，
    以避免 sklearn 报错：
      “The least populated class in y has only 1 member...”
    """
    X, y = _split_features_target(df, cfg)

    stratify_arg = None
    if cfg.task_type == "classification":
        value_counts = y.value_counts()
        # 只有在每个类别至少有 2 个样本、并且类别数 >= 2 时才使用 stratify
        if (value_counts.min() >= 2) and (len(value_counts) >= 2):
            stratify_arg = y

    X_train, X_test, y_train, y_test = train_test_split(
        X,
        y,
        test_size=cfg.test_size,
        random_state=cfg.random_state,
        stratify=stratify_arg,
    )

    pipe, hyperparams = _build_pipeline(X_train, cfg)
    pipe.fit(X_train, y_train)
    y_pred = pipe.predict(X_test)

    metrics = _compute_metrics(cfg, y_test.to_numpy(), y_pred)
    fi = _extract_feature_importance(pipe, X_train)

    from datetime import datetime

    # 添加创建时间到超参数中（用于数据库记录）
    hyperparams["created_at"] = datetime.utcnow().isoformat()

    return ExperimentResult(
        dataset_name=dataset_name,
        n_samples=int(df.shape[0]),
        n_features=int(X.shape[1]),
        target_column=cfg.target_column,
        task_type=cfg.task_type,
        model_name=hyperparams["model_type"],
        hyperparams=hyperparams,
        metrics=metrics,
        feature_importance=fi,
    )


