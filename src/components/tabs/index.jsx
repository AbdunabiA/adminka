import { Segmented } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import qs from 'qs'
import { get } from "lodash"
import { systemSelectors } from "store/system"


const index = ({resetPage=true}) => {
    const navigate = useNavigate()
    const currentLangCode = useSelector(systemSelectors.selectLanguage);
    const params = qs.parse(location.search, { ignoreQueryPrefix: true });
    const options = [
      {
        label: "Uzbek",
        value: "uz",
      },
      {
        label: "Russian",
        value: "ru",
      },
      {
        label: "English",
        value: "en",
      },
    ];
  return (
    <Segmented
      options={options}
      value={get(params, "lang", currentLangCode)}
      onChange={(value) => {
        navigate({
          search: qs.stringify({
            ...params,
            page:resetPage ? 1 : params?.page,
            lang: value,
          }),
        });
      }}
    />
  );
}

export default index