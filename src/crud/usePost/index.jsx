import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "crud/axios";


const usePost = ({url, queryKey}) => {
  const queryClient = useQueryClient();


  const mutation = useMutation({
    mutationFn: ({values, resetForm}) => {
      return Axios.post(`${url}`, values).then((res)=>resetForm());
    },
    onSuccess: () => {
      notification.success({
        message: "Created",
      });
      queryClient.invalidateQueries({ queryKey});
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return mutation;
};

export default usePost;
