import { useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import axios from "axios";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signIn } from "store/auth";

const index = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationFn: (user) => {
      return axios.post(
        "http://api.test.uz/api/v1/admin/user/sign-in",
        user
      );
    },
    onSuccess: (data) => {
      navigate("/");
      dispatch(signIn(get(data, "data.data")));
    },
  });
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-sky-400">
      <div className="w-1/2 shadow-md p-10 rounded-md bg-white">
        <Formik
          initialValues={{
            username: "",
            password: "",
            phone: "",
            status: 1,
          }}
          onSubmit={(data) => {
            console.log(data);
          }}
        >
          {({ values }) => {
            return (
              <Form>
                <Field name="phone" label="Phone" component={Fields.Input} />
                <Field
                  name="username"
                  label="User name"
                  component={Fields.Input}
                />

                <Field
                  name="password"
                  label="Password"
                  component={Fields.Input}
                />
                <Button type="primary" onClick={() => mutation.mutate(values)}>
                  Submit
                </Button>
                <span onClick={() => navigate("/auth/registration")}>
                  Registration
                </span>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default index;
