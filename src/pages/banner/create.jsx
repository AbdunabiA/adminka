import { Button } from "antd";
import { Fields } from "components";
import { Field } from "formik"
import { ContainerForm } from "modules"
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const create = () => {
    const navigate = useNavigate()
    const currentLangCode = useSelector(
      (state) => state.system.currentLangCode
    );
  return (
    <>
      <Button
        className="mb-5"
        type="primary"
        onClick={() => navigate("/banners")}
      >
        Exit
      </Button>
      <ContainerForm
        url="/banners"
        method="post"
        params={{
          extra: { _l: currentLangCode },
        }}
        fields={[
          {
            name: "name_uz",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "description_uz",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name:'file_id',
            type:'array',
            onSubmitValue:(value)=>{
              // console.log(value);
              return value[0].id
            }
          }
        ]}
        onSuccess={(data) => navigate(`/banner/update/${data?.id}`)}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <Field name="name_uz" label="Name" component={Fields.Input} />
              <Field
                name="description_uz"
                label="Description"
                component={Fields.Input}
              />
              <Field name="file_id" label="Name" component={Fields.Upload} />
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
}

export default create