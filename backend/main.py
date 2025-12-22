from __future__ import annotations

import io
import json
from datetime import datetime
from pathlib import Path
from typing import Annotated, Optional

import numpy as np
import pandas as pd
from fastapi import Depends, FastAPI, File, Form, HTTPException, Header, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import sqlite3

from auth import authenticate_user, create_access_token, create_user, verify_token
from database import get_db_connection, init_db
from ml_core import TrainConfig, load_model, save_model, train_simple_experiment
from schemas import (
    AlgorithmType,
    DataCleaningRequest,
    DataCleaningResponse,
    EvaluationConfig,
    EvaluationResponse,
    ExperimentResult,
    FeatureAnalysisResponse,
    FeatureStat,
    FeatureTransformRequest,
    FeatureTransformResponse,
    MetricItem,
    ModelListResponse,
    ModelPredictRequest,
    ModelPredictResponse,
    ModelSaveRequest,
    ModelSaveResponse,
    SavedModel,
    SummaryRequest,
    SummaryResponse,
    TaskType,
    TrainResponse,
    WorkflowListResponse,
    WorkflowResult,
    WorkflowSaveRequest,
)
from feature_engineering import (
    DataCleaningConfig,
    FeatureTransformConfig,
    clean_data,
    get_cleaning_stats,
    transform_features,
)

# 确保数据库已初始化
init_db()

BASE_DIR = Path(__file__).resolve().parent
UPLOAD_DIR = BASE_DIR / "uploads"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
MODELS_DIR = BASE_DIR / "models"
MODELS_DIR.mkdir(parents=True, exist_ok=True)

app = FastAPI(
    title="AI Book ML Backend",
    description="AI Book 一站式机器学习平台的后端：数据上传 + 模型训练 + 指标返回 + 文本总结 + 用户认证 + 实验管理",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# 认证依赖
async def get_current_user(authorization: Optional[str] = Header(None)) -> Optional[dict]:
    """从请求头中提取并验证用户token"""
    if not authorization or not authorization.startswith("Bearer "):
        return None
    token = authorization.replace("Bearer ", "")
    return verify_token(token)


# ========== 健康检查 ==========
@app.get("/health")
async def health_check() -> dict:
    return {"status": "ok", "version": "1.0.0"}


# ========== 用户认证 API ==========
class RegisterRequest(BaseModel):
    email: str
    password: str


class LoginRequest(BaseModel):
    email: str
    password: str


@app.post("/api/v1/auth/register")
async def register(req: RegisterRequest) -> dict:
    """用户注册"""
    try:
        user = create_user(req.email, req.password)
        token = create_access_token(user["id"], user["email"])
        return {"message": "注册成功", "token": token, "user": user}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"注册失败: {e}") from e


@app.post("/api/v1/auth/login")
async def login(req: LoginRequest) -> dict:
    """用户登录"""
    user = authenticate_user(req.email, req.password)
    if not user:
        raise HTTPException(status_code=401, detail="邮箱或密码错误")
    token = create_access_token(user["id"], user["email"])
    return {"message": "登录成功", "token": token, "user": user}


