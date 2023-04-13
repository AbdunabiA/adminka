import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { get } from "lodash";

export const usePostData = (queryKey, data, setData,token, api) => {
  const queryClient = useQueryClient();

  const postData = (values) => {
    return axios[data.item ? "put" : "post"](
      `${api}${
        get(data, "item") ? get(data, "item.id") : ""
      }`,
      values,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
  };

  const mutation = useMutation({
    mutationFn: (values) => postData(values),
    onSuccess: () => {
      setData({ isOpen: false, item: null });
      queryClient.invalidateQueries({ queryKey});
    },
    onError: (error) => {
        console.log(error);
    },
  });
  return mutation;
};