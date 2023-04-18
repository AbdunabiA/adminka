import { Switch } from "antd"

const index = (props) => {
    const {
        label, 
        field, 
        form:{setFieldValue}
    } = props
  return (
    <div>
        {label?<h4>{label}</h4> : null}
        <Switch
          name={field.name}
          checked={field.value}
          onChange={(e) => setFieldValue(field.name, e ? 1 : 0)}
        />
    </div>
  )
}

export default index