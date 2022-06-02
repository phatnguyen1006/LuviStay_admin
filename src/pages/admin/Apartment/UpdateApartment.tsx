import { ReactElement, useEffect, useState } from "react";
import { Button, message, Spin, Steps } from "antd";
import { UpdateAparemtForm } from "components/forms";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Apartment } from "app/model";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { getOneApartmentQuery } from "app/query";
import { useQuery } from "react-query";
import "./styles.scss";

export default function NewApartment(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: apartmentID } = useParams();

  const state = (location.state as Apartment) || null;

  const {
    data: apartmentData = state,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useQuery(["", apartmentID], getOneApartmentQuery, {
    enabled: !state,
  });

  const refetchApartmentData = (): void => {
    refetch();
  };

  useEffect(() => {
    if (!apartmentID) {
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT}`);
      return;
    }
  }, []);

  if (isError) {
    message.error(error.toString());
    return <></>;
  }

  return (
    <div className="update-apartment-page">
      {isLoading ? (
        <Spin />
      ) : (
        apartmentData && <UpdateAparemtForm apartment={apartmentData} />
      )}
    </div>
  );
}
