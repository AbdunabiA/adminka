import { Button } from "antd";
import { Fields } from "components";
import { Field } from "formik"
import { get } from "lodash";
import { ContainerForm } from "modules"
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import qs from 'qs'
import { types } from ".";
import { systemSelectors } from "store/system";

const create = () => {
    const navigate = useNavigate()
    const currentLangCode = useSelector(systemSelectors.selectLanguage);
    // const location  = useLocation()
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  return (
    <div className="mx-auto w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[clamp(320px,40%,1810px)]">
      <Button
        className="mb-5"
        type="primary"
        onClick={() =>
          navigate({
            pathname: "/banners",
            search: qs.stringify({
              ...params,
            }),
          })
        }
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
            name: `name_${get(params, "lang", currentLangCode)}`,
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: `description_${get(params, "lang", currentLangCode)}`,
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "type",
            type: "number",
            required: true,
          },
          {
            name: "file_id",
            type: "array",
            onSubmitValue: (value) => {
              // console.log(value);
              return value[0].id;
            },
          },
        ]}
        onSuccess={(data) =>
          navigate({
            pathname: `/banner/update/${data?.id}`,
            search: qs.stringify({ ...params }),
          })
        }
      >
        {({ handleSubmit }) => {
          return (
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
                <Button className="" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </>
          );
        }}
      </ContainerForm>
    </div>
  );
}

export default create