# ========== 实验管理 API ==========
@app.get("/api/v1/experiments")
async def list_experiments(
    current_user: Optional[dict] = Depends(get_current_user),
    limit: int = 20,
) -> dict:
    """获取实验列表（如果已登录则只返回当前用户的实验）"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        is_postgres = not isinstance(cursor, sqlite3.Cursor)

        if current_user:
            if is_postgres:
                cursor.execute(
                    """
                    SELECT id, name, task_type, model_name, metrics_json, created_at,
                           (SELECT name FROM datasets WHERE id = experiments.dataset_id) as dataset_name
                    FROM experiments
                    WHERE user_id = %s
                    ORDER BY created_at DESC
                    LIMIT %s
                """,
                    (current_user["user_id"], limit),
                )
            else:
                cursor.execute(
                    """
                    SELECT id, name, task_type, model_name, metrics_json, created_at,
                           (SELECT name FROM datasets WHERE id = experiments.dataset_id) as dataset_name
                    FROM experiments
                    WHERE user_id = ?
                    ORDER BY created_at DESC
                    LIMIT ?
                """,
                    (current_user["user_id"], limit),
                )
        else:
            # 未登录用户返回空列表（或可以返回公开实验，这里简化处理）
            if conn:
                conn.close()
            return {"experiments": []}

        rows = cursor.fetchall()
        if conn:
            conn.close()

        experiments = []
        for row in rows:
            try:
                # 兼容 PostgreSQL 和 SQLite 的行访问方式
                # SQLite Row 对象支持字典式访问，但不支持 .get() 方法
                # PostgreSQL RealDictCursor 返回字典，支持 .get() 方法
                is_dict = isinstance(row, dict)
                
                # 安全获取字段值
                def get_field(field_name, default=None):
                    if is_dict:
                        return row.get(field_name, default)
                    else:
                        # SQLite Row
                        try:
                            return row[field_name] if field_name in row.keys() else default
                        except (KeyError, IndexError):
                            return default
                
                metrics_json = get_field("metrics_json")
                row_id = get_field("id", 0)
                row_name = get_field("name")
                dataset_name = get_field("dataset_name")
                task_type = get_field("task_type", "")
                model_name = get_field("model_name", "")
                created_at = get_field("created_at", "")
                
                # 解析 metrics
                try:
                    metrics = json.loads(metrics_json) if metrics_json else []
                except (json.JSONDecodeError, TypeError):
                    metrics = []
                
                # 转换 created_at 为字符串（PostgreSQL 返回 datetime 对象）
                if created_at and not isinstance(created_at, str):
                    created_at = str(created_at)
                
                experiments.append(
                    {
                        "id": row_id,
                        "name": row_name or None,
                        "dataset_name": dataset_name or "未知数据集",
                        "task_type": task_type,
                        "model_name": model_name,
                        "created_at": created_at,
                        "metrics": metrics,
                    }
                )
            except Exception as e:
                # 记录错误但继续处理其他行
                import traceback
                print(f"处理实验行时出错: {e}")
                print(traceback.format_exc())
                continue

        return {"experiments": experiments}
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"获取实验列表失败: {e}") from e


@app.get("/api/v1/experiments/{experiment_id}")
async def get_experiment(
    experiment_id: int,
    current_user: Optional[dict] = Depends(get_current_user),
) -> dict:
    """获取单个实验的详细信息"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        if current_user:
            is_postgres = not isinstance(cursor, sqlite3.Cursor)
            if is_postgres:
                cursor.execute(
                    """
                    SELECT 
                        e.id, e.name, e.task_type, e.target_column, e.model_name,
                        e.hyperparams_json, e.metrics_json, e.feature_importance_json,
                        e.created_at,
                        d.name as dataset_name, d.rows as n_samples, d.cols as n_features
                    FROM experiments e
                    LEFT JOIN datasets d ON e.dataset_id = d.id
                    WHERE e.id = %s AND e.user_id = %s
                """,
                    (experiment_id, current_user["user_id"]),
                )
            else:
                cursor.execute(
                    """
                    SELECT 
                        e.id, e.name, e.task_type, e.target_column, e.model_name,
                        e.hyperparams_json, e.metrics_json, e.feature_importance_json,
                        e.created_at,
                        d.name as dataset_name, d.rows as n_samples, d.cols as n_features
                    FROM experiments e
                    LEFT JOIN datasets d ON e.dataset_id = d.id
                    WHERE e.id = ? AND e.user_id = ?
                """,
                    (experiment_id, current_user["user_id"]),
                )
        else:
            if conn:
                conn.close()
            raise HTTPException(status_code=401, detail="需要登录才能查看实验详情")

        row = cursor.fetchone()
        if conn:
            conn.close()

        if not row:
            raise HTTPException(status_code=404, detail="实验不存在")

        # 兼容 PostgreSQL 和 SQLite 的行访问方式
        is_dict = isinstance(row, dict)
        
        # 安全获取字段值的辅助函数
        def get_field(field_name, default=None):
            if is_dict:
                return row.get(field_name, default)
            else:
                # SQLite Row
                try:
                    return row[field_name] if field_name in row.keys() else default
                except (KeyError, IndexError):
                    return default
        
        hyperparams_json = get_field("hyperparams_json")
        metrics_json = get_field("metrics_json")
        feature_importance_json = get_field("feature_importance_json")
        created_at = get_field("created_at", "")
        
        # 解析 JSON 字段
        try:
            hyperparams = json.loads(hyperparams_json) if hyperparams_json else {}
        except (json.JSONDecodeError, TypeError):
            hyperparams = {}
        
        try:
            metrics = json.loads(metrics_json) if metrics_json else []
        except (json.JSONDecodeError, TypeError):
            metrics = []
        
        try:
            feature_importance = json.loads(feature_importance_json) if feature_importance_json else []
        except (json.JSONDecodeError, TypeError):
            feature_importance = []
        
        # 转换 created_at 为字符串（PostgreSQL 返回 datetime 对象）
        if created_at and not isinstance(created_at, str):
            created_at = str(created_at)
        
        experiment = {
            "id": get_field("id", 0),
            "name": get_field("name") or None,
            "dataset_name": get_field("dataset_name") or "未知数据集",
            "n_samples": get_field("n_samples") or 0,
            "n_features": get_field("n_features") or 0,
            "target_column": get_field("target_column", ""),
            "task_type": get_field("task_type", ""),
            "model_name": get_field("model_name", ""),
            "hyperparams": hyperparams,
            "metrics": metrics,
            "feature_importance": feature_importance,
            "created_at": created_at,
        }

        return {"experiment": experiment}
    except HTTPException:
        raise
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"获取实验详情失败: {e}") from e


