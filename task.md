# Tasks - Dailyself · 自由仪式

## Phase 0: 初始化

### T0.1 创建项目（Next.js + Tailwind）

在终端输入以下命令创建项目：

```bash
npx create-next-app@latest dailyself --ts --tailwind --eslint --app --src-dir --use-npm --import-alias "@/*"
cd dailyself
npm run dev
```

打开浏览器访问 http://localhost:3000

**验收标准：**
- 可以访问到 Next.js 默认首页
- 项目目录中存在 `app/`, `tailwind.config.ts`, `postcss.config.js`, `globals.css`

### T0.2 安装动效库与图标库

在终端执行：

```bash
npm install framer-motion lucide-react
```

重新运行项目：

```bash
npm run dev
```

**验收标准：**
- 无报错，`npm ls framer-motion` 显示版本号
- 浏览器中页面正常加载

## Phase 1: 页面结构与导航

### T1.1 创建基础文件结构

在 `app/` 目录下创建以下文件夹：

```
app/
├─ page.tsx              # 首页
├─ scene/page.tsx
├─ sense/page.tsx
├─ system/page.tsx
├─ about/page.tsx
└─ components/
    ├─ Navbar.tsx
    └─ Footer.tsx
```

在 `components/Navbar.tsx` 中添加简单导航：

```tsx
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex justify-center gap-6 py-4 text-sm font-medium">
      <Link href="/">Home</Link>
      <Link href="/scene">Scene</Link>
      <Link href="/sense">Sense</Link>
      <Link href="/system">System</Link>
      <Link href="/about">About</Link>
    </nav>
  );
}
```

在 `app/layout.tsx` 中引入导航与页脚：

```tsx
import "./globals.css";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body className="bg-brand-bg text-gray-900">
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
        <footer className="text-center text-xs text-gray-500 py-10">
          © Dailyself 2025
        </footer>
      </body>
    </html>
  );
}
```

**验收标准：**
- 能通过导航栏切换页面
- 每个页面正常显示独立内容

## Phase 2: 首页与内容框架

### T2.1 创建首页 Hero 区域

在 `app/page.tsx` 中添加：

```tsx
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-[80vh] flex flex-col justify-center items-center text-center"
    >
      <h1 className="text-4xl font-serif mb-4">在日常中，与自我温柔对话</h1>
      <p className="text-gray-600 mb-8">
        Dailyself · 自由仪式，一个关于生活节奏、感知与系统的个人基地。
      </p>
      <div className="flex gap-6 text-sm">
        <a href="/scene" className="hover:text-brand-scene">Scene</a>
        <a href="/sense" className="hover:text-brand-sense">Sense</a>
        <a href="/system" className="hover:text-brand-system">System</a>
      </div>
    </motion.section>
  );
}
```

**验收标准：**
- 首页加载有淡入动画效果
- 点击按钮能跳转到对应页面

### T2.2 三大模块页面（Scene / Sense / System）

在每个页面文件中添加静态内容结构，例如 `scene/page.tsx`：

```tsx
export default function Scene() {
  return (
    <section className="py-20">
      <h2 className="text-3xl font-serif mb-6 text-brand-scene">Scene · 我所抵达的现场</h2>
      <p className="text-gray-600">这里记录我在城市漫游与空间体验中的观察与感受。</p>
    </section>
  );
}
```

复制并修改标题、描述用于 `sense/page.tsx` 与 `system/page.tsx`。

**验收标准：**
- 三个页面均能正常访问
- 各自标题与介绍显示正确

## Phase 3: 响应式与动效

### T3.1 响应式布局测试

在 `globals.css` 添加：

```css
body {
  font-family: 'Noto Serif SC', 'Microsoft YaHei', serif;
}
img {
  max-width: 100%;
  height: auto;
}
```

使用浏览器开发者工具查看移动端适配。

**验收标准：**
- 页面在手机模拟器中无横向滚动
- 文本与导航在移动端居中显示

### T3.2 页面切换平滑动效

在 `layout.tsx` 中引入 Framer Motion 动画包裹：

```tsx
"use client";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <html lang="zh">
      <body className="bg-brand-bg text-gray-900">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {children}
          </motion.main>
        </AnimatePresence>
      </body>
    </html>
  );
}
```

**验收标准：**
- 页面切换时有平滑淡入淡出效果
- 动画运行流畅无闪烁

## Phase 4: 部署上线

### T4.1 部署到 Vercel

1. 登录 https://vercel.com
2. 点击 Add New → Project
3. 选择 dailyself 仓库
4. 保持默认设置，点击 Deploy

**验收标准：**
- 访问 Vercel 生成的网址能打开网站
- 所有页面加载正常且响应式

---

## ✅ 完成状态

到此为止，你已完成 Dailyself 网站的 MVP 版本。之后可进入未来功能阶段：Newsletter 订阅、画廊展示、黑白模式切换等。

---

## 💡 使用说明

1. 打开 VS Code / Cursor
2. 新建文件，粘贴以上内容
3. 保存为 `tasks.md`
4. 之后可以在 Cursor 中直接执行每个任务块（例如 `T0.1`、`T1.1` 等）一步步构建项目
