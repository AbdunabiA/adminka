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
import { DeleteOutlined, EditOutlined, RightOutlined } from "@ant-design/icons";
import { useDelete, useGet, usePost } from "crud";
import { ContainerAll } from "modules";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { Tabs } from "components";
import { systemSelectors } from "store/system";

const index = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  const currentLangCode = useSelector(systemSelectors.selectLanguage);

  const { mutate: deleteHandler } = useDelete();
  const { mutate: statusHandler } = usePost();

  // const {data} = useGet({url:'/product', queryKey:['prods']})
  // console.log('PRODS',data);

  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Button
          type="primary"
          onClick={() =>
            navigate({
              pathname: "/market/create",
              search: qs.stringify({ ...params }),
            })
          }
        >
          ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={["stores"]}
        url={"/store"}
        params={{
          sort: "id",
          limit: 5,
          page: get(params, "page", 1),
          extra: {
            _l: get(params, "lang", currentLangCode),
          },
          include: "region,district,products",
        }}
        // onSuccess={(data)=>console.log(data)}
        onError={(err) => {
          notification.error({
            message: get(err, "message", "Something went wrong"),
          });
        }}
      >
        {({ items, isLoading, isFetched, meta, isFetching }) => {
          console.log(items);
          return (
            <div className="overflow-x-auto">
              <Table
                // scroll={{
                //   x: 0,
                // }}
                
                expandable={{
                  rowExpandable: (rec) =>
                    rec?.products?.length ? true : false,
                  expandIcon:()=>{
                    return <RightOutlined />;
                  },
                  expandRowByClick:true,
                  onExpand:(ex, rec)=>{console.log(ex, rec);},
                  expandedRowRender: (rec) => {
                    // console.log("REC", rec);
                    return (
                      <Table
                        rowKey={"id"}
                        pagination={{
                          total: rec?.products.length,
                          // current: +get(params, "page", 1),
                          pageSize: 5,
                        }}
                        dataSource={rec?.products}
                        columns={[
                          {
                            title: "Name",
                            dataIndex: "name",
                          },
                          {
                            title: "Price",
                            dataIndex: "price",
                          },
                          {
                            title: "Count",
                            dataIndex: "count",
                          },
                        ]}
                      />
                    );
                  },
                }}
                className="overflow-x-auto"
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
                    title: "Title",
                    dataIndex: "title",
                  },
                  {
                    title: "Region",
                    dataIndex: "region",
                    render: (value) => {
                      return (
                        <p className="m-0">
                          {value[`name_${currentLangCode}`]}
                        </p>
                      );
                    },
                  },
                  {
                    title: "District",
                    dataIndex: "district",
                    render: (value) => {
                      return (
                        <p className="m-0">
                          {value[`name_${currentLangCode}`]}
                        </p>
                      );
                    },
                  },
                  {
                    title: "Product count",
                    dataIndex: "products",
                    render: (value) => {
                      return <p className="m-0">{value.length}</p>;
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
                                  url: `/store/${get(row, "id")}`,
                                  params: {
                                    extra: {
                                      _l: get(params, "lang", currentLangCode),
                                    },
                                  },
                                  onSuccess: () => {
                                    queryClient.invalidateQueries(["stores"]);
                                    notification.success({
                                      message: "Deleted",
                                    });
                                  },
                                  onError:(err) => {
                                    notification.error({
                                      message: get(err, "message", 'Something went wrong')
                                      });
                                    }
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
                                  pathname: `/market/update/${row.id}`,
                                  search: qs.stringify({
                                    ...params,
                                  }),
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
            </div>
          );
        }}
      </ContainerAll>
    </div>
  );
};

export default index;
