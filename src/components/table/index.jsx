import { Pagination, Popconfirm, Switch, Table, Tooltip } from "antd"
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from "lodash";
import qs from 'qs'
import { useNavigate } from "react-router-dom";

const index = (
    {
        items,
        isLoading, 
        columns, 
        hasUpdate = false,
        hasDelete = false,
        hasStatus = false,
        hasPagination = false,
        customPagination=false,
        deleteAction = () => {},
        updateAction = () => {},
        statusAction = () => {},
        meta
    }
) => {
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const navigate = useNavigate()
    let newColumns = hasStatus
      ? [
          ...columns,
          {
            title: "Status",
            dataIndex: "status",
            render: (value, row) => {
              return (
                <Switch
                  checked={value ? true : false}
                  onChange={(e) => statusAction(e, row)}
                />
              );
            },
          },
        ]
      : columns;
    newColumns =
      hasUpdate || hasDelete
        ? [
            ...newColumns,
            {
              title: "Action",
              key: "action",
              render: (_, row) => {
                return (
                  <div className="flex gap-5">
                    {hasDelete ? 
                    <Tooltip title="Delete">
                      <Popconfirm
                        placement="topRight"
                        description={"Delete"}
                        onConfirm={() => deleteAction(row) }
                        okText="Yes"
                        cancelText="No"
                      >
                        <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
                      </Popconfirm>
                    </Tooltip> : null}
                    {hasUpdate ? <Tooltip title="Edit">
                      <EditOutlined
                        className="text-blue-500 cursor-pointer text-lg"
                        onClick={() => updateAction(row)}
                      />
                    </Tooltip> : null } 
                  </div>
                );
              },
            },
          ]
        : newColumns;
  return (
    <>
      <Table
        rowKey={"id"}
        dataSource={items}
        isLoading={isLoading}
        columns={newColumns}
        className="overflow-x-auto"
        pagination={
          hasPagination
            ? {
                total: get(meta, "total"),
                current: +get(params, "page", 1),
                pageSize: get(meta, "perPage"),
              }
            : false
        }
        onChange={(page) => {
          navigate({
            search: qs.stringify({
              page: page.current,
            }),
          });
        }}
      />
      {!hasPagination && customPagination ? (
        <div className="p-2 flex items-center justify-end">
          <Pagination
            total={get(meta, "total")}
            current={+get(params, "page", 1)}
            pageSize={get(meta, "perPage", 10)}
            onChange={(page) => {
              navigate({
                search: qs.stringify({
                  page: page,
                }),
              });
            }}
          />
        </div>
      ) : null}
    </>
  );
}

export default index