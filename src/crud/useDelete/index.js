import { useMutation } from "@tanstack/react-query";
import { api, queryBuilder } from "services";

async function deleteData({
  url,
  params,
  onSuccess = () => {},
  onError = () => {},
}) {
  return await api.delete(queryBuilder(url, params))
    .then((data) => {
      onSuccess(data);
    })
    .catch((error) => {
      onError(error);
    });
}

const useDelete = () => {
  return useMutation(deleteData);
};

export default useDelete;



