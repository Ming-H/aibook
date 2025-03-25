#!/bin/bash

echo "==============================================="
echo "AIBook Studio 依赖安装脚本"
echo "==============================================="

# 安装所有必要的依赖包
echo "正在安装依赖包..."
npm install

# 如果需要@next/mdx，可以取消下面这行的注释
# npm install @next/mdx @mdx-js/loader @mdx-js/react --save-dev

echo "==============================================="
echo "安装完成！"
echo "现在可以使用以下命令启动开发服务器："
echo "npm run dev"
echo "===============================================" 