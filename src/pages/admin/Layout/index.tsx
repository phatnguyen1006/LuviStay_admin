import { Layout, Button } from "antd";
import React, { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import AppBreadcrumb from "../AppBreadCrumb";
import SideBar from "../SideBar";
import { useAppDispatch } from "app/redux/store";
import { signOut } from "app/redux/actions";
import "./styles.scss";
import Search from "antd/lib/input/Search";
import { BellOutlined, LogoutOutlined } from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

export default function AdminLayout(): ReactElement {
  const dispatch = useAppDispatch();

  const signOutHanler = () => {
    dispatch(signOut());
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SideBar />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ height: "50px", padding: "0 9px 0 0", lineHeight: 0 }}
        >
          <div className="search-bar-container">
            <Search
              placeholder="Tìm kiếm trên hệ thống"
              enterButton
              size="middle"
            />
          </div>

          <Button
            type="link"
            size="large"
            onClick={() => signOutHanler()}
            icon={<BellOutlined />}
          />
          <Button
            danger
            type="link"
            size="large"
            onClick={() => signOutHanler()}
            icon={<LogoutOutlined />}
          />
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <AppBreadcrumb />
          <div
            className="site-layout-content"
            style={{ padding: 24, minHeight: "85vh" }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
}
