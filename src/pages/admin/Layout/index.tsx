import { Layout, Button } from "antd";
import React, { ReactElement, useState } from "react";
import { Outlet } from "react-router-dom";
import AppBreadcrumb from "../AppBreadCrumb";
import SideBar from "../SideBar";
import { useAppDispatch } from "app/redux/store";
import { signOut } from "app/redux/actions";
import "./styles.scss";

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
				<Header className="site-layout-background" style={{ height: "45px", padding: 0 }} >
					<Button type="link" size="large" onClick={() => signOutHanler()}>
						Đăng xuất
					</Button>
				</Header>
				<Content style={{ margin: "0 16px" }}>
					<AppBreadcrumb />
					<div className="site-layout-background" style={{ padding: 24, minHeight: "75vh" }}>
						<Outlet />
					</div>
				</Content>
				<Footer style={{ textAlign: "center" }}></Footer>
			</Layout>
		</Layout>
	);
};