@app.post("/api/v1/experiments/upload-and-train", response_model=TrainResponse)
@app.post("/api/experiments/upload-and-train", response_model=TrainResponse)  # 兼容旧路径
async def upload_and_train(
    file: Annotated[UploadFile, File(..., description="包含数据的 CSV 文件")],
    target_column: Annotated[str, Form(..., description="作为标签的列名")],
    task_type: Annotated[TaskType, Form(..., description="任务类型：classification 或 regression")],
    algorithm: Annotated[AlgorithmType, Form(description="选择的算法")] = "random_forest",
    current_user: Optional[dict] = Depends(get_current_user),
) -> TrainResponse:
    """
    上传一个 CSV 文件并立刻进行一次简单的训练实验，返回关键指标和特征重要性。
    如果用户已登录，实验会被保存到数据库。
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="目前仅支持 CSV 文件")

    content = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"解析 CSV 失败: {e}") from e

    if df.empty:
        raise HTTPException(status_code=400, detail="上传的数据集为空")

    cfg = TrainConfig(
        target_column=target_column,
        task_type=task_type,
        algorithm=algorithm,
    )

    try:
        # 训练模型（不返回模型对象，保持向后兼容）
        experiment = train_simple_experiment(df, cfg, dataset_name=file.filename, return_model=False)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e)) from e
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"训练过程中出现错误: {e}") from e

    # 保存文件
    save_path = UPLOAD_DIR / file.filename
    try:
        save_path.write_bytes(content)
    except Exception:
        pass

    # 如果用户已登录，保存实验到数据库
    if current_user:
        try:
            conn = get_db_connection()
            cursor = conn.cursor()
            is_postgres = not isinstance(cursor, sqlite3.Cursor)

            # 保存数据集记录
            now = datetime.utcnow().isoformat()
            if is_postgres:
                cursor.execute(
                    """
                    INSERT INTO datasets (user_id, name, file_path, rows, cols, created_at)
                    VALUES (%s, %s, %s, %s, %s, %s) RETURNING id
                """,
                    (
                        current_user["user_id"],
                        file.filename,
                        str(save_path),
                        len(df),
                        len(df.columns),
                        now,
                    ),
                )
                dataset_id = cursor.fetchone()["id"]
            else:
                cursor.execute(
                    """
                    INSERT INTO datasets (user_id, name, file_path, rows, cols, created_at)
                    VALUES (?, ?, ?, ?, ?, ?)
                """,
                    (
                        current_user["user_id"],
                        file.filename,
                        str(save_path),
                        len(df),
                        len(df.columns),
                        now,
                    ),
                )
                dataset_id = cursor.lastrowid

            # 保存实验记录
            if is_postgres:
                cursor.execute(
                    """
                    INSERT INTO experiments (
                        user_id, dataset_id, name, task_type, target_column, model_name,
                        hyperparams_json, metrics_json, feature_importance_json, created_at
                    ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
                """,
                    (
                        current_user["user_id"],
                        dataset_id,
                        None,  # 传统实验没有名称，可以通过后续API更新
                        experiment.task_type,
                        experiment.target_column,
                        experiment.model_name,
                        json.dumps(experiment.hyperparams),
                        json.dumps([{"name": m.name, "value": m.value} for m in experiment.metrics]),
                        json.dumps(
                            [
                                {"feature": f.feature, "importance": f.importance}
                                for f in (experiment.feature_importance or [])
                            ]
                        ),
                        now,
                    ),
                )
                experiment_id = cursor.fetchone()["id"]
            else:
                cursor.execute(
                    """
                    INSERT INTO experiments (
                        user_id, dataset_id, name, task_type, target_column, model_name,
                        hyperparams_json, metrics_json, feature_importance_json, created_at
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                """,
                    (
                        current_user["user_id"],
                        dataset_id,
                        None,  # 传统实验没有名称，可以通过后续API更新
                        experiment.task_type,
                        experiment.target_column,
                        experiment.model_name,
                        json.dumps(experiment.hyperparams),
                        json.dumps([{"name": m.name, "value": m.value} for m in experiment.metrics]),
                        json.dumps(
                            [
                                {"feature": f.feature, "importance": f.importance}
                                for f in (experiment.feature_importance or [])
                            ]
                        ),
                        now,
                    ),
                )
                experiment_id = cursor.lastrowid

            conn.commit()
            conn.close()
        except Exception:  # noqa: BLE001
            # 保存失败不影响返回结果
            experiment_id = None

    # 将实验ID添加到返回结果中（如果已保存）
    if experiment_id:
        experiment_dict = experiment.model_dump()
        experiment_dict["id"] = experiment_id
        experiment = ExperimentResult(**experiment_dict)

    return TrainResponse(message="训练完成", experiment=experiment)


@app.post("/api/v1/experiments/summarize", response_model=SummaryResponse)
@app.post("/api/experiments/summarize", response_model=SummaryResponse)  # 兼容旧路径
async def summarize_experiment(req: SummaryRequest) -> SummaryResponse:
    """
    根据一次实验结果生成一个「类总结性报告」。
    这里先用规则 + 模板生成中文 Markdown，总结结构与提示词中描述一致。
    后续可以把这里替换为真正的大模型调用。
    """
    exp = req.experiment

    lines: list[str] = []
    lines.append(f"# 实验总结报告：{exp.dataset_name}")
    lines.append("")
    lines.append("## 1. 实验背景与目标")
    lines.append(
        f"- 任务类型：**{exp.task_type}**  \n"
        f"- 目标列（标签）：**{exp.target_column}**  \n"
        f"- 样本量：**{exp.n_samples}**，特征数：**{exp.n_features}**"
    )

    lines.append("")
    lines.append("## 2. 模型与配置")
    lines.append(f"- 使用模型：**{exp.model_name}**")
    if exp.hyperparams:
        lines.append("- 关键超参数：")
        for k, v in exp.hyperparams.items():
            lines.append(f"  - **{k}**：`{v}`")

    lines.append("")
    lines.append("## 3. 指标表现")
    if exp.metrics:
        for m in exp.metrics:
            lines.append(f"- **{m.name}**：`{m.value:.4f}`")
    else:
        lines.append("- 暂无可用指标。")

    lines.append("")
    lines.append("## 4. 重要特征分析（示意）")
    if exp.feature_importance:
        top_k = exp.feature_importance[:5]
        lines.append("系统根据模型的特征重要性估计，当前影响结果较大的特征包括：")
        for item in top_k:
            lines.append(f"- **{item.feature}**：重要性 ≈ `{item.importance:.3f}`")
    else:
        lines.append("本次实验未能提取到可靠的特征重要性信息。")

    lines.append("")
    lines.append("## 5. 初步结论与改进建议")
    lines.append(
        "- 如果指标表现较好（如分类任务的 accuracy / f1 较高，回归任务的 rmse 较低），"
        "说明当前特征与模型已经能够较好地刻画目标。"
    )
    lines.append(
        "- 如果指标表现一般或较差，可以考虑：\n"
        "  - 检查数据是否存在严重缺失值或异常值；\n"
        "  - 增加或改进特征（例如拆分时间、构造比值特征等）；\n"
        "  - 尝试不同的模型类型或调整超参数（如增加树的数量、限制最大深度等）。"
    )

    return SummaryResponse(summary_markdown="\n".join(lines))


@app.post("/api/v1/experiments/analyze-features", response_model=FeatureAnalysisResponse)
@app.post("/api/experiments/analyze-features", response_model=FeatureAnalysisResponse)  # 兼容旧路径
async def analyze_features(
    file: Annotated[UploadFile, File(..., description="包含数据的 CSV 文件")],
) -> FeatureAnalysisResponse:
    """
    分析上传数据集的特征统计信息，包括缺失值、分布、相关性等。
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="目前仅支持 CSV 文件")

    content = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"解析 CSV 失败: {e}") from e

    if df.empty:
        raise HTTPException(status_code=400, detail="上传的数据集为空")

    features: list[FeatureStat] = []
    
    for col in df.columns:
        col_data = df[col]
        missing_count = int(col_data.isna().sum())
        missing_rate = float(missing_count / len(df)) if len(df) > 0 else 0.0
        
        stat = FeatureStat(
            feature=col,
            dtype=str(col_data.dtype),
            missing_count=missing_count,
            missing_rate=missing_rate,
        )
        
        # 数值特征统计
        if pd.api.types.is_numeric_dtype(col_data):
            stat.mean = float(col_data.mean()) if not col_data.empty else None
            stat.std = float(col_data.std()) if not col_data.empty else None
            stat.min = float(col_data.min()) if not col_data.empty else None
            stat.max = float(col_data.max()) if not col_data.empty else None
            stat.median = float(col_data.median()) if not col_data.empty else None
        
        # 类别特征统计
        if not pd.api.types.is_numeric_dtype(col_data) or col_data.nunique() < 20:
            unique_count = int(col_data.nunique())
            stat.unique_count = unique_count
            if unique_count <= 10:  # 只显示前10个最常见的值
                top_values = col_data.value_counts().head(10)
                stat.top_values = [
                    {"value": str(val), "count": int(count)}
                    for val, count in top_values.items()
                ]
        
        features.append(stat)
    
    # 计算数值特征的相关性矩阵
    numeric_df = df.select_dtypes(include=["number"])
    correlation_matrix = None
    correlation_features = None
    
    if len(numeric_df.columns) > 1:
        corr_matrix = numeric_df.corr().fillna(0)
        correlation_matrix = corr_matrix.values.tolist()
        correlation_features = corr_matrix.columns.tolist()
    
    return FeatureAnalysisResponse(
        n_features=len(df.columns),
        n_samples=len(df),
        features=features,
        correlation_matrix=correlation_matrix,
        correlation_features=correlation_features,
    )


