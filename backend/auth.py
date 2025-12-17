"""
用户认证相关功能
使用 bcrypt 进行密码哈希（需要在 requirements.txt 中添加 bcrypt）
"""

from __future__ import annotations

import hashlib
import sqlite3
from datetime import datetime, timedelta
from typing import Optional

import jwt
from database import get_db_connection, execute_sql

# 简单的 JWT 密钥（生产环境应使用环境变量）
JWT_SECRET = "aibook-secret-key-change-in-production"
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24 * 7  # 7 天


def hash_password(password: str) -> str:
    """简单的密码哈希（生产环境应使用 bcrypt）"""
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    """验证密码"""
    return hash_password(password) == hashed


def create_user(email: str, password: str) -> dict:
    """创建新用户"""
    conn = get_db_connection()
    cursor = conn.cursor()
    is_postgres = not isinstance(cursor, sqlite3.Cursor)

    # 检查邮箱是否已存在
    if is_postgres:
        cursor.execute("SELECT id FROM users WHERE email = %s", (email,))
    else:
        cursor.execute("SELECT id FROM users WHERE email = ?", (email,))
    if cursor.fetchone():
        conn.close()
        raise ValueError("该邮箱已被注册")

    hashed = hash_password(password)
    now = datetime.utcnow().isoformat()

    if is_postgres:
        cursor.execute(
            "INSERT INTO users (email, hashed_password, created_at, updated_at) VALUES (%s, %s, %s, %s) RETURNING id",
            (email, hashed, now, now),
        )
        user_id = cursor.fetchone()["id"]
    else:
        cursor.execute(
            "INSERT INTO users (email, hashed_password, created_at, updated_at) VALUES (?, ?, ?, ?)",
            (email, hashed, now, now),
        )
        user_id = cursor.lastrowid

    # 创建默认免费订阅
    if is_postgres:
        cursor.execute(
            "INSERT INTO subscriptions (user_id, plan, status, created_at) VALUES (%s, %s, %s, %s)",
            (user_id, "free", "active", now),
        )
    else:
        cursor.execute(
            "INSERT INTO subscriptions (user_id, plan, status, created_at) VALUES (?, ?, ?, ?)",
            (user_id, "free", "active", now),
        )

    conn.commit()
    conn.close()

    return {"id": user_id, "email": email}


def authenticate_user(email: str, password: str) -> Optional[dict]:
    """验证用户凭据"""
    conn = get_db_connection()
    cursor = conn.cursor()
    is_postgres = not isinstance(cursor, sqlite3.Cursor)

    if is_postgres:
        cursor.execute("SELECT id, email, hashed_password FROM users WHERE email = %s", (email,))
    else:
        cursor.execute("SELECT id, email, hashed_password FROM users WHERE email = ?", (email,))
    row = cursor.fetchone()
    conn.close()

    if not row:
        return None

    if is_postgres:
        user_id = row["id"]
        user_email = row["email"]
        hashed = row["hashed_password"]
    else:
        user_id, user_email, hashed = row
    
    if not verify_password(password, hashed):
        return None

    return {"id": user_id, "email": user_email}


def create_access_token(user_id: int, email: str) -> str:
    """创建 JWT token"""
    payload = {
        "user_id": user_id,
        "email": email,
        "exp": datetime.utcnow() + timedelta(hours=JWT_EXPIRATION_HOURS),
        "iat": datetime.utcnow(),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


def verify_token(token: str) -> Optional[dict]:
    """验证 JWT token"""
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return {"user_id": payload["user_id"], "email": payload["email"]}
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None

