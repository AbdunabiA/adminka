import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { get } from "lodash";

export const usePostData = (queryKey, data, setData, token) => {
  const queryClient = useQueryClient();

  const postData = (values) => {
    return axios[data.item ? "put" : "post"](
      `http://api.test.uz/api/v1/admin/banners/${
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