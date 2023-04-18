import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";
import Axios from "crud/axios";


const useDelete = ({url, queryKey}) =>{
    const queryClient = useQueryClient()
    const mutation = useMutation({
      mutationFn: (id) => {
        return Axios.delete(`${url}${id}`);
      },
      onSuccess: () => {
        notification.success({
          message: "Deleted",
        });
        queryClient.invalidateQueries({ queryKey: queryKey });
      },
    });
    return mutation
}

export default useDelete