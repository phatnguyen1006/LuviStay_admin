import React from "react";
import { Route, Routes } from "react-router-dom";
import { ADMIN_ROUTE } from "routes/routes.const";

const AdminDashboard = React.lazy(() => import("../Dashboard"));
const AdminLayout = React.lazy(() => import("../Layout"));
const AdminApartment = React.lazy(() => import("../Apartment"));
const AdminUser = React.lazy(() => import("../User"));
const AdminBlog = React.lazy(() => import("../Blog"));
const AdminExportFile = React.lazy(() => import("../ExportFile"));
const AdminSetting = React.lazy(() => import("../Setting"));

const ApartmentInfomation = React.lazy(() => import("../Detail/Apartment"));
const NewApartment = React.lazy(() => import("../Apartment/NewApartment"));
const NewUser = React.lazy(() => import("../User/NewUser"));
const UpdateUser = React.lazy(() => import("../User/UpdateUser"));

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path={`${ADMIN_ROUTE.DASHBOARD}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.APARTMENT}`} element={<AdminApartment />} />
        <Route path={`${ADMIN_ROUTE.APARTMENT_DETAIL}`} element={<ApartmentInfomation />} />
        <Route path={`${ADMIN_ROUTE.APARTMENT_NEW}`} element={<NewApartment />} />
        <Route path={`${ADMIN_ROUTE.USER}`} element={<AdminUser />} />
        <Route path={`${ADMIN_ROUTE.USER_NEW}`} element={<NewUser />} />
        <Route path={`${ADMIN_ROUTE.USER_UPDATE}`} element={<UpdateUser />} />
        <Route path={`${ADMIN_ROUTE.USER_UPDATE}/:id`} element={<UpdateUser />} />
        {/* <Route path={`${ADMIN_ROUTE.USER_REGULAR}`} element={<AdminUser />} /> */}
        {/* <Route path={`${ADMIN_ROUTE.USER_VIP}`} element={<AdminUser />} /> */}
        <Route path={`${ADMIN_ROUTE.BLOG}`} element={<AdminBlog />} />
        <Route path={`${ADMIN_ROUTE.REVENUE}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.REVENUE_MONTH}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.REVENUE_YEAR}`} element={<AdminDashboard />} />
        <Route path={`${ADMIN_ROUTE.EXPORT_FILE}`} element={<AdminExportFile />} />
        <Route path={`${ADMIN_ROUTE.SETTINGS}`} element={<AdminSetting />} />
      </Route>
    </Routes>
  );
}
