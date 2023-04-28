import { useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Popconfirm,
  Popover,
  Switch,
  Table,
  Tooltip,
} from "antd";
import { get, truncate } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostForm from "./components/form";
import { useDelete, useGet, usePost, useStatusChange } from "crud";
import { ContainerAll } from "modules";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'qs'

const index = () => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1)
  const navigate = useNavigate()
  const location = useLocation()
  const params = qs.parse(location.search, {ignoreQueryPrefix:true})
  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
  });

    const { mutate: postForm } = usePost({
      url: "/posts",
      queryKey: ["posts"],
      params:{
        extra:{
          _l:'uz'
        }
      }
    });
    const { mutate: putForm } = usePost({ 
      url: `posts/${modalData?.item?.id}`, 
      queryKey: ["posts"],
      params:{
        extra:{
          _l:'uz'
        }
      },
      method:'put' 
    });

 

  const {mutate: deleteHandler} = useDelete({url:'/posts', queryKey:['posts']})

  const { mutate: statusHandler } = useStatusChange({ 
    url: "posts/updateStatus",
    queryKey:['posts'],
    params:{
      extra:{
        _l:'uz'
      }
    }
  });

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button
          type="primary"
          onClick={() => setModalData({ isOpen: true, item: null })}
        >
          +ADD
        </Button>
      </div>
      <ContainerAll
        queryKey={['posts']}
        url={'/posts'}
        params={{
          limit:1,
          page:get(params,'page', 1),
          extra:{
            _l:'uz'
          }
        }}
        // onSuccess={(data)=>console.log(data)}
        // onError={(error)=>console.log(error)}
      >
        {
          ({items,isLoading, isFetched, meta, isFetching}) => {
            return (
              <Table
                pagination={{
                  total:get(meta, 'total'),
                  current:+get(params, 'page', 1),
                  pageSize:get(meta, 'perPage'),
                }}
                onChange={(page)=>{
                  navigate({
                    search:qs.stringify({
                      page:page.current
                    })
                  })
                  setPage(page.current)
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
                          loading={isFetching}
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
                                navigate(`update/${get(row, 'id')}`)
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
          }
        }
      </ContainerAll>
      <PostForm {...{ modalData, setModalData, putForm, postForm}} />
    </div>
  );
};

export default index;
