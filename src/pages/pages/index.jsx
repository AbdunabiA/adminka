import { Button, Popconfirm, Table, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { get } from 'lodash';
import { useGet } from 'crud';
import { useNavigate } from 'react-router-dom';

const index = () => {
    const navigate = useNavigate()
    const {data, isLoading} = useGet({url:'pages?_l=uz', queryKey:['pages']}) 
    console.log(data?.data?.data);

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button type="primary" onClick={() => navigate('postPage')}>
          +ADD
        </Button>
      </div>
      <Table
        rowKey={"id"}
        dataSource={get(data, "data.data")}
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
            dataIndex: "Slug",
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
            title: "Description",
            dataIndex: "description",
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
            dataIndex: "id",
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
                      onClick={() => {}}
                    />
                  </Tooltip>
                </div>
              );
            },
          },
        ]}
      />
    </div>
  );
}

export default index