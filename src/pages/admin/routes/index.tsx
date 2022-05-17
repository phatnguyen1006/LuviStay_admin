import React from "react";
import { Route, Routes } from "react-router-dom";
import { ADMIN_ROUTE } from "routes/routes.const";

const AdminDashboard = React.lazy(() => import("../Dashboard"));
const AdminLayout = React.lazy(() => import("../Layout"));
const AdminExportFile = React.lazy(() => import("../ExportFile"));
const AdminSetting = React.lazy(() => import("../Setting"));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={`${ADMIN_ROUTE.DASHBOARD}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.APARTMENT}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.USER}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.USER_REGULAR}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.USER_VIP}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.BLOG}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.REVENUE}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.REVENUE_MONTH}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.REVENUE_YEAR}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.EXPORT_FILE}`} element={<AdminExportFile />} />
        <Route path={`${ADMIN_ROUTE.SETTINGS}`} element={<AdminSetting />} />
      </Route>
    </Routes>
  );
}
