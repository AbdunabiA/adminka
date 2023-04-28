import { Button, Spin } from 'antd'
import { Fields } from 'components'
import { Field } from 'formik'
import { get } from 'lodash'
import { ContainerForm, ContainerOne } from 'modules'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const update = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  return (
    <ContainerOne 
    url={`/posts/${id}`}
    queryKey={['post']}
    >
      {
        ({item, isLoading})=>{
          console.log(item);
          return(
            <ContainerForm
              url={`/posts/${id}`}
              method="put"
              params={{extra:{_l:'uz'}}}
              onSuccess={(data, resetForm) => {
                navigate(-1)
              }}
              fields={[
                {
                  name: "title",
                  type: "string",
                  value: get(item, "title", ""),
                  required: true,
                },
                {
                  name: "description",
                  type: "string",
                  value: get(item, "description", ""),
                  required: true,
                },
                {
                  name: "content",
                  type: "string",
                  value: get(item, "content", ""),
                  required: true,
                  min: 5,
                  max: 100,
                },
                {
                  name: "status",
                  type: "boolean",
                  value: get(item, "status", "") === 1 ? true : false,
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
                        Update
                      </Button>
                    </div>
                  </>
                );
              }}
            </ContainerForm>
          );
        }
      }
    </ContainerOne>
  )
}

export default update