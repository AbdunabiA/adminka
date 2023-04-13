import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { usePostData } from "hooks";
import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";

const form = ({ modalData, setModalData, statusChange }) => {
  const { token } = useSelector((state) => get(state, "auth"));
  const queryClient = useQueryClient();

  const postData = (values) => {
    return axios[modalData.item ? "put" : "post"](
      `http://api.test.uz/api/v1/admin/posts${modalData.item ? "" : "?_l=uz"}${
        get(modalData, "item") ? `/${get(modalData, "item.id")}` : ""
      }`,
      values,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const { mutate } = useMutation({
    mutationFn: (values) => postData(values),
    onSuccess: () => {
      setModalData({ isOpen: false, item: null });
      queryClient.invalidateQueries({ queryKey: "banner" });
    },
    onError: (error) => {},
  });


//   const { mutate } = usePostData(
//     ["posts"],
//     modalData,
//     setModalData,
//     token,
//     "http://api.test.uz/api/v1/admin/posts?_l=uz/"
//   );
  return (
    <Modal
      destroyOnClose={true}
      title={modalData.item ? "Изменить" : "Добавить"}
      open={modalData.isOpen}
      footer={false}
      onCancel={() => setModalData({ isOpen: false, item: null })}
    >
      <Formik
        initialValues={{
          title: get(modalData, "item.title", ""),
          description: get(modalData, "item.description", ""),
          content: get(modalData, "item.content", ""),
          //   status: get(modalData, "item.status", ""),
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          mutate(values);
          resetForm();
        }}
      >
        {({ values, handleSubmit }) => {
          return (
            <Form>
              <Field name="title" label="Заголовок" component={Fields.Input} />
              <Field
                name="description"
                label="Описание"
                component={Fields.Input}
              />
              <Field
                name="content"
                label="Контент"
                component={Fields.Input}
                type="textarea"
              />
              {modalData.item ? (
                <Switch
                  defaultChecked={modalData?.item?.status == 1 ? true : false}
                  onChange={() => statusChange(modalData?.item)}
                />
              ) : null}
              <br />
              <br />
              <Button type="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default form;
