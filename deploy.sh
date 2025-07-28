#!/bin/bash

# React学习项目 - Vercel部署脚本
# 使用方法：./deploy.sh

echo "🚀 开始部署React学习项目到Vercel..."

# 检查是否安装了Vercel CLI
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI未安装，正在安装..."
    npm install -g vercel
fi

# 检查是否已登录Vercel
echo "🔐 检查Vercel登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "📝 请登录Vercel账户..."
    vercel login
fi

# 构建项目
echo "🔨 构建项目..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ 项目构建成功！"
else
    echo "❌ 项目构建失败，请检查错误信息"
    exit 1
fi

# 部署到Vercel
echo "🌐 部署到Vercel..."
vercel --prod

if [ $? -eq 0 ]; then
    echo "🎉 部署成功！"
    echo "📱 你的React学习项目已经在线上运行了！"
    echo "🔗 访问链接将在上方显示"
else
    echo "❌ 部署失败，请检查错误信息"
    exit 1
fi

echo "✨ 部署完成！现在你可以分享这个链接给其他人学习React了！"