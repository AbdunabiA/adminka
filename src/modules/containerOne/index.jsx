import { useGet } from "crud";
import { get } from "lodash";

const index = ({ url, queryKey, params, onSuccess, onError, children }) => {
  const data = useGet({ url, queryKey, params, onSuccess, onError });
  // console.log(get(data, "data.data"));
  return children({
    item: get(data, "data.data"),
    ...data
  });
};

export default index;