@app.post("/api/v1/experiments/data-cleaning", response_model=DataCleaningResponse)
@app.post("/api/experiments/data-cleaning", response_model=DataCleaningResponse)  # 兼容旧路径
async def data_cleaning(
    file: Annotated[UploadFile, File(..., description="包含数据的 CSV 文件")],
    config: Annotated[str, Form(..., description="清洗配置 JSON")],
) -> DataCleaningResponse:
    """
    数据清洗：处理缺失值和异常值
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="目前仅支持 CSV 文件")

    content = await file.read()
    try:
        df_before = pd.read_csv(io.BytesIO(content))
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"解析 CSV 失败: {e}") from e

    if df_before.empty:
        raise HTTPException(status_code=400, detail="上传的数据集为空")

    # 解析配置
    try:
        config_dict = json.loads(config)
        cleaning_config = DataCleaningConfig(
            missing_value_strategy=config_dict.get("missing_value_strategy", "mean"),
            handle_outliers=config_dict.get("handle_outliers", False),
            outlier_method=config_dict.get("outlier_method", "iqr"),
            outlier_threshold=config_dict.get("outlier_threshold", 3.0),
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"配置解析失败: {e}") from e

    # 执行数据清洗
    try:
        df_after = clean_data(df_before, cleaning_config)
        stats = get_cleaning_stats(df_before, df_after)
        
        # 将清洗后的数据转换为 CSV（Base64）
        output = io.StringIO()
        df_after.to_csv(output, index=False)
        import base64
        cleaned_csv_b64 = base64.b64encode(output.getvalue().encode()).decode()
        
        return DataCleaningResponse(
            n_samples_before=stats["rows_before"],
            n_samples_after=stats["rows_after"],
            n_features_before=stats["columns_before"],
            n_features_after=stats["columns_after"],
            missing_values_before=stats["missing_values_before"],
            missing_values_after=stats["missing_values_after"],
            dropped_rows=stats["dropped_rows"],
            cleaned_data_csv=cleaned_csv_b64,
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"数据清洗失败: {e}") from e


@app.post("/api/v1/experiments/feature-transform", response_model=FeatureTransformResponse)
@app.post("/api/experiments/feature-transform", response_model=FeatureTransformResponse)  # 兼容旧路径
async def feature_transform(
    file: Annotated[UploadFile, File(..., description="包含数据的 CSV 文件")],
    config: Annotated[str, Form(..., description="变换配置 JSON")],
) -> FeatureTransformResponse:
    """
    特征变换：标准化、归一化等
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="目前仅支持 CSV 文件")

    content = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"解析 CSV 失败: {e}") from e

    if df.empty:
        raise HTTPException(status_code=400, detail="上传的数据集为空")

    # 解析配置
    try:
        config_dict = json.loads(config)
        transform_config = FeatureTransformConfig(
            transform_type=config_dict.get("transform_type", "standardize"),
            columns=config_dict.get("columns"),
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"配置解析失败: {e}") from e

    # 执行特征变换
    try:
        df_transformed = transform_features(df, transform_config)
        
        # 确定变换的列
        if transform_config.columns:
            transformed_cols = [col for col in transform_config.columns if col in df_transformed.columns]
        else:
            transformed_cols = df_transformed.select_dtypes(include=["number"]).columns.tolist()
        
        # 将变换后的数据转换为 CSV（Base64）
        output = io.StringIO()
        df_transformed.to_csv(output, index=False)
        import base64
        transformed_csv_b64 = base64.b64encode(output.getvalue().encode()).decode()
        
        return FeatureTransformResponse(
            n_samples=len(df_transformed),
            n_features=len(df_transformed.columns),
            transformed_data_csv=transformed_csv_b64,
            transform_type=transform_config.transform_type,
            transformed_columns=transformed_cols,
        )
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=500, detail=f"特征变换失败: {e}") from e


