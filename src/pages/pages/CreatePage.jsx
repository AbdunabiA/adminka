import { Button } from "antd";
import {ArrowLeftOutlined} from '@ant-design/icons'
import { Fields } from "components";
import { usePost } from "crud";
import { Field, Form, Formik } from "formik";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";


const CreatePage = () => { 
  const navigate = useNavigate()
  const {mutate:postForm} = usePost({
    url:'/pages', 
    method:'post',
    queryKey:['pages'], 
    params:{extra:{_l:'uz'}},
    onSuccess:(data) =>{
      return navigate('/pages')
    }
  })
  return (
    <div>
      <Button 
      type='primary' 
      className="mb-4"
      onClick={()=>navigate(-1)}
      >
        <ArrowLeftOutlined className="text-xl"/>
      </Button>
      <Formik
        // validationSchema={validationSchema}
        initialValues={{
          title: "",
          description: "",
          slug: "",
          status: 0,
        }}
        onSubmit={(values, { resetForm }) => {
          console.log(values);
          postForm({ values, resetForm });
        }}
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
                name="slug"
                label="Slug"
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

export default CreatePage