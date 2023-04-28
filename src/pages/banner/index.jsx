import {useQueryClient } from "@tanstack/react-query";
import { Button,Popconfirm,Table, Tooltip, notification } from "antd";
import { get } from "lodash";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { ContainerAll } from "modules";
import { useLocation, useNavigate } from "react-router-dom";
import { useDelete } from "crud";
import qs from 'qs'

const index = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const queryClient = useQueryClient();

  const {mutate:deleteHandler} = useDelete()

  const columns = [
    {
      title: "Name",
      dataIndex: "name_uz",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description_uz",
      key: "description",
    },
    {
      title: "Action",
      key: "type",
      render: (_, row) => {
        return (
          <div className="flex gap-5">
            <Tooltip title="Delete">
              <Popconfirm
                placement="topRight"
                description={"Delete"}
                onConfirm={() => deleteHandler({
                  url:`banners/${get(row, "id")}`,
                  onSuccess:()=>{
                    queryClient.invalidateQueries(['banners'])
                    notification.success({
                      message:'Deleted'
                    })
                  }
                })}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
              </Popconfirm>
            </Tooltip>
            <Tooltip title="Edit">
              <EditOutlined
                className="text-blue-500 cursor-pointer text-lg"
                onClick={() => navigate(`/banner/update/${get(row, "id")}`)}
              />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          className="mb-2"
          type="primary"
          onClick={() => navigate("/banner/create")}
        >
          ADD
        </Button>
      </div>
      <ContainerAll
        url="/banners"
        queryKey={["banners"]}
        params={{
          sort: "-id",
          limit: 5,
          page: get(params, "page", 1),
          extra: {
            _l: "uz",
          },
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
