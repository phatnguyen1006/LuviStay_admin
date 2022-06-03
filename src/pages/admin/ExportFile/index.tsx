import { UploadOutlined, FolderOpenOutlined } from "@ant-design/icons";
import React, { ReactElement, useState, useRef, useEffect } from "react";
import { Button } from "antd";
import { CSVLink } from "react-csv";
// import { ideasAPI } from "app/api/ideasApi";
// import { IProps } from "./types";
import "./styles.scss";
import { useQuery } from "react-query";
import { getApartmentQuery, getYearlyRevenueQuery } from "app/query";

enum exportedType {
  apartment = 0,
  revenue = 1,
}

export default function ExportFilePage(): ReactElement {
  const exportApartment = useRef(null);
  const [didApartmentTapped, setdidApartmentTapped] = useState<boolean>(false);
  const [didRevenueTapped, setdidRevenueTapped] = useState<boolean>(false);
  const [flag, setFlag] = useState<exportedType>(null);

  const ApartmentHeaders = [
    { label: "Apartment Name", key: "name" },
    { label: "Street", key: "address.street" },
    { label: "District", key: "address.district" },
    { label: "Province", key: "address.province" },
    { label: "Thumbnail", key: "thumbnail" },
    { label: "Type", key: "type" },
    { label: "Unavailable Now", key: "isDisable" },
    { label: "Waiting to confirm", key: "isPending" },
  ];

  const RevenueHeaders = [
    { label: "Month", key: "month" },
    { label: "Revenue", key: "revenueOfMonth" },
  ];

  const {
    data: apartmentData = [],
    isLoading: isApartmentLoading,
    isError: isApartmentError,
    error: apartmentError,
    isSuccess: isApartmentSuccess,
  } = useQuery("apartments", getApartmentQuery, {
    enabled: didApartmentTapped,
  });
  const {
    data: yearRevenueData = { result: [], totalRevenueMonth: -1 },
    isLoading: isRevenueLoading,
    isSuccess: isRevenueSucces,
    isError: isRevenueError,
    error: revenueError,
  } = useQuery(
    ["revenue", { year: new Date().getFullYear() }],
    getYearlyRevenueQuery,
    { enabled: didRevenueTapped }
  );

  const csvReport =
    flag == 0
      ? {
          data: apartmentData,
          headers: ApartmentHeaders,
          filename: "Apartments_Report.csv",
        }
      : {
          data: yearRevenueData.result,
          headers: RevenueHeaders,
          filename: "Revenue_Report.csv",
        };

  useEffect(() => {
    if (isRevenueSucces === true || isApartmentSuccess === true) {
      exportApartment.current.link.click();
    }
  }, [isRevenueSucces, isApartmentSuccess]);

  return (
    <div className="export-file-container">
      <Button
        disabled={isApartmentLoading}
        onClick={() => {
          setdidApartmentTapped(true);
          setFlag(exportedType.apartment);
        }}
        icon={<FolderOpenOutlined />}
        size="large"
      >
        {isApartmentLoading ? (
          <span>Downloading...</span>
        ) : (
          <span className="text-primary">Apartment Statistic</span>
        )}
      </Button>
      <Button
        disabled={isRevenueLoading}
        onClick={() => {
          {
            setdidRevenueTapped(true);
            setFlag(exportedType.revenue);
          }
        }}
        icon={<FolderOpenOutlined />}
        size="large"
      >
        {isRevenueLoading ? (
          <span>Downloading</span>
        ) : (
          <span className="text-primary">Revenue Statistic</span>
        )}
      </Button>

      <CSVLink {...csvReport} ref={exportApartment} />

      {/* <CSVLink ref={exportApartment} data={flag == 0 ? ideaData : students} headers={flag == 0 ? IdeaHeaders : StudentHeaders} filename={flag == 0 ? "Ideas_Report.csv" : "Students_Report.csv"}/> */}
    </div>
  );
}
