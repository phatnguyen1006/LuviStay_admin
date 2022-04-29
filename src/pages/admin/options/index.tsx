import {
  HomeOutlined,
  HighlightOutlined,
  InsertRowLeftOutlined,
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  FileExcelOutlined
} from "@ant-design/icons";
import React, { ReactElement } from "react";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";

export interface IMenuItem {
  key: string;
  icon?: () => ReactElement;
  title: string;
  endPoint?: string;
  category?: string;
  path?: string;
  subMenuKey?: string;
  subMenu?: Array<IMenuItem>;
}

export const menus: Array<IMenuItem> = [
  {
    key: "dashboard",
    icon: () => <HomeOutlined />,
    title: "Trang chủ",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DASHBOARD}`,
  },
  {
    key: "room",
    icon: () => <InsertRowLeftOutlined />,
    title: "Quản lý phòng khách sạn",
    endPoint: "/room",
    subMenuKey: "room_sub",
    subMenu: [
      {
        key: "hotel",
        title: "Khách sạn",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_HOTEL}`,
      },
      {
        key: "motel",
        title: "Nhà nghỉ",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_MOTEL}`,
      },
      {
        key: "resort",
        title: "Khu nghỉ dưỡng",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_RESORT}`,
      },
    ],
  },
  {
    key: "revenue",
    icon: () => <BarChartOutlined />,
    title: "Quản lý doanh thu",
    endPoint: "/revenue",
    subMenuKey: "revenue_sub",
    subMenu: [
      {
        key: "month",
        title: "Doanh thu tháng",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_MONTH}`,
      },
      {
        key: "year",
        title: "Doanh thu năm",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_YEAR}`,
      },
    ],
  },
  {
    key: "user",
    icon: () => <UserOutlined />,
    title: "Quản lý người dùng",
    endPoint: "/user",
    subMenuKey: "user_sub",
    subMenu: [
      {
        key: "regular",
        title: "Người dùng thường xuyên",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER_REGULAR}`,
      },
      {
        key: "vip",
        title: "Người dùng VIP",
        path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER_VIP}`,
      },
    ],
  },
  {
    key: "blog",
    icon: () => <FileTextOutlined />,
    title: "Quản lý blog",
    endPoint: "/blog",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.BLOG}`,
    // subMenuKey: "blog_sub",
    // subMenu: [
    //   {
    //     key: "month",
    //     title: "Doanh thu tháng",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_MONTH}`,
    //   },
    //   {
    //     key: "year",
    //     title: "Doanh thu năm",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_YEAR}`,
    //   },
    // ],
  },
  // {
  //   key: "revenue",
  //   icon: () => <BarChartOutlined />,
  //   title: "Quản lý doanh thu",
  //   endPoint: "/revenue",
  //   subMenuKey: "revenue_sub",
  //   subMenu: [
  //     {
  //       key: "month",
  //       title: "Doanh thu tháng",
  //       path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_MONTH}`,
  //     },
  //     {
  //       key: "year",
  //       title: "Doanh thu năm",
  //       path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_YEAR}`,
  //     },
  //   ],
  // },
  {
		key:"export-file",
		icon: () => <FileExcelOutlined />,
		title:"Xuất file thống kê",
		path:`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.EXPORT_FILE}`
	},
];
