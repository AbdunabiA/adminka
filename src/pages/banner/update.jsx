import { Button, notification } from "antd"
import { Fields } from "components"
import { Field } from "formik"
import { get } from "lodash"
import { ContainerForm, ContainerOne } from "modules"
import { useNavigate, useParams } from "react-router-dom"


const update = () => {
    const {id} = useParams()
    const navigate = useNavigate()
  return (
    <>
      <Button className="mb-5" type="primary" onClick={() => navigate(-1)}>
        Exit
      </Button>
      <ContainerOne
        url={`/banners/${id}`}
        queryKey={["banner"]}
        params={{
          extra: { _l: "uz" },
        }}
      >
        {({ item }) => (
          <ContainerForm
            url={`/banners/${item?.id}`}
            method="put"
            params={{
              extra: { _l: "uz" },
            }}
            onSuccess={() => {
              notification.success({
                message: "Updated",
              });
            }}
            fields={[
              {
                name: "name_uz",
                type: "string",
                required: true,
                value: get(item, "name_uz", ""),
              },
              {
                name: "description_uz",
                type: "string",
                required: true,
                value: get(item, "description_uz", ""),
              },
            ]}
          >
            {({ isFetching, handleSubmit }) => (
              <>
                <Field name="name_uz" label="Name" component={Fields.Input} />
                <Field
                  name="description_uz"
                  label="Description"
                  component={Fields.Input}
                />
                <div className="w-full flex justify-end">
                  <Button
                    className=""
                    type="primary"
                    disabled={isFetching}
                    onClick={handleSubmit}
                  >
                    Create
                  </Button>
                </div>
              </>
            )}
          </ContainerForm>
        )}
      </ContainerOne>
    </>
  );
}

export default update