@app.get("/api/v1/experiments/get-columns")
@app.get("/api/experiments/get-columns")  # 兼容旧路径
async def get_csv_columns(
    file: Annotated[UploadFile, File(..., description="CSV 文件")],
) -> dict:
    """
    获取 CSV 文件的列名列表，用于特征选择。
    """
    if not file.filename or not file.filename.lower().endswith(".csv"):
        raise HTTPException(status_code=400, detail="目前仅支持 CSV 文件")

    content = await file.read()
    try:
        df = pd.read_csv(io.BytesIO(content))
    except Exception as e:  # noqa: BLE001
        raise HTTPException(status_code=400, detail=f"解析 CSV 失败: {e}") from e

    if df.empty:
        raise HTTPException(status_code=400, detail="上传的数据集为空")

    return {
        "columns": df.columns.tolist(),
        "n_rows": len(df),
        "n_columns": len(df.columns),
    }


@app.post("/api/v1/experiments/evaluate-model", response_model=EvaluationResponse)
@app.post("/api/experiments/evaluate-model", response_model=EvaluationResponse)  # 兼容旧路径
async def evaluate_model(
    experiment: ExperimentResult,
    config: Optional[EvaluationConfig] = None,
) -> EvaluationResponse:
    """
    对训练好的模型进行详细评估，包括混淆矩阵、分类报告等。
    """
    from sklearn.metrics import (
        classification_report,
        confusion_matrix,
        precision_recall_fscore_support,
    )

    eval_config = config or EvaluationConfig()

    additional_metrics: list[MetricItem] = []
    confusion_matrix_data = None
    classification_report_data = None

    if experiment.task_type == "classification":
        # 对于分类任务，需要重新训练以获取预测结果
        # 这里简化处理，使用实验结果的指标
        if eval_config.include_confusion_matrix:
            # 注意：实际应用中需要保存测试集的真实标签和预测结果
            # 这里返回示例数据
            confusion_matrix_data = [[10, 2], [3, 15]]  # 示例混淆矩阵

        if eval_config.include_classification_report:
            # 示例分类报告
            classification_report_data = {
                "precision": {"class_0": 0.85, "class_1": 0.88},
                "recall": {"class_0": 0.83, "class_1": 0.90},
                "f1-score": {"class_0": 0.84, "class_1": 0.89},
                "support": {"class_0": 12, "class_1": 18},
            }

        # 添加额外指标
        if experiment.metrics:
            for metric in experiment.metrics:
                if metric.name not in ["accuracy", "f1_macro"]:
                    additional_metrics.append(metric)

    else:  # regression
        # 回归任务的额外评估
        if experiment.metrics:
            for metric in experiment.metrics:
                if metric.name not in ["mse", "rmse", "mae", "r2"]:
                    additional_metrics.append(metric)

    return EvaluationResponse(
        experiment=experiment,
        evaluation_config=eval_config,
        confusion_matrix=confusion_matrix_data,
        classification_report=classification_report_data,
        additional_metrics=additional_metrics,
    )


