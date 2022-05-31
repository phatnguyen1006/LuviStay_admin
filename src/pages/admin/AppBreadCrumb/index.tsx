import { Breadcrumb } from "antd";
import React, { ReactElement } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AppBreadcrumb(): ReactElement {
  const location = useLocation();
  // console.log(location);
  const { pathname } = location;
  const pathnames = pathname.split("/").filter((item) => item);
  // console.log(pathnames);
  if (pathnames.length === 1) return <div style={{ margin: "16px 0" }}></div>;
  return (
    <Breadcrumb style={{ margin: "16px 0" }}>
      {pathnames.map((pathname, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={index}>{pathname}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={index}>
            <Link to={routeTo}>{pathname}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
