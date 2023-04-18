import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Form,
  Modal,
  Popconfirm,
  Popover,
  Switch,
  Table,
  Tooltip,
  message,
  notification,
} from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Formik } from "formik";
import { get, truncate } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import PostForm from "./components/form";
import { useDelete, useGet, usePut, usePost } from "crud";

const index = () => {
  const { token } = useSelector((state) => get(state, "auth"));
  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
  });

  const { data, isFetched } = useGet({
    url: "posts?_l=uz",
    queryKey: ["posts"],
  });

    const { mutate: postForm } = usePost({
      url: "posts?_l=uz",
      queryKey: ["posts"],
    });
    const { mutate: putForm } = usePut({ url: "posts/", queryKey: ["posts"] });

  const queryClient = useQueryClient();

  const {mutate: deleteHandler} = useDelete({url:'posts/', queryKey:['posts']})

  // const { mutate: statusHandler } = useMutation({
  //   mutationFn: ({ id, status }) => {
  //     return axios.put(
  //       `http://api.test.uz/api/v1/admin/posts/updateStatus/${id}?_l=uz`,
  //       { status },
  //       {
  //         headers: {
  //           Authorization: "Bearer " + token,
  //         },
  //       }
  //     );
  //   },
  //   onSuccess: () => {
  //     message.success("Success");
  //     queryClient.invalidateQueries({ queryKey: ["post"] });
  //   },
  // });
  const { mutate: statusHandler } = usePut({ url: "posts/updateStatus/" });

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
                  loading={!isFetched}
                  checked={value ? true : false}
                  onChange={(e) =>{
                    statusHandler({ id: get(row, "id"), values: e ? {status:1} : {status:0} })
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
                      onClick={() =>
                        setModalData({
                          isOpen: true,
                          item: row,
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
      <PostForm {...{ modalData, setModalData, putForm, postForm}} />
    </div>
  );
};

export default index;