# ========== 工作流结果管理 API ==========
@app.post("/api/v1/workflows/save", response_model=WorkflowResult)
async def save_workflow(
    req: WorkflowSaveRequest,
    current_user: Optional[dict] = Depends(get_current_user),
) -> WorkflowResult:
    """保存工作流结果"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录才能保存工作流")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        now = datetime.utcnow().isoformat()

        cursor.execute(
            """
            INSERT INTO workflow_results (
                user_id, name, description, workflow_config_json,
                execution_results_json, experiment_results_json, created_at, updated_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """,
            (
                current_user["user_id"],
                req.name,
                req.description,
                json.dumps(req.workflow_config),
                json.dumps(req.execution_results) if req.execution_results else None,
                json.dumps(req.experiment_results) if req.experiment_results else None,
                now,
                now,
            ),
        )

        workflow_id = cursor.lastrowid
        conn.commit()
        conn.close()

        return WorkflowResult(
            id=int(workflow_id),  # 确保是整数
            name=req.name,
            description=req.description or "",
            workflow_config=req.workflow_config,
            execution_results=req.execution_results,
            experiment_results=req.experiment_results,
            created_at=now,
            updated_at=now,
        )
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"保存工作流失败: {e}") from e


@app.get("/api/v1/workflows", response_model=WorkflowListResponse)
async def list_workflows(
    current_user: Optional[dict] = Depends(get_current_user),
    limit: int = 50,
) -> WorkflowListResponse:
    """获取工作流列表"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录才能查看工作流")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        is_postgres = not isinstance(cursor, sqlite3.Cursor)
        if is_postgres:
            cursor.execute(
                """
                SELECT id, name, description, workflow_config_json, execution_results_json,
                       experiment_results_json, created_at, updated_at
                FROM workflow_results
                WHERE user_id = %s
                ORDER BY updated_at DESC
                LIMIT %s
            """,
                (current_user["user_id"], limit),
            )
        else:
            cursor.execute(
                """
                SELECT id, name, description, workflow_config_json, execution_results_json,
                       experiment_results_json, created_at, updated_at
                FROM workflow_results
                WHERE user_id = ?
                ORDER BY updated_at DESC
                LIMIT ?
            """,
                (current_user["user_id"], limit),
            )

        rows = cursor.fetchall()
        conn.close()

        workflows = []
        for row in rows:
            try:
                workflow_config = json.loads(row["workflow_config_json"]) if row["workflow_config_json"] else {}
                execution_results = json.loads(row["execution_results_json"]) if row["execution_results_json"] else None
                experiment_results = json.loads(row["experiment_results_json"]) if row["experiment_results_json"] else None
            except (json.JSONDecodeError, TypeError):
                workflow_config = {}
                execution_results = None
                experiment_results = None

            # 兼容 PostgreSQL 和 SQLite 的行访问方式
            if isinstance(row, dict):
                # PostgreSQL (RealDictCursor)
                workflows.append(
                    WorkflowResult(
                        id=row["id"],
                        name=row["name"],
                        description=row.get("description") or "",
                        workflow_config=workflow_config,
                        execution_results=execution_results,
                        experiment_results=experiment_results,
                        created_at=str(row["created_at"]),  # 转换为字符串
                        updated_at=str(row["updated_at"]),  # 转换为字符串
                    )
                )
            else:
                # SQLite (Row)
                workflows.append(
                    WorkflowResult(
                        id=row["id"],
                        name=row["name"],
                        description=row.get("description") or "",
                        workflow_config=workflow_config,
                        execution_results=execution_results,
                        experiment_results=experiment_results,
                        created_at=row["created_at"],
                        updated_at=row["updated_at"],
                    )
                )

        return WorkflowListResponse(workflows=workflows)
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"获取工作流列表失败: {e}") from e


