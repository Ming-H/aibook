# Conda 环境使用说明

## 环境信息

- **环境名称**: `aibook_env`
- **Python 版本**: 3.9
- **环境路径**: `/opt/anaconda3/envs/aibook_env`

## 激活环境

```bash
conda activate aibook_env
```

或者使用完整路径：

```bash
source $(conda info --base)/etc/profile.d/conda.sh
conda activate aibook_env
```

## 安装的包

所有必需的包已安装在 conda 环境中：

- `fastapi==0.115.0` - Web 框架
- `uvicorn==0.30.6` - ASGI 服务器
- `python-multipart==0.0.9` - 文件上传支持
- `pydantic==2.9.2` - 数据验证
- `pandas==2.2.3` - 数据处理
- `scikit-learn==1.5.2` - 机器学习
- `pyjwt==2.8.0` - JWT 认证
- `bcrypt==4.1.2` - 密码加密

## 运行后端服务器

激活环境后，运行：

```bash
cd /Users/z/Documents/work/aibook/backend
conda activate aibook_env
python main.py
```

或者使用完整路径：

```bash
/opt/anaconda3/envs/aibook_env/bin/python /Users/z/Documents/work/aibook/backend/main.py
```

## 验证安装

检查所有包是否正确安装：

```bash
conda activate aibook_env
python -c "import fastapi, uvicorn, pandas, sklearn, jwt, bcrypt, pydantic; print('所有包已安装！')"
```

## 更新包

如果需要更新包：

```bash
conda activate aibook_env
pip install --upgrade -r requirements.txt
```

## 删除环境

如果需要删除环境：

```bash
conda deactivate
conda env remove -n aibook_env
```
