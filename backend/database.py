"""
数据库模型和连接管理
支持 SQLite（本地开发）和 PostgreSQL/Supabase（生产环境）
"""

from __future__ import annotations

import json
import os
import sqlite3
from datetime import datetime
from pathlib import Path
from typing import Any, Optional

# 尝试导入 PostgreSQL 支持
try:
    import psycopg2
    from psycopg2.extras import RealDictCursor
    PSYCOPG2_AVAILABLE = True
except ImportError:
    PSYCOPG2_AVAILABLE = False

BASE_DIR = Path(__file__).resolve().parent

# 数据库配置
USE_SUPABASE = os.getenv("USE_SUPABASE", "false").lower() == "true"
SUPABASE_DB_URL = os.getenv("SUPABASE_DB_URL", "")
DB_PATH = BASE_DIR / "aibook.db"


class DatabaseConnection:
    """数据库连接管理器，支持 SQLite 和 PostgreSQL"""
    
    def __init__(self):
        self.conn = None
        self.is_postgres = False
        
    def __enter__(self):
        if USE_SUPABASE and SUPABASE_DB_URL and PSYCOPG2_AVAILABLE:
            # 使用 Supabase PostgreSQL
            self.conn = psycopg2.connect(SUPABASE_DB_URL)
            self.conn.cursor_factory = RealDictCursor
            self.is_postgres = True
        else:
            # 使用 SQLite（本地开发）
            self.conn = sqlite3.connect(DB_PATH, check_same_thread=False)
            self.conn.row_factory = sqlite3.Row
            self.is_postgres = False
        return self.conn
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.conn:
            self.conn.close()


def get_db_connection():
    """获取数据库连接（兼容旧代码）"""
    if USE_SUPABASE and SUPABASE_DB_URL and PSYCOPG2_AVAILABLE:
        # 使用 Supabase PostgreSQL
        conn = psycopg2.connect(SUPABASE_DB_URL)
        conn.cursor_factory = RealDictCursor
        return conn
    else:
        # 使用 SQLite（本地开发）
        conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        conn.row_factory = sqlite3.Row
        return conn


def execute_sql(cursor, sql: str, params: Optional[tuple] = None):
    """执行 SQL，兼容 SQLite 和 PostgreSQL"""
    # PostgreSQL 使用 %s，SQLite 使用 ?
    if isinstance(cursor, sqlite3.Cursor):
        # SQLite
        if params:
            return cursor.execute(sql, params)
        else:
            return cursor.execute(sql)
    else:
        # PostgreSQL
        if params:
            # 将 ? 替换为 %s
            sql = sql.replace("?", "%s")
            return cursor.execute(sql, params)
        else:
            return cursor.execute(sql)


