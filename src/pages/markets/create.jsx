import { ContainerForm } from "modules"
import { systemSelectors } from "store/system";
import qs from "qs";
import { get } from "lodash";
import { Button, Popconfirm, Table, Tooltip, notification } from "antd";
import { useSelector } from "react-redux";
import { Field } from "formik";
import { useNavigate } from "react-router-dom";
import { Fields } from "components";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const create = () => {
      const navigate = useNavigate()
      const params = qs.parse(location.search, { ignoreQueryPrefix: true });
      const currentLangCode = useSelector(systemSelectors.selectLanguage);

      const AddProduct= ({values, setFieldValue}) => {
        const product = {
            name:values.name,
            price : values.price,
            count:values.count
        }
        setFieldValue('products', [...values.products, product])
        setFieldValue('name',"")
        setFieldValue("price", "");
        setFieldValue("count", "");
      }
  return (
    <div>
      <Button
        className="mb-5"
        type="primary"
        onClick={() =>
          navigate({
            pathname: "/markets",
            search: qs.stringify({
              ...params,
            }),
          })
        }
      >
        Exit
      </Button>
      <ContainerForm
        url="/store"
        method="post"
        onSuccess={({data, resetForm})=>{
            notification.success({
                message:'Added successfully'
            })
        }}
        onError={(err) => {
          notification.error({
            message: get(err, "message", 'Something went wrong')
          });
        }}
        params={{ extra: { _l: get(params, "lang", currentLangCode) } }}
        fields={[
          {
            name: "title",
            type: "string",
          },
          {
            name: "region_id",
            type: "object",
            onSubmitValue: (value) => value?.id,
          },
          {
            name: "district_id",
            type: "object",
            onSubmitValue: (value) => value?.id,
          },
          {
            name: "products",
            value: [],
            type: "array",
          },
          {
            name: "name",
            type: "string",
          },
          {
            name: "price",
            type: "number",
          },
          {
            name: "count",
            type: "number",
          },
          
        ]}
      >
        {({ handleSubmit, values, setFieldValue }) => {
        //   console.log(values?.region_id.length);
          return (
            <>
              <div className="flex items-center space-x-2">
                <Field
                  name="title"
                  label="Title"
                  component={Fields.Input}
                  className="w-full"
                />
                <Field
                  name="region_id"
                  label="Region"
                  loadOptionsUrl="/regions"
                  //   loadOptionsParams={{ extra : {_l:currentLangCode}}}
                  isSearchable={true}
                  optionLabel={`name_${currentLangCode}`}
                  optionValue={`name_${currentLangCode}`}
                  component={Fields.AsyncSelect}
                  className="w-full"
                />
                <Field
                  disabled={values?.region_id ? false : true}
                  name="district_id"
                  label="District"
                  loadOptionsUrl="/districts"
                  loadOptionsParams={{
                    filter: { region_id: values.region_id.id },
                  }}
                  isSearchable={true}
                  optionLabel={`name_${currentLangCode}`}
                  optionValue={`name_${currentLangCode}`}
                  component={Fields.AsyncSelect}
                  className="w-full"
                />
              </div>
              <div className="flex items-center mt-5 space-x-2">
                <Field
                  name="name"
                  label="Product Name"
                  component={Fields.Input}
                  className="w-full"
                />
                <Field
                  name="price"
                  label="Product Price"
                  component={Fields.Input}
                  className="w-full"
                />
                <Field
                  name="count"
                  label="Product Count"
                  component={Fields.Input}
                  className="w-full"
                />
                <Button
                  type="primary"
                  disabled={values?.name?.trim() ? false : true}
                  className="mt-5"
                  onClick={() => AddProduct({ values, setFieldValue })}
                >
                  +AddProduct
                </Button>
              </div>
              <div className="mt-5 flex items-center justify-end">
                <Button
                  type="primary"
                  disabled={
                    values?.products?.length && values?.title?.trim()
                      ? false
                      : true
                  }
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </div>
              <Table
                className="mt-5"
                rowKey={(rec)=>rec.name}
                dataSource={values.products}
                columns={[
                  {
                    title: "Name",
                    dataIndex: "name",
                    key: "name",
                  },
                  {
                    title: "Price",
                    dataIndex: "price",
                    key: "price",
                  },
                  {
                    title: "Count",
                    dataIndex: "count",
                    key: "count",
                  },
                  {
                    title: "Action",
                    render: (_, row) => {
                      return (
                        <div className="flex gap-5">
                          <Tooltip title="Delete">
                            <Popconfirm
                              placement="topRight"
                              description={"Delete"}
                              onConfirm={() => {
                                const newProds = values.products.filter(
                                  (item) => item.name !== row.name
                                );
                                setFieldValue("products", newProds);
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <DeleteOutlined className="text-red-500 cursor-pointer text-lg" />
                            </Popconfirm>
                          </Tooltip>
                          {values.name.trim() ? null : (
                            <Tooltip title="Edit">
                              <EditOutlined
                                className="text-blue-500 cursor-pointer text-lg"
                                onClick={() => {
                                  const updateProd = values.products.find(
                                    (item) => item.name === row.name
                                  );
                                  setFieldValue("name", updateProd.name);
                                  setFieldValue("price", updateProd.price);
                                  setFieldValue("count", updateProd.count);
                                  const newProds = values.products.filter(
                                    (item) => item.name !== row.name
                                  );
                                  setFieldValue("products", newProds);
                                }}
                              />
                            </Tooltip>
                          )}
                        </div>
                      );
                    },
                  },
                ]}
              />
            </>
          );
        }}
      </ContainerForm>
    </div>
  );
}

export default create


// count: 2122;
// created_at: "2023-05-12T04:07:47.000000Z";
// id: 14;
// name: "asd";
// price: 1221;
// store_id: 11;
// updated_at: "2023-05-12T04:07:47.000000Z";