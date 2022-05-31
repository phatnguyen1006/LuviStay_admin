import { ReactElement, useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import { Tabs, Table, Button, Space, Tag, message, Input } from "antd";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/lib/table/interface";
import {
  DeleteOutlined,
  EditOutlined,
  CheckOutlined,
  CloseOutlined,
  SearchOutlined,
  FileTextOutlined,
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
import "./styles.scss";
import { acceptOneApartment, denyOneApartment } from "app/mutation";
import Snipper from "components/Snipper";

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
        <a onClick={showModal}>
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        </a>
      ) : (
        <a onClick={showModal}>{text}</a>
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
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>
            <EditOutlined title="Update" />
          </a>
          <a style={{ color: "lightgreen" }}>
            <FileTextOutlined title="Detail" />
          </a>
          <a style={{ color: "red" }} onClick={() => showModal(record)}>
            <DeleteOutlined title="Delete" />
          </a>
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
          <a>
            <EditOutlined title="Update" />
          </a>
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
        <Button
          className="btn-container"
          type="primary"
          onClick={() =>
            navigate(`${APP_ROUTE.ADMIN}${ADMIN_ROUTE.APARTMENT_NEW}`)
          }
        >
          <GoPlus />
          &nbsp; New Apartment
        </Button>
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