def init_db() -> None:
    """初始化数据库表结构"""
    conn = None
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        is_postgres = not isinstance(cursor, sqlite3.Cursor)

        # 用户表
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id SERIAL PRIMARY KEY,
                    email TEXT UNIQUE NOT NULL,
                    hashed_password TEXT NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    email TEXT UNIQUE NOT NULL,
                    hashed_password TEXT NOT NULL,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL
                )
            """)

        # 数据集表
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS datasets (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    name TEXT NOT NULL,
                    file_path TEXT NOT NULL,
                    rows INTEGER NOT NULL,
                    cols INTEGER NOT NULL,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS datasets (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    name TEXT NOT NULL,
                    file_path TEXT NOT NULL,
                    rows INTEGER NOT NULL,
                    cols INTEGER NOT NULL,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)

        # 实验表
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS experiments (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    dataset_id INTEGER REFERENCES datasets(id),
                    name TEXT,
                    task_type TEXT NOT NULL,
                    target_column TEXT NOT NULL,
                    model_name TEXT NOT NULL,
                    hyperparams_json TEXT NOT NULL,
                    metrics_json TEXT NOT NULL,
                    feature_importance_json TEXT,
                    parent_experiment_id INTEGER REFERENCES experiments(id),
                    version INTEGER DEFAULT 1,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS experiments (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    dataset_id INTEGER,
                    name TEXT,
                    task_type TEXT NOT NULL,
                    target_column TEXT NOT NULL,
                    model_name TEXT NOT NULL,
                    hyperparams_json TEXT NOT NULL,
                    metrics_json TEXT NOT NULL,
                    feature_importance_json TEXT,
                    parent_experiment_id INTEGER,
                    version INTEGER DEFAULT 1,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (dataset_id) REFERENCES datasets(id),
                    FOREIGN KEY (parent_experiment_id) REFERENCES experiments(id)
                )
            """)
            # 添加新列（如果不存在，仅 SQLite）
            for col in ["name", "parent_experiment_id", "version"]:
                try:
                    cursor.execute(f"ALTER TABLE experiments ADD COLUMN {col} {'TEXT' if col == 'name' else 'INTEGER'}")
                except sqlite3.OperationalError:
                    pass  # 列已存在

        # 实验分享表（协作功能）
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS experiment_shares (
                    id SERIAL PRIMARY KEY,
                    experiment_id INTEGER REFERENCES experiments(id) ON DELETE CASCADE,
                    shared_by_user_id INTEGER REFERENCES users(id),
                    shared_with_user_id INTEGER REFERENCES users(id),
                    permission TEXT DEFAULT 'read',  -- read, write
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    UNIQUE(experiment_id, shared_with_user_id)
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS experiment_shares (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    experiment_id INTEGER,
                    shared_by_user_id INTEGER,
                    shared_with_user_id INTEGER,
                    permission TEXT DEFAULT 'read',
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (experiment_id) REFERENCES experiments(id) ON DELETE CASCADE,
                    FOREIGN KEY (shared_by_user_id) REFERENCES users(id),
                    FOREIGN KEY (shared_with_user_id) REFERENCES users(id),
                    UNIQUE(experiment_id, shared_with_user_id)
                )
            """)

        # 订阅表
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS subscriptions (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER UNIQUE NOT NULL REFERENCES users(id),
                    plan TEXT NOT NULL DEFAULT 'free',
                    status TEXT NOT NULL DEFAULT 'active',
                    expired_at TIMESTAMP,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS subscriptions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER UNIQUE NOT NULL,
                    plan TEXT NOT NULL DEFAULT 'free',
                    status TEXT NOT NULL DEFAULT 'active',
                    expired_at TEXT,
                    created_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)

        # 工作流结果表
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS workflow_results (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    name TEXT NOT NULL,
                    description TEXT,
                    workflow_config_json TEXT NOT NULL,
                    execution_results_json TEXT,
                    experiment_results_json TEXT,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS workflow_results (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    name TEXT NOT NULL,
                    description TEXT,
                    workflow_config_json TEXT NOT NULL,
                    execution_results_json TEXT,
                    experiment_results_json TEXT,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)

        # 模型表（存储模型文件信息）
        if is_postgres:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS saved_models (
                    id SERIAL PRIMARY KEY,
                    user_id INTEGER REFERENCES users(id),
                    experiment_id INTEGER REFERENCES experiments(id),
                    model_name TEXT NOT NULL,
                    model_path TEXT NOT NULL,
                    model_type TEXT NOT NULL,
                    task_type TEXT NOT NULL,
                    algorithm TEXT NOT NULL,
                    metrics_json TEXT,
                    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
                    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
                )
            """)
        else:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS saved_models (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user_id INTEGER,
                    experiment_id INTEGER,
                    model_name TEXT NOT NULL,
                    model_path TEXT NOT NULL,
                    model_type TEXT NOT NULL,
                    task_type TEXT NOT NULL,
                    algorithm TEXT NOT NULL,
                    metrics_json TEXT,
                    created_at TEXT NOT NULL,
                    updated_at TEXT NOT NULL,
                    FOREIGN KEY (user_id) REFERENCES users(id),
                    FOREIGN KEY (experiment_id) REFERENCES experiments(id)
                )
            """)

        conn.commit()
    except Exception as e:
        if conn:
            conn.rollback()
        raise e
    finally:
        if conn:
            conn.close()


# 初始化数据库（如果不存在）
if not USE_SUPABASE or not SUPABASE_DB_URL:
    # 仅本地 SQLite 需要检查文件存在
    if not DB_PATH.exists():
        init_db()
    else:
        # 即使数据库存在，也确保表结构是最新的（用于开发阶段）
        init_db()
else:
    # Supabase 总是初始化表结构
    init_db()