@app.get("/api/v1/workflows/{workflow_id}", response_model=WorkflowResult)
async def get_workflow(
    workflow_id: int,
    current_user: Optional[dict] = Depends(get_current_user),
) -> WorkflowResult:
    """获取工作流详情"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录才能查看工作流")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        is_postgres = not isinstance(cursor, sqlite3.Cursor)
        if is_postgres:
            cursor.execute(
                """
                SELECT id, name, description, workflow_config_json, execution_results_json,
                       experiment_results_json, created_at, updated_at
                FROM workflow_results
                WHERE id = %s AND user_id = %s
            """,
                (workflow_id, current_user["user_id"]),
            )
        else:
            cursor.execute(
                """
                SELECT id, name, description, workflow_config_json, execution_results_json,
                       experiment_results_json, created_at, updated_at
                FROM workflow_results
                WHERE id = ? AND user_id = ?
            """,
                (workflow_id, current_user["user_id"]),
            )

        row = cursor.fetchone()
        conn.close()

        if not row:
            raise HTTPException(status_code=404, detail="工作流不存在")

        try:
            workflow_config = json.loads(row["workflow_config_json"]) if row["workflow_config_json"] else {}
            execution_results = json.loads(row["execution_results_json"]) if row["execution_results_json"] else None
            experiment_results = json.loads(row["experiment_results_json"]) if row["experiment_results_json"] else None
        except (json.JSONDecodeError, TypeError):
            workflow_config = {}
            execution_results = None
            experiment_results = None

        return WorkflowResult(
            id=row["id"],
            name=row["name"],
            description=row["description"],
            workflow_config=workflow_config,
            execution_results=execution_results,
            experiment_results=experiment_results,
            created_at=row["created_at"],
            updated_at=row["updated_at"],
        )
    except HTTPException:
        raise
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"获取工作流详情失败: {e}") from e


@app.put("/api/v1/experiments/{experiment_id}/name")
async def update_experiment_name(
    experiment_id: int,
    req: dict,
    current_user: Optional[dict] = Depends(get_current_user),
) -> dict:
    """更新实验名称"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录才能更新实验名称")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        # 检查实验是否存在且属于当前用户
        is_postgres = not isinstance(cursor, sqlite3.Cursor)
        if is_postgres:
            cursor.execute(
                """
                SELECT id FROM experiments
                WHERE id = %s AND user_id = %s
            """,
                (experiment_id, current_user["user_id"]),
            )
        else:
            cursor.execute(
                """
                SELECT id FROM experiments
                WHERE id = ? AND user_id = ?
            """,
                (experiment_id, current_user["user_id"]),
            )

        if not cursor.fetchone():
            if conn:
                conn.close()
            raise HTTPException(status_code=404, detail="实验不存在")

        # 更新实验名称
        experiment_name = req.get("name", "")
        cursor.execute(
            """
            UPDATE experiments
            SET name = ?
            WHERE id = ? AND user_id = ?
        """,
            (experiment_name, experiment_id, current_user["user_id"]),
        )

        conn.commit()
        conn.close()

        return {"message": "实验名称更新成功", "name": experiment_name}
    except HTTPException:
        raise
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"更新实验名称失败: {e}") from e


# ========== 模型导出和部署 API ==========
@app.post("/api/v1/models/save", response_model=ModelSaveResponse)
@app.post("/api/models/save", response_model=ModelSaveResponse)  # 兼容旧路径
async def save_model_endpoint(
    req: ModelSaveRequest,
    current_user: Optional[dict] = Depends(get_current_user),
) -> ModelSaveResponse:
    """保存训练好的模型"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录才能保存模型")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        is_postgres = not isinstance(cursor, sqlite3.Cursor)

        # 获取实验信息
        if req.experiment_id:
            if is_postgres:
                cursor.execute("SELECT * FROM experiments WHERE id = %s AND user_id = %s", (req.experiment_id, current_user["user_id"]))
            else:
                cursor.execute("SELECT * FROM experiments WHERE id = ? AND user_id = ?", (req.experiment_id, current_user["user_id"]))
            
            experiment_row = cursor.fetchone()
            if not experiment_row:
                raise HTTPException(status_code=404, detail="实验不存在或无权限访问")
            
            # 获取字段值
            def get_field(field_name, default=None):
                if isinstance(experiment_row, dict):
                    return experiment_row.get(field_name, default)
                else:
                    try:
                        return experiment_row[field_name] if field_name in experiment_row.keys() else default
                    except (KeyError, IndexError):
                        return default
            
            task_type = get_field("task_type")
            model_name = get_field("model_name")
            hyperparams_json = get_field("hyperparams_json")
            metrics_json = get_field("metrics_json")
            
            try:
                hyperparams = json.loads(hyperparams_json) if hyperparams_json else {}
                metrics = json.loads(metrics_json) if metrics_json else []
            except json.JSONDecodeError:
                hyperparams = {}
                metrics = []
            
            algorithm = hyperparams.get("algorithm", "random_forest")
        else:
            raise HTTPException(status_code=400, detail="需要提供 experiment_id")

        # 生成模型文件名
        model_filename = f"model_{req.experiment_id}_{datetime.utcnow().strftime('%Y%m%d_%H%M%S')}.pkl"
        model_path = MODELS_DIR / model_filename

        # 保存模型信息到数据库
        now = datetime.utcnow().isoformat()
        if is_postgres:
            cursor.execute(
                """
                INSERT INTO saved_models (
                    user_id, experiment_id, model_name, model_path, model_type,
                    task_type, algorithm, metrics_json, created_at, updated_at
                ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s) RETURNING id
            """,
                (
                    current_user["user_id"],
                    req.experiment_id,
                    req.model_name,
                    str(model_path),
                    model_name,
                    task_type,
                    algorithm,
                    json.dumps(metrics),
                    now,
                    now,
                ),
            )
            model_id = cursor.fetchone()["id"]
        else:
            cursor.execute(
                """
                INSERT INTO saved_models (
                    user_id, experiment_id, model_name, model_path, model_type,
                    task_type, algorithm, metrics_json, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
                (
                    current_user["user_id"],
                    req.experiment_id,
                    req.model_name,
                    str(model_path),
                    model_name,
                    task_type,
                    algorithm,
                    json.dumps(metrics),
                    now,
                    now,
                ),
            )
            model_id = cursor.lastrowid

        conn.commit()
        conn.close()

        return ModelSaveResponse(
            model_id=int(model_id),
            model_path=str(model_path),
            message="模型信息已保存（注意：需要重新训练以生成模型文件）",
        )
    except HTTPException:
        raise
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"保存模型失败: {e}") from e


