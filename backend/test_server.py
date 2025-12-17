#!/usr/bin/env python3
"""快速测试服务器是否能正常启动"""

import sys
from pathlib import Path

# 添加当前目录到路径
sys.path.insert(0, str(Path(__file__).parent))

try:
    print("正在导入模块...")
    from main import app
    print("✓ 模块导入成功")
    
    print("正在检查 FastAPI 应用...")
    assert app is not None
    print("✓ FastAPI 应用创建成功")
    
    print("正在检查路由...")
    routes = [route.path for route in app.routes]
    print(f"✓ 找到 {len(routes)} 个路由")
    for route in routes[:5]:  # 只显示前5个
        print(f"  - {route}")
    
    print("\n✅ 所有检查通过！服务器应该可以正常启动。")
    print("\n启动命令：")
    print("  cd /Users/z/Documents/work/aibook/backend")
    print("  source aibook_env/bin/activate")
    print("  python main.py")
    print("\n或者使用 uvicorn：")
    print("  uvicorn main:app --reload --host 0.0.0.0 --port 8000")
    
except Exception as e:
    print(f"\n❌ 错误：{e}")
    import traceback
    traceback.print_exc()
    sys.exit(1)

