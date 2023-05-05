import { Button, notification} from 'antd'
import { Fields, Tabs } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import { ContainerAll, ContainerForm, ContainerOne } from 'modules'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import qs from 'qs'

const update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const currentLangCode = useSelector((state) => state.system.currentLangCode);
  const params = qs.parse(location.search, { ignoreQueryPrefix: true });
  console.log(get(params, "slug", ""));
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <Button
          className="mb-5"
          type="primary"
          onClick={() => navigate({
            pathname:"/posts",
            search:qs.stringify({
              ...params
            })
          })}
        >
          Exit
        </Button>
        <Tabs />
      </div>
      <ContainerAll
        url={`/posts`}
        queryKey={["post"]}
        params={{
          filter: { slug: get(params, "slug", "") },
          extra: { _l: get(params, "lang", currentLangCode) },
        }}
      >
        {({ items, isLoading, data }) => {
          console.log(items);
          return (
            <ContainerForm
              url={`/posts/${items?.length ? items[0].id : ""}`}
              method={items?.length ? "put" : "post"}
              params={{
                extra: { _l: get(params, "lang", currentLangCode) },
              }}
              onSuccess={(data, resetForm) => {
                if (items) {
                  notification.success({
                    message: "Changed",
                  });
                }
                notification.success({
                  message: "Added",
                });
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: items?.length ? get(items[0], "title", "") : "",
                  required: true,
                },
                {
                  name: "description",
                  type: "string",
                  value: items?.length ? get(items[0], "description", "") : "",
                  required: true,
                },
                {
                  name: "slug",
                  type: "string",
                  value: items?.length
                    ? get(items[0], "slug", "")
                    : get(params, "slug", ""),
                  // required: true,
                },
                {
                  name: "content",
                  type: "string",
                  value: items?.length ? get(items[0], "content", "") : "",
                  required: true,
                  min: 5,
                  max: 100,
                },
                {
                  name: "status",
                  type: "boolean",
                  value: items?.length
                    ? get(items[0], "status", "") === 1
                      ? true
                      : false
                    : false,
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
                      component={Fields.Input}
                    />
                    <Field
                      name="content"
                      label="Content"
                      component={Fields.TextArea}
                    />
                    <Field
                      name="status"
                      label="Status"
                      component={Fields.Switch}
                    />
                    <div className="flex justify-end mb-4">
                      <Button type="primary" onClick={handleSubmit}>
                        {items?.length ? "Update" : "Add"}
                      </Button>
                    </div>
                  </>
                );
              }}
            </ContainerForm>
          );
        }}
      </ContainerAll>
    </>
  );
}

export default update