import { Input } from "antd"

const {TextArea} = Input

const textInput = ({
    field, 
    label,
    required=false,
    placeholder,
    rows = 6,
    errorMessage = 'Это поле объязательное',
    form:{setFieldValue, setFieldTouched, errors, touched}
}) => {

    const onBlur = () => {
        if(!field.value){
            setFieldTouched(field.name,true)
        }
    }
  return (
    <div className="mb-2">
      {label ? <h4>{label}</h4> : null}
      <TextArea
        rows={rows}
        name={field.name}
        value={field.value}
        onBlur={() => setFieldTouched(field.name, true)}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
        status={
          touched[field.name] && errors[field.name] && "error"
        }
      />
      {touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errorMessage}
        </small>
      )}
    </div>
  );
}

export default textInput