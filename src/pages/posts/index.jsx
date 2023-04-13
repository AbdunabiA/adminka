import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch, Table } from "antd";
import axios from "axios";
import { get } from "lodash";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Form from "./components/form";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useGetData } from "hooks";
const index = () => {
  const { token } = useSelector((state) => get(state, "auth"));
  const [modalData, setModalData] = useState({
    isOpen: false,
    item: null,
  });
  const queryClient = useQueryClient();

  const { mutate: deleteHandler } = useMutation({
    mutationFn: (id) => {
      axios.delete(`http://api.test.uz/api/v1/admin/posts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: "posts" });
    },
  });

  //   console.log(modalData);
  const putReq = (values) => {
    // const status = 0
    // if(values.status==0){
    //      status = 1 
    // }else{
    //     status = 0
    // }
    axios.put(
      `http://api.test.uz/api/v1/admin/posts/updateStatus/${values.id}`,
      { status:1},
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  }

 const { mutate: statusChange } = useMutation({
   mutationFn: (values) => putReq(values),
   onSuccess: () => {
     queryClient.invalidateQueries({ queryKey: "posts" });
   },
 });


    const { data, isLoading, error, isError } = useGetData(
      ["posts"],
      `http://api.test.uz/api/v1/admin/posts?_l=uz&sort=id&_t=${new Date().getTime()}`,
      token
    );

    console.log(get(data, "data.data"));

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "1%",
    },
    {
      title: "Заголовок",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Описание",
      dataIndex: "description",
      key: "description",
      width: "10%",
    },
    {
      title: "Контент",
      dataIndex: "content",
      key: "content",
      width: "50%",
    },
    {
      title: "Статус",
      dataIndex: "status",
      key: "status",
      render:(_, row)=> {
        console.log(row);
        return(
        <div>
            <Switch defaultChecked={row.status==1?true:false} onClick={()=>statusChange(row)}/>
        </div>)
      }
    },
    {
      title: "Действие",
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
              onClick={() => {console.log('ROW',row); setModalData({ isOpen: true, item: row })}}
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
          Добавить
        </Button>

        <Form {...{ modalData, setModalData, statusChange }} />
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
