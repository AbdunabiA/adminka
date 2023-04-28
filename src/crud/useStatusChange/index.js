import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import { api, queryBuilder } from "services";

const useStatusChange = ({
  url,
  queryKey,
  params,
  onSuccess,
  onError,
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: queryKey,
    mutationFn: ({ id, values}) => {
      return api.put(queryBuilder(`${url}/${id}`, params), values)
    },
    onSuccess: () => {
      notification.success({
        message: "Changed",
      });
      queryClient.invalidateQueries({ queryKey });
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

export default useStatusChange;
