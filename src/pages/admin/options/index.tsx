import {
  HomeOutlined,
  HighlightOutlined,
  InsertRowLeftOutlined,
  BarChartOutlined,
  UserOutlined,
  FileTextOutlined,
  SettingOutlined,
  FileExcelOutlined,
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
    title: "Dashboard",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.DASHBOARD}`,
  },
  {
    key: "apartment",
    icon: () => <InsertRowLeftOutlined />,
    title: "Apartment Management",
    endPoint: "/apartment",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT}`,
    // subMenuKey: "apartment_sub",
    // subMenu: [
    //   {
    //     key: "hotel",
    //     title: "Khách sạn",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_HOTEL}`,
    //   },
    //   {
    //     key: "motel",
    //     title: "Nhà nghỉ",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_MOTEL}`,
    //   },
    //   {
    //     key: "resort",
    //     title: "Khu nghỉ dưỡng",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_RESORT}`,
    //   },
    //   {
    //     key: "homestay",
    //     title: "Homestay",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_RESORT}`,
    //   },
    //   {
    //     key: "all",
    //     title: "Tất cả",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.ROOM_RESORT}`,
    //   },
    // ],
  },
  {
    key: "user",
    icon: () => <UserOutlined />,
    title: "User Management",
    endPoint: "/user",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER}`,
    // subMenuKey: "user_sub",
    // subMenu: [
    //   {
    //     key: "regular",
    //     title: "Người dùng thường xuyên",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER_REGULAR}`,
    //   },
    //   {
    //     key: "vip",
    //     title: "Người dùng VIP",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.USER_VIP}`,
    //   },
    // ],
  },
  {
    key: "post",
    icon: () => <FileTextOutlined />,
    title: "Post Management",
    endPoint: "/post",
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
  {
    key: "revenue",
    icon: () => <BarChartOutlined />,
    title: "Revenue Management",
    endPoint: "/revenue",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE}`
    // subMenuKey: "revenue_sub",
    // subMenu: [
    //   {
    //     key: "month",
    //     title: "Month",
    //     path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.REVENUE_MONTH}`,
    //   },
    //   {
    //     key: "year",
    //     title: "Year",
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
    key: "export-file",
    icon: () => <FileExcelOutlined />,
    title: "Export File",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.EXPORT_FILE}`,
  },
  {
    key: "settings",
    icon: () => <SettingOutlined />,
    title: "General Setting",
    path: `${APP_ROUTE.ADMIN}${ADMIN_ROUTE.SETTINGS}`,
  },
];