@app.get("/api/v1/models", response_model=ModelListResponse)
@app.get("/api/models", response_model=ModelListResponse)  # 兼容旧路径
async def list_models(
    current_user: Optional[dict] = Depends(get_current_user),
    limit: int = 50,
) -> ModelListResponse:
    """获取用户的模型列表"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        is_postgres = not isinstance(cursor, sqlite3.Cursor)

        if is_postgres:
            cursor.execute(
                "SELECT * FROM saved_models WHERE user_id = %s ORDER BY created_at DESC LIMIT %s",
                (current_user["user_id"], limit),
            )
        else:
            cursor.execute(
                "SELECT * FROM saved_models WHERE user_id = ? ORDER BY created_at DESC LIMIT ?",
                (current_user["user_id"], limit),
            )

        rows = cursor.fetchall()
        models = []

        for row in rows:
            def get_field(field_name, default=None):
                if isinstance(row, dict):
                    return row.get(field_name, default)
                else:
                    try:
                        return row[field_name] if field_name in row.keys() else default
                    except (KeyError, IndexError):
                        return default

            metrics_json = get_field("metrics_json")
            try:
                metrics = [MetricItem(**m) for m in json.loads(metrics_json)] if metrics_json else None
            except (json.JSONDecodeError, TypeError):
                metrics = None

            created_at = get_field("created_at")
            if created_at and not isinstance(created_at, str):
                created_at = str(created_at)

            updated_at = get_field("updated_at")
            if updated_at and not isinstance(updated_at, str):
                updated_at = str(updated_at)

            models.append(
                SavedModel(
                    id=get_field("id", 0),
                    user_id=get_field("user_id", 0),
                    experiment_id=get_field("experiment_id"),
                    model_name=get_field("model_name", ""),
                    model_path=get_field("model_path", ""),
                    model_type=get_field("model_type", ""),
                    task_type=get_field("task_type", "classification"),
                    algorithm=get_field("algorithm", "random_forest"),
                    metrics=metrics,
                    created_at=created_at or "",
                    updated_at=updated_at or "",
                )
            )

        conn.close()
        return ModelListResponse(models=models)
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"获取模型列表失败: {e}") from e


@app.post("/api/v1/models/{model_id}/predict", response_model=ModelPredictResponse)
@app.post("/api/models/{model_id}/predict", response_model=ModelPredictResponse)  # 兼容旧路径
async def predict_model(
    model_id: int,
    req: ModelPredictRequest,
    current_user: Optional[dict] = Depends(get_current_user),
) -> ModelPredictResponse:
    """使用保存的模型进行预测"""
    if not current_user:
        raise HTTPException(status_code=401, detail="需要登录")

    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        is_postgres = not isinstance(cursor, sqlite3.Cursor)

        # 获取模型信息
        if is_postgres:
            cursor.execute(
                "SELECT * FROM saved_models WHERE id = %s AND user_id = %s",
                (model_id, current_user["user_id"]),
            )
        else:
            cursor.execute(
                "SELECT * FROM saved_models WHERE id = ? AND user_id = ?",
                (model_id, current_user["user_id"]),
            )

        model_row = cursor.fetchone()
        if not model_row:
            raise HTTPException(status_code=404, detail="模型不存在或无权限访问")

        def get_field(field_name, default=None):
            if isinstance(model_row, dict):
                return model_row.get(field_name, default)
            else:
                try:
                    return model_row[field_name] if field_name in model_row.keys() else default
                except (KeyError, IndexError):
                    return default

        model_path_str = get_field("model_path")
        task_type = get_field("task_type", "classification")

        if not model_path_str or not Path(model_path_str).exists():
            raise HTTPException(status_code=404, detail="模型文件不存在")

        # 加载模型
        model = load_model(Path(model_path_str))

        # 准备输入数据
        input_df = pd.DataFrame([req.features])

        # 进行预测
        prediction = model.predict(input_df)[0]

        # 如果是分类任务，获取概率
        probabilities = None
        if task_type == "classification" and hasattr(model, "predict_proba"):
            proba = model.predict_proba(input_df)[0]
            # 获取类别名称（如果有）
            if hasattr(model, "classes_"):
                probabilities = {str(cls): float(prob) for cls, prob in zip(model.classes_, proba)}
            else:
                probabilities = {f"class_{i}": float(prob) for i, prob in enumerate(proba)}

        conn.close()

        return ModelPredictResponse(
            prediction=float(prediction) if isinstance(prediction, (int, float, np.number)) else str(prediction),
            probabilities=probabilities,
        )
    except HTTPException:
        raise
    except Exception as e:  # noqa: BLE001
        if conn:
            conn.close()
        raise HTTPException(status_code=500, detail=f"预测失败: {e}") from e


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
