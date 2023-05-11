import { Select } from "antd";


const select = ({
  field: { value, name },
  form: { setFieldValue },
  options,
  label,
  placeholder,
  optionLabelProp='label',
}) => {

  return (
    <div>
      {label ? <h4>{label}</h4> : null}
      <Select
        defaultValue={value}
        rootClassName="w-full"
        showSearch
        placeholder={placeholder}
        optionLabelProp={optionLabelProp}
        onChange={(e) => setFieldValue(name, e)}
        filterOption={(input, option) =>
          (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />
    </div>
  );
};

export default select;
