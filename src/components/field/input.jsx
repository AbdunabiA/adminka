import React from "react";
import { Input} from "antd";

const TextInput = ({
  field,
  label,
  required = false,
  type,
  onChange,
  checked,
  placeholder,
  form: { setFieldValue, errors, touched },
}) => {
  return (
    <div className="mb-2">
      {label ? <h2>{label}</h2> : null}
      {type === "textarea" ? (
        <Input.TextArea
          name={field.name}
          status={touched[field.name] && errors[field.name] && "error"}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <Input
          name={field.name}
          status={touched[field.name] && errors[field.name] && "error"}
          value={field.value}
          onChange={(e) => setFieldValue(field.name, e.target.value)}
          placeholder={placeholder}
        />
      )}
    </div>
  );
};

export default TextInput;
