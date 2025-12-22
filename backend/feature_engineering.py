"""
特征工程模块：数据清洗和特征变换
"""
from __future__ import annotations

from typing import Dict, List, Optional

import numpy as np
import pandas as pd
from sklearn.preprocessing import (
    LabelEncoder,
    MinMaxScaler,
    RobustScaler,
    StandardScaler,
)


class DataCleaningConfig:
    """数据清洗配置"""
    def __init__(
        self,
        missing_value_strategy: str = "mean",  # mean, median, mode, drop, fill_zero
        handle_outliers: bool = False,
        outlier_method: str = "iqr",  # iqr, zscore
        outlier_threshold: float = 3.0,
    ):
        self.missing_value_strategy = missing_value_strategy
        self.handle_outliers = handle_outliers
        self.outlier_method = outlier_method
        self.outlier_threshold = outlier_threshold


class FeatureTransformConfig:
    """特征变换配置"""
    def __init__(
        self,
        transform_type: str = "standardize",  # standardize, normalize, robust, label_encode
        columns: Optional[List[str]] = None,  # None 表示所有列
    ):
        self.transform_type = transform_type
        self.columns = columns


def clean_data(df: pd.DataFrame, config: DataCleaningConfig) -> pd.DataFrame:
    """
    数据清洗：处理缺失值和异常值
    
    Args:
        df: 输入数据框
        config: 清洗配置
        
    Returns:
        清洗后的数据框
    """
    df_cleaned = df.copy()
    
    # 处理缺失值
    numeric_cols = df_cleaned.select_dtypes(include=[np.number]).columns
    categorical_cols = df_cleaned.select_dtypes(exclude=[np.number]).columns
    
    for col in df_cleaned.columns:
        if df_cleaned[col].isna().sum() > 0:
            if col in numeric_cols:
                if config.missing_value_strategy == "mean":
                    df_cleaned[col].fillna(df_cleaned[col].mean(), inplace=True)
                elif config.missing_value_strategy == "median":
                    df_cleaned[col].fillna(df_cleaned[col].median(), inplace=True)
                elif config.missing_value_strategy == "mode":
                    df_cleaned[col].fillna(df_cleaned[col].mode()[0] if len(df_cleaned[col].mode()) > 0 else 0, inplace=True)
                elif config.missing_value_strategy == "fill_zero":
                    df_cleaned[col].fillna(0, inplace=True)
                elif config.missing_value_strategy == "drop":
                    df_cleaned = df_cleaned.dropna(subset=[col])
            else:  # 类别特征
                if config.missing_value_strategy == "mode":
                    df_cleaned[col].fillna(df_cleaned[col].mode()[0] if len(df_cleaned[col].mode()) > 0 else "unknown", inplace=True)
                elif config.missing_value_strategy == "fill_zero":
                    df_cleaned[col].fillna("unknown", inplace=True)
                elif config.missing_value_strategy == "drop":
                    df_cleaned = df_cleaned.dropna(subset=[col])
    
    # 处理异常值
    if config.handle_outliers:
        for col in numeric_cols:
            if config.outlier_method == "iqr":
                Q1 = df_cleaned[col].quantile(0.25)
                Q3 = df_cleaned[col].quantile(0.75)
                IQR = Q3 - Q1
                lower_bound = Q1 - config.outlier_threshold * IQR
                upper_bound = Q3 + config.outlier_threshold * IQR
                # 将异常值替换为边界值
                df_cleaned[col] = df_cleaned[col].clip(lower=lower_bound, upper=upper_bound)
            elif config.outlier_method == "zscore":
                z_scores = np.abs((df_cleaned[col] - df_cleaned[col].mean()) / df_cleaned[col].std())
                # 将异常值替换为边界值
                df_cleaned.loc[z_scores > config.outlier_threshold, col] = df_cleaned[col].mean()
    
    return df_cleaned


def transform_features(df: pd.DataFrame, config: FeatureTransformConfig) -> pd.DataFrame:
    """
    特征变换：标准化、归一化等
    
    Args:
        df: 输入数据框
        config: 变换配置
        
    Returns:
        变换后的数据框
    """
    df_transformed = df.copy()
    
    # 确定要变换的列
    if config.columns:
        target_cols = [col for col in config.columns if col in df_transformed.columns]
    else:
        # 默认只变换数值列
        target_cols = df_transformed.select_dtypes(include=[np.number]).columns.tolist()
    
    if not target_cols:
        return df_transformed
    
    if config.transform_type == "standardize":
        scaler = StandardScaler()
        df_transformed[target_cols] = scaler.fit_transform(df_transformed[target_cols])
    elif config.transform_type == "normalize":
        scaler = MinMaxScaler()
        df_transformed[target_cols] = scaler.fit_transform(df_transformed[target_cols])
    elif config.transform_type == "robust":
        scaler = RobustScaler()
        df_transformed[target_cols] = scaler.fit_transform(df_transformed[target_cols])
    elif config.transform_type == "label_encode":
        # 只对类别特征进行标签编码
        categorical_cols = [col for col in target_cols if col in df_transformed.select_dtypes(exclude=[np.number]).columns]
        for col in categorical_cols:
            le = LabelEncoder()
            df_transformed[col] = le.fit_transform(df_transformed[col].astype(str))
    
    return df_transformed


def get_cleaning_stats(df_before: pd.DataFrame, df_after: pd.DataFrame) -> Dict:
    """获取清洗统计信息"""
    stats = {
        "rows_before": len(df_before),
        "rows_after": len(df_after),
        "columns_before": len(df_before.columns),
        "columns_after": len(df_after.columns),
        "missing_values_before": int(df_before.isna().sum().sum()),
        "missing_values_after": int(df_after.isna().sum().sum()),
        "dropped_rows": len(df_before) - len(df_after),
    }
    return stats
