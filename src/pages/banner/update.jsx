import { Button, notification } from "antd"
import { Fields, Tabs } from "components"
import { Field } from "formik"
import { get } from "lodash"
import { ContainerForm, ContainerOne } from "modules"
import { useNavigate, useParams } from "react-router-dom"
import qs from 'qs'
import { useSelector } from "react-redux"
import { types } from ".";
import { systemSelectors } from "store/system"

const update = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const currentLangCode = useSelector(systemSelectors.selectLanguage);
  return (
    <div className="mx-auto w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[clamp(320px,40%,1810px)]">
      <div className="flex justify-between items-center">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate("/banners")}
        >
          Exit
        </Button>
        <Tabs />
      </div>
      <ContainerOne
        url={`/banners/${id}`}
        queryKey={["banner"]}
        params={{
          include: "file",
          // extra: { _l: get(params, "lang", currentLangCode) },
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
                message: get(item, `name_${get(params, "lang", currentLangCode)}`)!==null ? "Updated" : 'Created',
              });
            }}
            fields={[
              {
                name: `name_${get(params, "lang", currentLangCode)}`,
                type: "string",
                required: true,
                value: get(
                  item,
                  `name_${get(params, "lang", currentLangCode)}`,
                  ""
                ),
              },
              {
                name: `description_${get(params, "lang", currentLangCode)}`,
                type: "string",
                required: true,
                value: get(
                  item,
                  `description_${get(params, "lang", currentLangCode)}`,
                  ""
                ),
              },
              {
                name: "type",
                type: "number",
                required: true,
                value: get(item, "type", ""),
              },
              {
                name: "file_id",
                type: "array",
                value: [get(item, "file", "")],
                onSubmitValue: (value) => {
                  // console.log(value);
                  return value[0]?.id;
                },
              },
            ]}
          >
            {({ isFetching, handleSubmit }) => (
              <>
                <Field
                  name={`name_${get(params, "lang", currentLangCode)}`}
                  label="Name"
                  component={Fields.Input}
                />
                <Field
                  name={`description_${get(params, "lang", currentLangCode)}`}
                  label="Description"
                  component={Fields.Input}
                />
                <Field
                  name="type"
                  label="Type"
                  options={types}
                  placeholder="select type"
                  component={Fields.Select}
                />
                <Field name="file_id" label="Photo" component={Fields.Upload} />
                <div className="w-full flex justify-end">
                  <Button
                    className=""
                    type="primary"
                    disabled={isFetching}
                    onClick={handleSubmit}
                  >
                    {get(item, `name_${get(params, "lang", currentLangCode)}`)
                      ? "Change"
                      : 'Create'}
                  </Button>
                </div>
              </>
            )}
          </ContainerForm>
        )}
      </ContainerOne>
    </div>
  );
}

export default update