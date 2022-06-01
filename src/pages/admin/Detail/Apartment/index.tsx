import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Collapse, message, Rate, Space, Spin, Tag } from "antd";
import { Apartment, Room } from "app/model";
import { ReactElement } from "react";
import { parseAddress } from "app/utils/extension";
import { useQuery } from "react-query";
import { getOneApartmentQuery, getRoomsofApartmentQuery } from "app/query";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import "./styles.scss";

const PicturesCollection = React.lazy(
  () => import("components/collection/PictureCollection")
);

const { Panel } = Collapse;

export default function ApartmentDetailPage(): ReactElement {
  const location = useLocation();
  const navigate = useNavigate();
  const { id: apartmentID } = useParams();

  const [state, setState] = useState<Apartment>(
    (location.state as Apartment) || null
  );

  const {
    data: rooms = [],
    isFetching: isRoomFetching,
    isLoading: isRoomLoading,
    error: roomError,
    isError: isRoomError,
    refetch: roomRefetch,
  } = useQuery(["apartment-room", apartmentID], getRoomsofApartmentQuery);

  console.log(rooms);

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    roomRefetch();
  }, [state]);

  useEffect(() => {
    if (!apartmentID) {
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT}`);
      return;
    }

    if (!state) {
      // refetch
      console.log("✈️✈️ Refetch apartment data from id");

      (async () => {
        setLoading(true);
        await getOneApartmentQuery("apartment-detail", apartmentID).then(
          (res) => {
            setState(res);
            setLoading(false);
          }
        );
      })();
    }

    // roomRefetch();
  }, []);

  if (isRoomError) {
    message.error(roomError.toString());
  }

  const Loader: React.FC = () => {
    return (
      <div className="loader-container">
        <div className="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    );
  };

  const SpinLoader: React.FC = () => {
    return (
      <div className="example">
        <Spin />
      </div>
    );
  };

  return loading ? (
    <Loader />
  ) : (
    state && (
      <div className="apartment-detail-page-container">
        <h2 style={{ marginBottom: 30, color: "#c1b086" }}>{state.name}</h2>
        <div className="center-thumbnail">
          <img src={state.thumbnail} alt="Apartment hotel thumbnail" />
        </div>
        <div className="sub-information-container">
          <p>
            <strong>Address: </strong> {parseAddress(state.address, "province")}
          </p>
          <section className="other-information">
            <Space>
              <Tag color="geekblue">{state.type}</Tag>
              <Rate value={state.rating ?? 4} />
            </Space>
          </section>
        </div>
        <Collapse accordion>
          <Panel header={<strong>Description</strong>} key="1">
            <div
              className="detail-description"
              dangerouslySetInnerHTML={{ __html: state.description }}
            ></div>
          </Panel>
          <Panel header={<strong>Pictures</strong>} key="3">
            <PicturesCollection pictures={state.pictures} />
          </Panel>
        </Collapse>
        <div className="room-table-container">
          <strong>Rooms</strong>
          {isRoomLoading ? (
            <SpinLoader />
          ) : rooms.length > 0 ? (
            rooms.map((room, index) => <p key={index}>{room.name}</p>)
          ) : (
            <p>
              <strong>Hiện không có phòng</strong>
            </p>
          )}
        </div>
      </div>
    )
  );
}
