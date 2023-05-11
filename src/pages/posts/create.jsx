import { Button } from "antd";
import { Fields } from "components";
import { Field } from "formik";
import { ContainerForm } from "modules";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";
import { get } from "lodash";
import { systemSelectors } from "store/system";

const create = () => {
  const navigate = useNavigate();
  const currentLangCode = useSelector(systemSelectors.selectLanguage);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  return (
    <div className="mx-auto w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[clamp(320px,40%,1810px)]">
      <Button
        className="mb-5"
        type="primary"
        onClick={() => navigate("/posts")}
      >
        Exit
      </Button>
      <ContainerForm
        url="/posts"
        method="post"
        params={{
          extra: { _l: get(params, "lang", currentLangCode) },
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
          {
            name: "content",
            type: "string",
            required: true,
            min: 3,
          },
          {
            name: "document_ids",
            type: "array",
            onSubmitValue:(value)=>{
              return value.reduce((acc, el)=>{
                return [...acc, el.id]
              }, [])
            }
          },
          {
            name: "status",
            type: "boolean",
            onSubmitValue: (value) => (value ? 1 : 0),
          },
        ]}
        onSuccess={(data) =>
          navigate({
            pathname: `/post/update/${data?.id}`,
            search: qs.stringify({ ...params }),
          })
        }
      >
        {({ handleSubmit }) => {
          return (
            <>
              <Field name="title" label="Заголовок" component={Fields.Input} />
              <Field
                name="description"
                label="Описание"
                component={Fields.Input}
              />
              <Field
                name="content"
                label="Контент"
                component={Fields.Ckeditor}
                type="textarea"
              />
              <Field
                name="document_ids"
                label="Banners"
                loadOptionsUrl="/banners"
                isMulti={true}
                // loadOptionsParams={{ filter: { type: 1 } }}
                optionLabel={`name_${currentLangCode}`}
                optionValue={`name_${currentLangCode}`}
                component={Fields.AsyncSelect}
              />
              {/* <Field name="status" label="Status" component={Fields.Switch} /> */}
              <div className="w-full flex justify-end">
                <Button className="mt-2" type="primary" onClick={handleSubmit}>
                  Create
                </Button>
              </div>
            </>
          );
        }}
      </ContainerForm>
    </div>
  );
};

export default create;
