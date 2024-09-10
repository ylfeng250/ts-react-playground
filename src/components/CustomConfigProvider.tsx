import React from "react";
import { ConfigProvider } from "antd";

const CustomConfigProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <ConfigProvider
      getPopupContainer={(triggerNode) => {
        if (triggerNode) {
          return triggerNode.parentNode as HTMLElement;
        }
        return document.body;
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default CustomConfigProvider;
