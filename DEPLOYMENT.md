# Dailyself 部署指南

## 🚀 Vercel 部署步骤

### 1. 准备工作
- 确保项目在本地正常运行
- 检查所有功能是否正常

### 2. 部署到 Vercel

#### 方法一：通过 Vercel 网站
1. 访问 [vercel.com](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New" → "Project"
4. 选择你的 GitHub 仓库
5. 保持默认设置，点击 "Deploy"

#### 方法二：通过 Vercel CLI
```bash
npm i -g vercel
vercel
```

### 3. 环境变量（如需要）
- 无需特殊环境变量
- 所有配置都在代码中

### 4. 构建配置
- 框架：Next.js
- 构建命令：`npm run build`
- 输出目录：`.next`
- 安装命令：`npm install`

## ✅ 部署后检查

1. 访问生成的 Vercel 网址
2. 测试所有页面功能
3. 检查响应式设计
4. 验证动画效果

## 🔧 故障排除

如果部署失败：
1. 检查 `package.json` 中的依赖
2. 确保没有 TypeScript 错误
3. 查看 Vercel 构建日志
