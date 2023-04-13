import { Formik, Form, Field } from "formik";
import React, { useEffect } from "react";
import { Fields } from "components";
import { signIn } from "store/auth";
import { Button, Spin, notification } from "antd";
import axios from "axios";
import {get} from 'lodash'
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";


const index = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();

  const mutation = useMutation({
    mutationFn:(user)=>{
      return axios.post("http://api.test.uz/api/v1/admin/user/register",user);
    },
    onSuccess:(data)=>{
      navigate('/auth/sign-in')
      api.success({
        message:`Notification`,
        description:`Success`,
      })
    },
    onError:(error)=>{
      api.error({
        message:'error',
        description:get(error, 'message')
      })
    }
  })


  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      {contextHolder}
      <div className="w-1/2 shadow-md p-10 rounded-md bg-white">
        <Formik
          initialValues={{
            username: "",
            first_name: "",
            last_name: "",
            phone: "",
            password: "",
            status: 1,
          }}
          onSubmit={(data) => {
            // signIn(data);
          }}
        >
          {({ values, resetForm }) => {
            return (
              <Form>
                <Field
                  name="username"
                  label="User name"
                  component={Fields.Input}
                />
                <Field
                  name="first_name"
                  label="First name"
                  component={Fields.Input}
                />
                <Field
                  name="last_name"
                  label="Last name"
                  component={Fields.Input}
                />
                <Field name="phone" label="Phone" component={Fields.Input} />
                <Field
                  name="password"
                  label="Password"
                  component={Fields.Input}
                />
                <Button type="primary" onClick={() => mutation.mutate(values)}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default index;
