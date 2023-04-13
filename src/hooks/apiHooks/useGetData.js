import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useGetData = (queryKey, api, token) => {
  const query = useQuery({
    queryKey,
    queryFn: () => {
      return axios.get(api, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    },
  });
  return query;
};

