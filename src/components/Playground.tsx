import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import Editor from "@monaco-editor/react";
import * as Babel from "@babel/standalone";
import { twind, cssom, observe, defineConfig } from "@twind/core";
import presetTailwind from "@twind/preset-tailwind";
import * as antd from "antd";
import * as icons from "@ant-design/icons";
import { StyleProvider } from "@ant-design/cssinjs";

const defaultCode = `
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
`;

const Playground: React.FC = () => {
  const [code, setCode] = useState<string>(defaultCode);
  const [CompiledComponent, setCompiledComponent] =
    useState<React.ComponentType | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const rootRef = useRef<any>(null);
  const [shadowContainer, setShadowContainer] = useState<any>();

  useEffect(() => {
    compileAndRender(code);
  }, [code]);

  useEffect(() => {
    if (previewRef.current && CompiledComponent) {
      let shadow = previewRef.current.shadowRoot;
      if (!shadow) {
        shadow = previewRef.current.attachShadow({ mode: "open" });
      }
      setShadowContainer(shadow);

      shadow.innerHTML = "";

      const rootElement = document.createElement("div");
      shadow.appendChild(rootElement);

      // 为 Shadow DOM 创建一个新的 Twind 实例
      const sheet = cssom(new CSSStyleSheet());
      const config = defineConfig({
        presets: [presetTailwind()],
        preflight: false, // 禁用 Tailwind 的预设样式
        theme: {
          extend: {
            // 可以在这里添加自定义主题配置
          },
        },
        rules: [
          // 可以在这里添加自定义规则
        ],
      });
      const tw = twind(config, sheet);

      // 观察 DOM 变化并应用样式
      const cleanupObserver = observe(tw, shadow);

      // 使用 createRoot 替代 ReactDOM.render
      if (!rootRef.current) {
        rootRef.current = createRoot(rootElement);
      }

      rootRef.current.render(
        <StyleProvider container={shadow}>
          <CompiledComponent />
        </StyleProvider>
      );

      // 将生成的样式添加到 Shadow DOM
      if (sheet.target instanceof CSSStyleSheet) {
        shadow.adoptedStyleSheets = [sheet.target];
      }

      // 清理函数
      return () => {
        cleanupObserver(rootRef.current);
        if (rootRef.current) {
          rootRef.current.unmount();
        }
      };
    }
  }, [CompiledComponent]);

  const compileAndRender = (sourceCode: string) => {
    try {
      const transformedCode = Babel.transform(sourceCode, {
        filename: "virtual-file.tsx",
        presets: [
          [
            Babel.availablePresets["typescript"],
            { isTSX: true, allExtensions: true },
          ],
          Babel.availablePresets["react"],
        ],
      }).code;

      const executeCode = new Function(
        "React",
        "antd",
        "icons",
        `
        ${transformedCode}
        return MyComponent;
      `
      );

      const Component = executeCode(React, antd, icons);
      setCompiledComponent(() => Component);
    } catch (error) {
      console.error("编译错误:", error);
      setCompiledComponent(null);
    }
  };

  return (
    <div className="playground">
      <Editor
        height="300px"
        defaultLanguage="typescript"
        defaultValue={code}
        onChange={(value) => setCode(value || "")}
      />
      <div className="preview">
        <h3>预览:</h3>
        <div ref={previewRef}>
          {shadowContainer && (
            <StyleProvider container={shadowContainer}>
              {CompiledComponent ? null : <p>编译错误,请检查代码。</p>}
            </StyleProvider>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playground;
