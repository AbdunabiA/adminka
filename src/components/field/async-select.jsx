import { useGet } from 'crud';
import { get } from 'lodash';
import React from 'react'
import { AsyncPaginate } from 'react-select-async-paginate'
import { api, queryBuilder } from 'services';

const asyncSelect = ({
  field: { value, name },
  form: { setFieldValue, setFieldTouched },
  label,
  optionLabel,
  optionValue,
  loadOptionsUrl,
  loadOptionsParams,
  menuPlacement='bottom',
  isMulti,
  placeholder,
}) => {
  const loadOptions = async () => {
    const data = await api.get(queryBuilder(loadOptionsUrl, loadOptionsParams));
    // console.log(data.data);
    return {
      options: get(data, "data.data", []),
      hasMore: get(data, "data.current_page", 1) < get(data, "data.last_page", 1),
      addictional: { page: get(data, "current_page", 1) },
    };
  };
  return (
    <div className="mt-2">
      {label ? <h4>{label}</h4> : null}
      <AsyncPaginate
        name={name}
        value={value}
        isMulti={isMulti}
        debounceTimeout={300}
        getOptionLabel={(option) =>
          typeof optionLabel == "function"
            ? optionLabel(option)
            : option[optionLabel]
        }
        getOptionValue={(option) =>
          typeof optionValue == "function"
            ? optionValue(option)
            : option[optionValue]
        }
        loadOptions={loadOptions}
        additional={{ page: 1 }}
        onChange={(option) => {
          // console.log(option);
          setFieldValue(name, option);
        }}
        menuPlacement={menuPlacement}
        // onInputChange={(e)=>console.log(e)}
        onBlur={() => setFieldTouched(name, true)}
        on
      />
    </div>
  );
};

export default asyncSelect