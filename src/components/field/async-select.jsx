import { get } from 'lodash';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate'
import { api, queryBuilder } from 'services';
import { systemSelectors } from 'store/system';

const asyncSelect = ({
  field: { value, name },
  form: { setFieldValue, setFieldTouched },
  label,
  optionLabel,
  optionValue,
  loadOptionsUrl,
  loadOptionsParams = {},
  menuPlacement = "bottom",
  isMulti = false,
  placeholder,
  className,
  disabled = false,
  isSearchable = false,
}) => {
  const currentLangCode = useSelector(systemSelectors.selectLanguage);
  const loadOptions = async (search, loadedOptions, { page }) => {
    let data = await api.get(queryBuilder(loadOptionsUrl, loadOptionsParams));
    
    return {
      options: search
        ? get(data, "data.data", []).filter((item) =>
            item[`name_${currentLangCode}`]
              .toLowerCase()
              .includes(search.toLowerCase())
          )
        : get(data, "data.data", []),
      hasMore: page < get(data, "data.last_page", 1),
      additional: { page: page + 1 },
    };
  };
  // useEffect(() => {
  //   loadOptions()
  // }, [loadOptionsParams?.filter?.region_id]);
  // const styles = {}
  return (
    <div className={className}>
      {label ? <h4>{label}</h4> : null}
      <AsyncPaginate
        key={loadOptionsParams?.filter?.region_id}
        isSearchable={isSearchable}
        isDisabled={disabled}
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
          console.log(option);
          setFieldValue(name, option);
        }}
        menuPlacement={menuPlacement}
        // onInputChange={(e)=>console.log(e)}
        onBlur={() => setFieldTouched(name, true)}
        placeholder={placeholder}
      />
    </div>
  );
};

export default asyncSelect