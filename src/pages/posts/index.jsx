import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Popconfirm,
  Popover,
  Switch,
  Table,
  Tooltip,
  notification,
} from "antd";
import { get, truncate } from "lodash";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useDelete,usePost} from "crud";
import { ContainerAll } from "modules";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'qs'
import { Tabs } from "components";

const index = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const location = useLocation()
  const params = qs.parse(location.search, {ignoreQueryPrefix:true})
  const currentLangCode = useSelector((state) => state.system.currentLangCode);

  const {mutate: deleteHandler} = useDelete()
  const {mutate:statusHandler} = usePost()

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <Tabs />
        <Button type="primary" onClick={() => navigate("/post/create")}>
          ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={["posts"]}
        url={"/posts"}
        params={{
          sort:'id',
          limit: 5,
          page: get(params, "page", 1),
          extra: {
            _l: get(params, "lang", currentLangCode),
          },
        }}
        // onSuccess={(data)=>console.log(data)}
        // onError={(error)=>console.log(error)}
      >
        {({ items, isLoading, isFetched, meta, isFetching }) => {
          // console.log(items);
          return (
            <Table
              pagination={{
                total: get(meta, "total"),
                current: +get(params, "page", 1),
                pageSize: get(meta, "perPage"),
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
              loading={isLoading}
              dataSource={items}
              columns={[
                {
                  title: "ID",
                  dataIndex: "id",
                  className: "w-[20px]",
                },
                {
                  title: "Title",
                  dataIndex: "title",
                },
                {
                  title: "Description",
                  dataIndex: "description",
                },
                {
                  title: "Slug",
                  dataIndex: "slug",
                },
                {
                  title: "Content",
                  dataIndex: "content",
                  render: (value) => {
                    return value.length > 50 ? (
                      <Popover title={value}>
                        {truncate(value, { length: 50, omission: "..." })}
                      </Popover>
                    ) : (
                      value
                    );
                  },
                },
                {
                  title: "Status",
                  dataIndex: "status",
                  render: (value, row) => {
                    return (
                      <Switch
                        loading={isLoading}
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
                  render: (_, row) => {
                    return (
                      <div className="flex gap-5">
                        <Tooltip title="Delete">
                          <Popconfirm
                            placement="topRight"
                            description={"Delete"}
                            onConfirm={() => {
                              deleteHandler({
                                url: `/posts/${get(row, "id")}`,
                                params: {
                                  extra: {
                                    _l: get(params, "lang", currentLangCode),
                                  },
                                },
                                onSuccess: () => {
                                  queryClient.invalidateQueries(["posts"]);
                                  notification.success({
                                    message: "Deleted",
                                  });
                                },
                              });
                            }}
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
                                pathname: `/post/update/`,
                                search:qs.stringify({
                                  ...params,
                                  slug:get(row, "slug")
                                })
                              })
                            }
                          />
                        </Tooltip>
                      </div>
                    );
                  },
                },
              ]}
            />
          );
        }}
      </ContainerAll>
    </div>
  );
};

export default index;
