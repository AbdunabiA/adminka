import { Segmented } from "antd"
import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import qs from 'qs'
import { get } from "lodash"


const index = () => {
    const navigate = useNavigate()
    const currentLangCode = useSelector((state) => state.system.currentLangCode)
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
            lang: value,
          }),
        });
      }}
    />
  );
}

export default index