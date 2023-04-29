import { Button, notification } from "antd"
import { Fields, Tabs } from "components"
import { Field } from "formik"
import { get } from "lodash"
import { ContainerForm, ContainerOne } from "modules"
import { useNavigate, useParams } from "react-router-dom"
import qs from 'qs'
import { useSelector } from "react-redux"


const update = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const currentLangCode = useSelector(
      (state) => state.system.currentLangCode
    );
  return (
    <>
      <div className="flex justify-between items-center">
        <Button className="mb-5" type="primary" onClick={() => navigate('/banners')}>
          Exit
        </Button>
        <Tabs />
      </div>
      <ContainerOne
        url={`/banners/${id}`}
        queryKey={["banner"]}
        params={{
          extra: { _l: get(params, "lang", currentLangCode) },
        }}
      >
        {({ item }) => (
          <ContainerForm
            url={`/banners/${item?.id}`}
            method="put"
            params={{
              extra: { _l: get(params, "lang", currentLangCode) },
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
                    Change
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