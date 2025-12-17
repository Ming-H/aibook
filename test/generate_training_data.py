#!/usr/bin/env python3
"""
生成二分类训练数据
- 1000行样本
- 10个特征
- 二分类任务
"""

import pandas as pd
import numpy as np
from sklearn.datasets import make_classification

# 设置随机种子以确保可重复性
np.random.seed(42)

# 生成二分类数据
# n_samples: 样本数
# n_features: 特征数
# n_informative: 信息特征数（对分类有用的特征）
# n_redundant: 冗余特征数（由信息特征线性组合生成）
# n_clusters_per_class: 每个类的簇数
# random_state: 随机种子
X, y = make_classification(
    n_samples=1000,
    n_features=10,
    n_informative=7,  # 7个信息特征
    n_redundant=2,    # 2个冗余特征
    n_repeated=1,     # 1个重复特征
    n_clusters_per_class=1,
    random_state=42,
    class_sep=1.2,    # 类别分离度，值越大越容易分类
)

# 创建DataFrame
feature_names = [f'feature_{i+1}' for i in range(10)]
df = pd.DataFrame(X, columns=feature_names)

# 添加目标列（二分类：0和1）
df['target'] = y

# 重命名目标列为更有意义的名称
df = df.rename(columns={'target': 'label'})

# 保存为CSV文件
output_file = 'test/training_data.csv'
df.to_csv(output_file, index=False)

print(f"✓ 成功生成训练数据: {output_file}")
print(f"  - 样本数: {len(df)}")
print(f"  - 特征数: {len(df.columns) - 1}")
print(f"  - 目标列: label")
print(f"  - 类别分布:")
print(f"    - 类别 0: {sum(df['label'] == 0)} 个样本")
print(f"    - 类别 1: {sum(df['label'] == 1)} 个样本")
print(f"\n前5行数据预览:")
print(df.head())
print(f"\n数据统计信息:")
print(df.describe())
