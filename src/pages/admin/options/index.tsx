import {
  HomeOutlined,
  HighlightOutlined,
  BookOutlined,
  SoundOutlined,
  TeamOutlined,
  DeploymentUnitOutlined,
  FileExcelOutlined,
  InsertRowLeftOutlined,
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
    icon: () => <HighlightOutlined />,
    title: "Quản lý khách sạn",
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
];
