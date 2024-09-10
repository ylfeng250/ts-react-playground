# Ant Design 5 + Tailwind CSS Playground

这是一个交互式的代码编辑器和预览工具,允许用户在浏览器中实时编写、编译和预览使用 Ant Design 5 和 Tailwind CSS 的 React 组件。

## 功能特点

- 实时代码编辑和预览
- 支持 TypeScript 和 JSX 语法
- 集成 Ant Design 5 组件库
- 支持 Tailwind CSS 样式
- 在 Shadow DOM 中渲染组件,确保样式隔离
- 使用 @twind/core 进行运行时 Tailwind CSS 处理

## 技术栈

- React
- TypeScript
- Ant Design 5
- Tailwind CSS
- @twind/core
- @monaco-editor/react
- Babel (用于实时代码转译)

## 使用方法

1. 在代码编辑器中编写您的 React 组件。
2. 使用 Ant Design 组件和 Tailwind CSS 类来设计您的 UI。
3. 实时预览您的组件在右侧的预览窗口中。

## 示例代码
可渲染的实例代码

```tsx
const MyComponent: React.FC = () => {
  const { Button, DatePicker, Tooltip } = antd;
  const { SmileOutlined } = icons;

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <h2 className="text-xl font-bold mb-4">Ant Design 组件示例</h2>
      <Tooltip title="这是一个提示" getPopupContainer={(triggerNode) => triggerNode.parentNode}>
        <Button type="primary" icon={<SmileOutlined />} className="bg-blue-500">悬停我</Button>
      </Tooltip>
      <DatePicker className="mt-4 border-green-500" getPopupContainer={(triggerNode) => triggerNode.parentNode} />
    </div>
  );
};

MyComponent;
```

## 注意事项

- Ant Design 的样式优先级高于 Tailwind CSS,这允许您在保持 Ant Design 组件外观的同时使用 Tailwind 进行轻量级自定义。
- 对于需要弹出层的组件(如 Tooltip、DatePicker 等),请使用 `getPopupContainer` 属性确保弹出层正确渲染在 Shadow DOM 中。

## 本地开发

1. 克隆此仓库
2. 运行 `npm install` 安装依赖
3. 运行 `npm start` 启动开发服务器
4. 在浏览器中打开 `http://localhost:3000` 查看 Playground

## 贡献

欢迎提交 issues 和 pull requests 来改进这个项目!

## 可以继续考虑的事情

1. 改进导入语法
   - 问题：当前无法使用 `import` 语句，导致代码与传统 React 组件写法不一致。
   - 当前写法：`const { Button, DatePicker, Tooltip } = antd;`
   - 期望写法：`import { Button, DatePicker, Tooltip } from 'antd';`
   - 可能的解决方案：
     - 使用 Babel 插件来转换 import 语句
     - 实现一个自定义的模块解析系统

2. 简化 Shadow DOM 中的弹出层处理
   - 问题：需要为每个弹出层组件添加 `getPopupContainer` 属性，这不符合常规使用方式。
   - 当前写法：`<Tooltip getPopupContainer={(triggerNode) => triggerNode.parentNode}>`
   - 可能的解决方案：
     - 实现一个自定义的 Ant Design 配置提供器，统一处理弹出层渲染
     - 修改 Shadow DOM 的实现方式，探索使用 CSS 作用域而非 Shadow DOM

3. 优化代码编辑器体验
   - 添加语法高亮
   - 实现代码自动完成功能
   - 添加错误提示和类型检查

4. 改进错误处理和显示
   - 实现更详细的错误信息展示
   - 添加行号和错误位置指示

5. 支持多文件编辑
   - 允许用户创建和编辑多个文件
   - 实现文件间的导入导出功能

6. 添加状态持久化
   - 实现代码的本地存储功能
   - 添加代码分享功能（生成可分享的链接）

7. 优化性能
   - 实现代码编译的防抖处理
   - 探索使用 Web Workers 进行代码编译

8. 增强 Tailwind CSS 支持
   - 添加 Tailwind CSS 类名自动完成功能
   - 实现 Tailwind CSS 配置的实时预览

9. 改进 UI/UX
   - 添加暗黑模式支持
   - 实现可调整的布局（如可拖动的分隔栏）

10. 添加更多功能
    - 支持 npm 包的动态导入
    - 实现自定义 Babel 插件的支持
    - 添加单元测试支持