import { Button, notification } from "antd";
import { Fields, Tabs } from "components";
import { Field} from "formik";
import { get } from "lodash";
import { ContainerOne, ContainerForm } from "modules";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import qs from 'qs'
import { systemSelectors } from "store/system";

const UpdatePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentLangCode = useSelector(systemSelectors.selectLanguage);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  return (
    <div className="mx-auto w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 2xl:w-[clamp(320px,40%,1810px)]">
      <div className="flex justify-between items-center mb-4">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate("/pages")}
        >
          Exit
        </Button>
        <Tabs />
      </div>
      <ContainerOne
        url={`/pages/${id}`}
        queryKey={["page"]}
        params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
      >
        {({ item, isLoading }) => {
          // console.log(item);
          return (
            <ContainerForm
              url={`/pages/${id}`}
              method="put"
              params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
              onSuccess={(data, resetForm) => {
                notification.success({
                  message: "Changed",
                });
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: get(item, "data.title", ""),
                  required: true,
                },
                {
                  name: "description",
                  type: "string",
                  value: get(item, "data.description", ""),
                  required: true,
                },
                {
                  name: "slug",
                  type: "string",
                  value: get(item, "data.slug", ""),
                  required: true,
                  max: 100,
                },
                {
                  name: "status",
                  type: "boolean",
                  value: get(item, "data.status", "") === 1 ? true : false,
                  onSubmitValue: (value) => (value ? 1 : 0),
                },
              ]}
            >
              {({ values, errors, handleSubmit }) => {
                return (
                  <>
                    <Field
                      name="title"
                      label="Title"
                      component={Fields.Input}
                    />
                    <Field
                      name="description"
                      label="Description"
                      component={Fields.TextArea}
                    />
                    <Field name="slug" label="Slug" component={Fields.Input} />
                    <Field
                      name="status"
                      label="Status"
                      component={Fields.Switch}
                    />
                    <div className="flex justify-end mb-4">
                      <Button type="primary" onClick={handleSubmit}>
                        Update
                      </Button>
                    </div>
                  </>
                );
              }}
            </ContainerForm>
          );
        }}
      </ContainerOne>
    </div>
  );
};

export default UpdatePage;
