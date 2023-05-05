import React from "react";
import {Input} from "antd";

const TextInput = ({
  field,
  label,
  required = false,
  placeholder,
  errorMessage = 'Это объязательное поле',
  form: { setFieldValue,setFieldTouched, errors, touched },
}) => {
  return (
    <div className="mb-2">
      {label ? <h4>{label}</h4> : null}
      <Input
        name={field.name}
        onBlur={() => setFieldTouched(field.name, true)}
        status={touched[field.name] && errors[field.name] && "error"}
        value={field.value}
        onChange={(e) => setFieldValue(field.name, e.target.value)}
        placeholder={placeholder}
      />
      {touched[field.name] && errors[field.name] && (
        <small className="text-red-500 font-semibold text-xs">
          {errors[field.name]}
        </small>
      )}
    </div>
  );
};

export default TextInput;
