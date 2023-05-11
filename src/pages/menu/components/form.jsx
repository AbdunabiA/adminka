import { useQueryClient } from "@tanstack/react-query"
import { Button, Modal, notification } from "antd"
import { Fields } from "components"
import { Field } from "formik"
import {get} from 'lodash'
import { ContainerForm } from "modules"

const form = ({menuModal, setMenuModal=()=>{}}) => {
  const queryClient = useQueryClient()
  // console.log(menuModal);
  return (
    <Modal
      key={get(menuModal, "item.id")}
      open={get(menuModal, "isOpen")}
      title={get(menuModal, "item.id") ? "Update" : "Create"}
      onCancel={() => setMenuModal({ isOpen: false, item: null })}
      footer={false}
      centered={true}
    >
      <ContainerForm
        url={
          get(menuModal, "item.id") ? `/menu/${menuModal?.item?.id}` : "/menu"
        }
        method={get(menuModal, "item.id") ? "put" : "post"}
        params={{ extra: { _l: "uz" } }}
        fields={[
          {
            name: "title",
            required: true,
            value: get(menuModal, "item.title", ""),
          },
          {
            name: "alias",
            required: true,
            value: get(menuModal, "item.alias", ""),
          },
        ]}
        onSuccess={() => {
          queryClient.invalidateQueries({ queryKey: ["menus"] });
          notification.success({
            message: get(menuModal, "item.id") ? "Changed" : "Created",
          });
          setMenuModal({ isOpen: false, item: null });
        }}
      >
        {({ handleSubmit }) => {
          return (
            <>
              <Field name="title" label="Title" component={Fields.Input} />
              <Field name="alias" label="Alias" component={Fields.Input} />
              <Button type="primary" onClick={handleSubmit}>
                {get(menuModal, "item.id") ? "Update" : "Create"}
              </Button>
            </>
          );
        }}
      </ContainerForm>
    </Modal>
  );
}

export default form