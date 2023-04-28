import { Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Fields } from "components";
import { usePost } from "crud";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import { ContainerOne } from "modules";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePage = () => {
  const navigate = useNavigate();
  const {id} = useParams()
  const { mutate: putForm } = usePost({
    url: `/pages/${id}`,
    method:'put',
    queryKey: ["pages"],
    params: { extra: { _l: "uz" } },
    onSuccess: (data) => {
      return navigate("/pages");
    },
  });
  return (
    <div>
      <Button type="primary" className="mb-4" onClick={() => navigate(-1)}>
        <ArrowLeftOutlined className="text-xl" />
      </Button>
      <ContainerOne
        url={`/pages/${id}`}
        queryKey={["page"]}
        params={{ extra: { _l: "uz" } }}
      >
        {({ item }) => {
          return (
            <Formik
              // validationSchema={validationSchema}
              key={id}
              initialValues={{
                title: get(item, "title", ""),
                description: get(item, "description", ""),
                slug: get(item, "slug", ""),
                status: get(item, "status", 0),
              }}
              onSubmit={(values, { resetForm }) => {
                console.log(values);
                putForm({ values, resetForm });
              }}
            >
              {({ handleSubmit }) => {
                return (
                  <Form>
                    <Field
                      name="title"
                      label="Заголовок"
                      component={Fields.Input}
                    />
                    <Field
                      name="description"
                      label="Описание"
                      component={Fields.Input}
                    />
                    <Field
                      name="slug"
                      label="Slug"
                      component={Fields.TextArea}
                      type="textarea"
                    />
                    <Field
                      name="status"
                      label="Status"
                      component={Fields.Switch}
                    />
                    <div className="flex justify-end mb-4">
                      <Button type="primary" onClick={handleSubmit}>
                        Создать
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          );
        }}
      </ContainerOne>
    </div>
  );
};

export default UpdatePage;
