import { Button } from "antd";
import { Fields } from "components";
import { Field } from "formik";
import { ContainerForm } from "modules";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const create = () => {
  const navigate = useNavigate();
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  return (
    <>
      <Button
        className="mb-5"
        type="primary"
        onClick={() => navigate("/pages")}
      >
        Exit
      </Button>
      <ContainerForm
        url="/pages"
        method="post"
        params={{
          extra: { _l: currentLangCode },
        }}
        fields={[
          {
            name: "title",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "description",
            type: "string",
            required: true,
            min: 3,
          },
          // {
          //   name: "slug",
          //   type: "string",
          //   required: true,
          //   min: 3,
          // },
          {
            name: "status",
            type: "boolean",
            onSubmitValue: (value) => (value ? 1 : 0),
          },
        ]}
        onSuccess={(data) => {
          // console.log(data);
          navigate(`/page/update/${data?.data?.id}`);
        }}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <Field name="title" label="Заголовок" component={Fields.Input} />
              <Field
                name="description"
                label="Описание"
                component={Fields.TextArea}
              />
              {/* <Field
                name="slug"
                label="Контент"
                component={Fields.TextArea}
                type="textarea"
              /> */}
              <Field name="status" label="Status" component={Fields.Switch} />
              <div className="w-full flex justify-end">
                <Button className="" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </>
          );
        }}
      </ContainerForm>
    </>
  );
};

export default create;
