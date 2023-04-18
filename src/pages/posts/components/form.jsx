import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Modal, Switch } from "antd";
import axios from "axios";
import { Fields } from "components";
import { usePost, usePut } from "crud";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useSelector } from "react-redux";
import * as Yup from 'yup'

const validationSchema = Yup.object({
  title:Yup.string().required('Title is required'),
  description:Yup.string().required('Description is required'),
  content:Yup.string().required('Content is required'),
})

const PostForm = ({ modalData, setModalData, putForm, postForm }) => {
  



  return (
    <Modal
      key={get(modalData, 'item.id')}
      title={modalData.item ? "Изменить" : "Добавить"}
      open={modalData.isOpen}
      footer={false}
      onCancel={() => setModalData({ isOpen: false, item: null })}
    >
      <Formik
      validationSchema={validationSchema}
        initialValues={{
          title: get(modalData, "item.title", ""),
          description: get(modalData, "item.description", ""),
          content: get(modalData, "item.content", ""),
          status: get(modalData, "item.status", ""),
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          modalData.item ? putForm({values, resetForm, id:modalData.item.id,}) : postForm({ values, resetForm });
          setModalData({...modalData, isOpen:false})
        }}
      >
        {({handleSubmit }) => {
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
                component={Fields.TextArea}
                type="textarea"
              />
              <Field name="status" label="Status" component={Fields.Switch} />
              <div className="flex justify-end mb-4">
                <Button type="primary" onClick={handleSubmit}>
                  {get(modalData, 'item') ? 'Изменть':'Создать'}
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default PostForm;
