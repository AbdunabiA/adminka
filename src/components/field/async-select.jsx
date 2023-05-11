import { useGet } from 'crud';
import { get } from 'lodash';
import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'

const asyncSelect = ({
  field: { value, name },
  form: { setFieldValue, setFieldTouched },
  label,
  placeholder,
  optionLabelProp = "label",
}) => {
  const loadOptions = async () => {
    const { data } = useGet({
      url: "/banners",
      queryKey: ["banners"],
    });
    return {
      options: get(data, "data", []),
      hasMore: get(data, "current_page", 1) < get(data, "last_page", 1),
      addictional: { page: get(data, "current_page", 1) },
    };
  };
  return (
    <div className="mt-2">
      {label ? <h4>{label}</h4> : null}
      <AsyncPaginate
        name={name}
        debounceTimeout={300}
        value={value}
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        onChange={(option) => {
          setFieldValue(name, option);
        }}
        onBlur={() => setFieldTouched(name, true)}
      />
    </div>
  );
};

export default asyncSelect