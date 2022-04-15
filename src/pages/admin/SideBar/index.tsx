import { Layout } from "antd";
import { default as React, ReactElement, useState } from "react";
import SidebarMenu from "../SideBarMenu";
import "./styles.scss";

const { Sider } = Layout;

export default function SideBar(): ReactElement {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      width="25vw"
      collapsible
      collapsed={collapsed}
      onCollapse={() => {
        setCollapsed(!collapsed);
      }}
      theme={"dark"}
    >
      <div className="logo-container">
        <img width={collapsed ? 25 : 100} height={collapsed ? 25 : 100} src="/images/logo-square-primary.png" />
      </div>
      <SidebarMenu />
    </Sider>
  );
}
