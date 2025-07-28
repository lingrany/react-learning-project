@echo off
chcp 65001 >nul
echo 🚀 开始部署React学习项目到Vercel...

REM 检查是否安装了Vercel CLI
vercel --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Vercel CLI未安装，正在安装...
    npm install -g vercel
)

REM 检查是否已登录Vercel
echo 🔐 检查Vercel登录状态...
vercel whoami >nul 2>&1
if %errorlevel% neq 0 (
    echo 📝 请登录Vercel账户...
    vercel login
)

REM 构建项目
echo 🔨 构建项目...
npm run build

if %errorlevel% equ 0 (
    echo ✅ 项目构建成功！
) else (
    echo ❌ 项目构建失败，请检查错误信息
    pause
    exit /b 1
)

REM 部署到Vercel
echo 🌐 部署到Vercel...
vercel --prod

if %errorlevel% equ 0 (
    echo 🎉 部署成功！
    echo 📱 你的React学习项目已经在线上运行了！
    echo 🔗 访问链接将在上方显示
) else (
    echo ❌ 部署失败，请检查错误信息
    pause
    exit /b 1
)

echo ✨ 部署完成！现在你可以分享这个链接给其他人学习React了！
pause