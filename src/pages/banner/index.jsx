import {useQueryClient } from "@tanstack/react-query";
import { Avatar, Button,Popconfirm,Switch,Table, Tooltip, notification } from "antd";
import { get } from "lodash";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ContainerAll } from "modules";
import { useLocation, useNavigate } from "react-router-dom";
import { useDelete, usePost } from "crud";
import qs from 'qs'
import { Tabs } from "components";
import { useSelector } from "react-redux";
import { systemSelectors } from "store/system";


export const types = [
  {
    id: 1,
    label: "Simple Banner",
    value: 1,
  },
  {
    id: 2,
    label: "Slider Banner",
    value: 2,
  },
];

const index = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const currentLangCode = useSelector(systemSelectors.selectLanguage);
  const queryClient = useQueryClient();
  const {mutate:deleteHandler} = useDelete()
  const { mutate: statusHandler } = usePost();

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: `name_${get(params, "lang", currentLangCode)}`,
      key: "name",
    },
    {
      title: "Description",
      dataIndex: `description_${get(params, "lang", currentLangCode)}`,
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (value) => {
        return types.find((type) => type.value == value).label;
      },
    },
    {
      title: "Photo",
      dataIndex: "file",
      render: (value, row) => {
        // console.log('render',value);
        return (
          <Avatar shape="square" src={get(value, "thumbnails.small.src")} />
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (value, row) => {
        return (
          <Switch
            // loading={isLoading}
            checked={value ? true : false}
            onChange={(e) => {
              statusHandler({
                url: `/posts/updateStatus/${row?.id}`,
                method: "put",
                params: {
                  extra: {
                    _l: get(params, "lang", currentLangCode),
                  },
                },
                values: e ? { status: 1 } : { status: 0 },
                onSuccess: () => {
                  queryClient.invalidateQueries({
                    queryKey: ["posts"],
                  });
                  notification.success({
                    message: "Changed",
                  });
                },
              });
            }}
          />
        );
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, row) => {
        return (
          <div className="flex gap-5">
            <Tooltip title="Delete">
              <Popconfirm
                placement="topRight"
                description={"Delete"}
                onConfirm={() =>
                  deleteHandler({
                    url: `/banners/${get(row, "id")}`,
                    params: {
                      extra: { _l: get(params, "lang", currentLangCode) },
                    },
                    onSuccess: () => {
                      queryClient.invalidateQueries(["banners"]);
                      notification.success({
                        message: "Deleted",
                      });
                    },
                  })
                }
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Edit">
              <EditOutlined
                className="text-blue-500 cursor-pointer text-lg"
                onClick={() =>
                  navigate({
                    pathname: `/banner/update/${get(row, "id")}`,
                    search: qs.stringify({ ...params }),
                  })
                }
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between">
        <Tabs resetPage={false} />
        <Button
          className="mb-2"
          type="primary"
          onClick={() =>
            navigate({
              pathname: "/banner/create",
              search: qs.stringify({ ...params }),
            })
          }
        >
          ADD
        </Button>
      </div>
      <ContainerAll
        url="/banners"
        queryKey={["banners"]}
        params={{
          sort: "id",
          limit: 5,
          page: get(params, "page", 1),
          // extra: {
          //   _l: get(params, "lang", currentLangCode),
          // },
          include: "file",
        }}
      >
        {({ items, meta, isLoading }) => {
          console.log(items);
          return (
            <Table
              pagination={{
                total: get(meta, "total"),
                pageSize: get(meta, "perPage"),
                current: +get(params, "page", 1),
              }}
              onChange={(page) => {
                navigate({
                  search: qs.stringify({
                    ...params,
                    page: page.current,
                  }),
                });
              }}
              rowKey={"id"}
              dataSource={items}
              loading={isLoading}
              columns={columns}
              className="p-2"
            />
          );
        }}
      </ContainerAll>
    </div>
  );
};

export default index;
