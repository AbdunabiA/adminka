import Axios from "crud/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notification } from "antd";

const usePut = ({url, queryKey}) => {
      const queryClient = useQueryClient();


      const mutation = useMutation({
        mutationFn: ({values, resetForm, id}) => {
            return Axios.put(`${url}${id}`, values).then((res) => resetForm()); 
        },
        onSuccess: () => {
          notification.success({
            message: "Changed",
          });
          queryClient.invalidateQueries({ queryKey: queryKey[0] });
        },
        onError: (error) => {
          console.log(error);
        },
      });
      return mutation;
}

export default usePut;