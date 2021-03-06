import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Collapse,
  Input,
  message,
  Rate,
  Space,
  Spin,
  Table,
  Tag,
  Image,
  Popconfirm,
} from "antd";
import type { InputRef } from "antd";
import { Apartment, Room } from "app/model";
import { ReactElement } from "react";
import { numberWithCommas, parseAddress } from "app/utils/extension";
import { useMutation, useQuery } from "react-query";
import { getOneApartment, getRoomsofApartmentQuery } from "app/query";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  UndoOutlined,
} from "@ant-design/icons";
import { ColumnType, FilterConfirmProps } from "antd/lib/table/interface";
import Highlighter from "react-highlight-words";
import RoomDetail from "components/modal/RoomDetail";
import "./styles.scss";
import { deleteOneRoomMutation, activeOneRoomMutation } from "app/mutation";
import Snipper from "components/Snipper";

const PicturesCollection = React.lazy(
  () => import("components/collection/PictureCollection")
);

const { Panel } = Collapse;

interface DataType {
  _id: string;
  name: string;
  capacity: string;
  square: string;
  status: boolean;
  price: number;
}

type DataIndex = keyof DataType;

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

  const { mutate: activeRoomMutate, isLoading: isActiveLoading } = useMutation(
    activeOneRoomMutation,
    {
      onSuccess: () => {
        message.success("Active room successfully");
        refetchRoomData();
      },
      onError: () => {
        message.error("Failed to active room. Please try again");
      },
    }
  );

  const { mutate: deleteRoomMutate, isLoading: isDeleteLoading } = useMutation(
    deleteOneRoomMutation,
    {
      onSuccess: () => {
        message.success("Delete room successfully");
        refetchRoomData();
      },
      onError: () => {
        message.error("Failed to delete room. Please try again");
      },
    }
  );

  const [visible, setVisible] = useState<boolean>();
  const [currentEditingRoom, setEditingCurrentRoom] = useState<Room>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // modal func
  const showModal = (data: Room) => {
    setEditingCurrentRoom(data);
    setVisible(true);
  };

  const hideModal = () => {
    setEditingCurrentRoom(null);
    setVisible(false);
  };

  const refetchRoomData = () => {
    roomRefetch();
  };

  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  const getColumnSearchProps = (
    dataIndex: DataIndex
  ): ColumnType<DataType> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys as string[], confirm, dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Capacity (person)",
      dataIndex: "capacity",
      key: "capacity",
      render: (p) => <p>{p}</p>,
    },
    {
      title: "Square (m^2)",
      dataIndex: "square",
      key: "square",
    },
    {
      title: "Status",
      dataIndex: "isDisable",
      key: "isDisable",
      render: (status) => {
        let color = "green";
        if (status) color = "volcano";
        return <Tag color={color}>{status ? "Unavailable" : "Available"}</Tag>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price: number) => <p>{numberWithCommas(price)} VN??</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a style={{ color: "#c1b086" }} onClick={() => showModal(record)}>
            <EditOutlined title="Update" />
          </a>

          {record.isDisable ? (
            <a
              onClick={() => {
                if (record.isDisable) {
                  setEditingCurrentRoom(record._id);
                  activeRoomMutate(record._id);
                }
              }}
            >
              {isActiveLoading && currentEditingRoom == record._id ? (
                <Snipper />
              ) : (
                <UndoOutlined title="Active" />
              )}
            </a>
          ) : (
            <Popconfirm
              placement="top"
              title={"Are you sure to delete?"}
              onConfirm={() => {
                if (!record.isDisable) {
                  setEditingCurrentRoom(record._id);
                  deleteRoomMutate(record._id);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <a style={{ color: "red" }}>
                {isDeleteLoading && currentEditingRoom == record._id ? (
                  <Snipper />
                ) : (
                  <DeleteOutlined
                    title={record.isDisable ? "Disabled" : "Disable"}
                  />
                )}
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log("recall");
    refetchRoomData();
  }, [state]);

  useEffect(() => {
    if (!apartmentID) {
      navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT}`);
      return;
    }

    if (!state) {
      // refetch
      console.log("???????????? Refetch apartment data from id");

      (async () => {
        setLoading(true);
        await getOneApartment(null, apartmentID).then((res) => {
          setState(res);
          setLoading(false);
        });
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
          <Image
            alt="Apartment hotel thumbnail"
            className="photo-content"
            width={200}
            src={state.thumbnail}
          />
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
          <Panel header={<strong>Pictures</strong>} key="2">
            <PicturesCollection pictures={state.pictures} />
          </Panel>
        </Collapse>
        <div className="room-table-container">
          <strong>Rooms:</strong>
          {isRoomLoading ? (
            <SpinLoader />
          ) : rooms.length > 0 ? (
            <Table rowKey={"_id"} dataSource={rooms} columns={columns} />
          ) : (
            <p style={{ color: "gray", textAlign: "center" }}>
              <strong>Hi???n kh??ng c?? ph??ng</strong>
            </p>
          )}
        </div>
        <RoomDetail
          visible={visible}
          hideModal={hideModal}
          currentRoom={currentEditingRoom}
          refetchRoomData={refetchRoomData}
        />
      </div>
    )
  );
}
