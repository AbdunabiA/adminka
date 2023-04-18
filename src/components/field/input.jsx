import React from "react";
import { Input} from "antd";

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  errorMessage = 'Это объязательное поле',
  form: { setFieldValue,setFieldTouched, errors, touched },
}) => {
  const handleBlur=()=>{
    if(!field.value){
      setFieldTouched(field.name, true)
      errors[field.name] = 'This field is required'
    }
  }
  return (
    <div className="mb-2">
      {label ? <h4>{label}</h4> : null}
      <Input
        name={field.name}
        onBlur={handleBlur}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
      />
      {touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errorMessage}
        </small>
      )}
    </div>
  );
};

export default TextInput;
