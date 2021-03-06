import { ReactElement, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  Tabs,
  Table,
  Button,
  Space,
  Tag,
  message,
  Input,
  Popconfirm,
} from "antd";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/lib/table/interface";
import {
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  FileTextOutlined,
  UndoOutlined,
  StopOutlined,
} from "@ant-design/icons";
import { GoPlus } from "react-icons/go";
import Highlighter from "react-highlight-words";
import { ApartmentStatus } from "./types";
import type { ColumnsType, ColumnType } from "antd/lib/table";
import ApartmentDetail from "components/modal/ApartmentDetail";
import { ADMIN_ROUTE, APP_ROUTE } from "routes/routes.const";
import { Apartment, IAddress, TagType } from "app/model";
import { IFlag, parseAddress } from "app/utils/extension";
import { getApartmentQuery } from "app/query";
import {
  acceptOneApartment,
  activeOneApartmentMutation,
  denyOneApartment,
  disableOneApartmentMutation,
} from "app/mutation";
import Snipper from "components/Snipper";
import "./styles.scss";

const { TabPane } = Tabs;

interface DataType {
  id: string;
  name: string;
  tags: number;
  address: string;
}

type DataIndex = keyof DataType;

export default function ApartmentPage(): ReactElement {
  const {
    data: apartments = [],
    isLoading,
    error,
    isError,
    refetch,
  } = useQuery(["apartments", 1], getApartmentQuery);

  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useMutation(
    disableOneApartmentMutation,
    {
      onSuccess: () => {
        message.success("Disable apartment successfully");
        refetchApartmentData();
      },
      onError: () => {
        message.error("Failed to disable apartment. Please try again");
      },
    }
  );
  const { mutate: activeMutate, isLoading: isActiveLoading } = useMutation(
    activeOneApartmentMutation,
    {
      onSuccess: () => {
        message.success("Active apartment successfully");
        refetchApartmentData();
      },
      onError: () => {
        message.error("Failed to Delete apartment. Please try again");
      },
    }
  );
  const { mutate: acceptMutate, isLoading: isAccepting } = useMutation(
    acceptOneApartment,
    {
      onSuccess: () => {
        message.success("Confirm apartment successfully");
        refetchApartmentData();
      },
      onError: () => {
        message.error("Failed to confirm apartment. Please try again");
      },
    }
  );
  const { mutate: denyMutate, isLoading: isDenyLoading } = useMutation(
    denyOneApartment,
    {
      onSuccess: () => {
        message.success("Deny apartment successfully");
        refetchApartmentData();
      },
      onError: () => {
        message.error("Failed to deny apartment. Please try again");
      },
    }
  );

  const location = useLocation();
  const navigate = useNavigate();

  const [reload, setReload] = useState<boolean>(false);
  const [visible, setVisible] = useState(false);
  const [idLoading, setIDLoading] = useState<string>();

  // confirm delete apartment
  const [currentDeletedApartment, setCurrentDeletedApartment] =
    useState<Apartment>();

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef<InputRef>(null);

  const refetchApartmentData = (): void => {
    refetch();
  };

  // modal func
  const showModal = (data) => {
    setCurrentDeletedApartment(data);
    setVisible(true);
  };

  const hideModal = () => {
    setVisible(false);
  };

  function callback(key) {
    // console.log(key);
  }

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

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
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: IAddress) => (
        <p>{parseAddress(address, IFlag.province)}</p>
      ),
    },
    {
      title: "Types",
      key: "type",
      dataIndex: "type",
      filters: [
        {
          text: `${TagType.hotel}`,
          value: `${TagType.hotel}`,
        },
        {
          text: `${TagType.motel}`,
          value: `${TagType.motel}`,
        },
        {
          text: `${TagType.resort}`,
          value: `${TagType.resort}`,
        },
        {
          text: `${TagType.homestay}`,
          value: `${TagType.homestay}`,
        },
      ],
      onFilter: (value, record) => record.type.includes(value),
      render: (type) => {
        let color = "green";
        if (type === TagType.hotel) {
          color = "orange";
        } else if (type === TagType.motel) {
          color = "geekblue";
        } else if (type === TagType.resort) {
          color = "cyan";
        } else if (type === TagType.homestay) {
          color = "magenta";
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      key: "isDisable",
      dataIndex: "isDisable",
      filters: [
        {
          text: "Unavailable",
          value: true,
        },
        {
          text: "Available",
          value: false,
        },
      ],
      onFilter: (value, record) => record.isDisable === value,
      render: (isDisable) => {
        let color = "green";
        if (isDisable === true) {
          color = "volcano";
        }
        return (
          <Tag color={color} key={isDisable}>
            {isDisable ? "Unavailable" : "Available"}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_UPDATE}/${record._id}`}
            state={record}
          >
            <EditOutlined title="Update" />
          </Link>
          <Link
            to={`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_DETAIL}/${record._id}`}
            style={{ color: "lightgreen" }}
            state={record}
          >
            <FileTextOutlined title="Detail" />
          </Link>
          {record.isDisable ? (
            <a
              onClick={() => {
                if (record.isDisable) {
                  setIDLoading(record._id);
                  activeMutate(record._id);
                }
              }}
            >
              {isActiveLoading && idLoading == record._id ? (
                <Snipper />
              ) : (
                <UndoOutlined title="Active" />
              )}
            </a>
          ) : (
            <Popconfirm
              placement="top"
              title={"Are you sure to disable?"}
              onConfirm={() => {
                if (!record.isDisable) {
                  setIDLoading(record._id);
                  deleteMutate(record._id);
                }
              }}
              okText="Yes"
              cancelText="No"
            >
              <a style={{ color: "red" }}>
                {isDeleteLoading && idLoading === record._id ? (
                  <Snipper />
                ) : (
                  <StopOutlined title="Disable" />
                )}
              </a>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const columnsPending = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      render: (address: IAddress) => (
        <p>{parseAddress(address, IFlag.province)}</p>
      ),
    },
    {
      title: "Types",
      key: "type",
      dataIndex: "type",
      filters: [
        {
          text: `${TagType.hotel}`,
          value: `${TagType.hotel}`,
        },
        {
          text: `${TagType.motel}`,
          value: `${TagType.motel}`,
        },
        {
          text: `${TagType.resort}`,
          value: `${TagType.resort}`,
        },
        {
          text: `${TagType.homestay}`,
          value: `${TagType.homestay}`,
        },
      ],
      onFilter: (value, record) => record.type.includes(value),
      render: (type) => {
        let color = "green";
        if (type === TagType.hotel) {
          color = "orange";
        } else if (type === TagType.motel) {
          color = "geekblue";
        } else if (type === TagType.resort) {
          color = "cyan";
        } else if (type === TagType.homestay) {
          color = "magenta";
        }
        return (
          <Tag color={color} key={type}>
            {type.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Link
            to={`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_UPDATE}/${record._id}`}
            state={record}
          >
            <EditOutlined title="Update" />
          </Link>
          <a onClick={() => showModal(record)}>
            <FileTextOutlined title="Detail" />
          </a>
          <a
            style={{ color: "green" }}
            onClick={() => {
              setIDLoading(record._id);
              acceptMutate(record._id);
            }}
          >
            {isAccepting && idLoading === record._id ? (
              <Snipper />
            ) : (
              <CheckOutlined title="Accept" />
            )}
          </a>
          <a
            style={{ color: "red" }}
            onClick={() => {
              setIDLoading(record._id);
              denyMutate(record._id);
            }}
          >
            {isDenyLoading && idLoading === record._id ? (
              <Snipper />
            ) : (
              <CloseOutlined title="Decline" />
            )}
          </a>
        </Space>
      ),
    },
  ];

  if (isError) {
    message.error(error.toString());
  }

  return (
    <div className="apartment-page-container">
      <div className="title-container">
        <h2>Apartment Management</h2>
        {/* <Button
          className="btn-container"
          type="primary"
          onClick={() =>
            navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_NEW}`)
          }
        >
          <GoPlus />
          &nbsp; New Apartment
        </Button> */}
      </div>
      <Tabs onChange={callback}>
        <TabPane tab="All" key={ApartmentStatus.all}>
          <Table
            rowKey="_id"
            columns={columns as ColumnsType<any>}
            dataSource={apartments.filter((p) => p.isPending === false)}
            onChange={onChange}
            loading={isLoading}
          />
        </TabPane>
        <TabPane tab="Pending" key={ApartmentStatus.pending}>
          <Table
            rowKey="_id"
            columns={columnsPending as ColumnsType<any>}
            dataSource={apartments.filter((p) => p.isPending === true)}
            onChange={onChange}
            loading={isLoading}
          />
        </TabPane>
      </Tabs>
      <ApartmentDetail
        visible={visible}
        hideModal={hideModal}
        currentApartment={currentDeletedApartment}
        refetchApartmentData={refetchApartmentData}
      />
    </div>
  );
}
