import { Button } from "antd";
import { Fields } from "components";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";


const PostPage = () => { 
  return (
    <div>
      <Formik
        // validationSchema={validationSchema}
        // initialValues={{
        //   title: get(modalData, "item.title", ""),
        //   description: get(modalData, "item.description", ""),
        //   content: get(modalData, "item.content", ""),
        //   status: get(modalData, "item.status", ""),
        // }}
        // onSubmit={(values, { resetForm }) => {
        //   console.log(values);
        //   modalData.item
        //     ? putForm({ values, resetForm, id: modalData.item.id })
        //     : postForm({ values, resetForm });
        // }}
      >
        {({ handleSubmit }) => {
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
                  Создать
                </Button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}

export default PostPage