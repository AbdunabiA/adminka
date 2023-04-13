import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Table } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "./components/form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetData } from "hooks";
const index = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
  });
  const queryClient = useQueryClient();

  const { mutate: deleteHandler } = useMutation({
    mutationFn: (id) => {
      axios.delete(`http://api.test.uz/api/v1/admin/banners/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "banners" });
    },
  });

  console.log(modalData);

  const { token } = useSelector((state) => get(state, "auth"));
  const fetchBanner = () => {
    return axios.get("http://api.test.uz/api/v1/admin/banners", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
  };


  const { data, isLoading, error, isError } = useGetData(
    ["banners"],
    "http://api.test.uz/api/v1/admin/banners", 
    token
  );

  console.log(get(data, "data.data"));

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
      dataIndex: "type",
      key: "type",
      render: (_, row) => {
        return (
          <div className="flex gap-5">
            <DeleteOutlined
              className="text-red-500 cursor-pointer text-lg"
              onClick={() => deleteHandler(get(row, "id"))}
            />
            <EditOutlined
              className="text-blue-500 cursor-pointer text-lg"
              onClick={() => setModalData({ isOpen: true, item: row })}
            />
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
          onClick={() =>
            setModalData({
              isOpen: true,
              item: null,
            })
          }
        >
          ADD
        </Button>

        <Form {...{ modalData, setModalData }} />
      </div>
      <Table
        dataSource={get(data, "data.data")}
        loading={isLoading}
        columns={columns}
        className="p-2"
      />
    </div>
  );
};

export default index;
