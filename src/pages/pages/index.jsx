import { Button, Popconfirm, Popover, Switch, Table, Tooltip, notification } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get, truncate } from 'lodash';
import { useDelete, usePost} from 'crud';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerAll } from 'modules';
import qs from 'qs';
import { useSelector } from 'react-redux';
import { Tabs } from 'components';
import { useQueryClient } from '@tanstack/react-query';
import { systemSelectors } from 'store/system';

const index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const queryClient = useQueryClient()
    const currentLangCode = useSelector(systemSelectors.selectLanguage);
    const params = qs.parse(location.search, {ignoreQueryPrefix:true})
    const { mutate: deleteHandler } = useDelete();
    const { mutate: statusHandler } = usePost();

  return (
    <div>
      <div className="flex justify-between items-center mb-10">
        <Tabs/>
        <Button type="primary" onClick={() => navigate("/page/create")}>
          ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={["pages"]}
        url={"/pages"}
        params={{
          limit: 5,
          sort:'id',
          page: get(params, "page", 1),
          extra: {
            _l: get(params, "lang", currentLangCode),
          },
        }}
        // onSuccess={(data)=>console.log(data)}
        // onError={(error)=>console.log(error)}
      >
        {({ items, isLoading, isFetching, meta }) => {
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
                  title: "Slug",
                  dataIndex: "slug",
                  render: (value) => {
                    return value?.length > 50 ? (
                      <Popover title={value}>
                        {truncate(value, { length: 50, omission: "..." })}
                      </Popover>
                    ) : (
                      value
                    );
                  },
                },
                {
                  title: "Description",
                  dataIndex: "description",
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
                        loading={isFetching}
                        checked={value ? true : false}
                        onChange={(e) => {
                          statusHandler({
                            url: `/pages/updateStatus/${row?.id}`,
                            method: "put",
                            params: {
                              extra: {
                                _l: get(params, "lang", currentLangCode),
                              },
                            },
                            values: e ? { status: 1 } : { status: 0 },
                            onSuccess: () => {
                              queryClient.invalidateQueries({
                                queryKey: ["pages"],
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
                                url: `/pages/${get(row, "id")}`,
                                params: {
                                  extra: {
                                    _l: get(params, "lang", currentLangCode),
                                  },
                                },
                                onSuccess: () => {
                                  queryClient.invalidateQueries(["pages"]);
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
                              navigate(`/page/update/${get(row, "id")}`)
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
}

export default index