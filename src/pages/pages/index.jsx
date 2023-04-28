import { Button, Popconfirm, Switch, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from 'lodash';
import { useDelete, useGet } from 'crud';
import { useLocation, useNavigate } from 'react-router-dom';
import { ContainerAll } from 'modules';
import { useState } from 'react';
import qs from 'qs';

const index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const params = qs.parse(location.search, {ignoreQueryPrefix:true})
    const [page, setPage] = useState(1)
    const { mutate: deleteHandler } = useDelete({
      url: "/pages",
      queryKey: ["pages"],
      params: { extra: { _l: "uz" } },
    });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => navigate("create")}>
          +ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={["pages"]}
        url={"/pages"}
        params={{
          limit:1,
          page:get(params, 'page', 1),
          extra: {
            _l: "uz",
          },
        }}
        // onSuccess={(data)=>console.log(data)}
        // onError={(error)=>console.log(error)}
      >
        {({ items, total, current, isFetched, isFetching, meta }) => (
          <Table
            pagination={{
              total:get(meta, 'total'),
              current:+get(params, 'page', 1),
              pageSize:get(params, 'perPage')
            }}
            onChange={(page)=>{
              setPage(page.current)
              navigate({
                search:qs.stringify({
                  page:page.current
                })
              })
            }}
            rowKey={"id"}
            loading={isFetching}
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
              // {
              //   title: "Slug",
              //   dataIndex: "Slug",
              //   render: (value) => {
              //     return value.length > 50 ? (
              //       <Popover title={value}>
              //         {truncate(value, { length: 50, omission: "..." })}
              //       </Popover>
              //     ) :(
              //       value
              //       )
              //   },
              // },
              {
                title: "Description",
                dataIndex: "description",
                render: (value) => {
                  return value.length > 50 ? (
                    <Popover title={value}>
                      {truncate(value, { length: 50, omission: "..." })}
                    </Popover>
                  ) :(
                    value
                    )
                },
              },
              {
                title: "Status",
                dataIndex: "status",
                render: (value, row) => {
                  return (
                    <Switch
                      loading={!isFetched}
                      checked={value ? true : false}
                      onChange={(e) => {
                        statusHandler({
                          id: get(row, "id"),
                          values: e ? { status: 1 } : { status: 0 },
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
                          onConfirm={() => deleteHandler(get(row, "id"))}
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
                            navigate(`/pages/update/${get(row, "id")}`)
                          }
                        />
                      </Tooltip>
                    </div>
                  );
                },
              },
            ]}
          />
        )}
      </ContainerAll>
    </div>
  );
}

export default index