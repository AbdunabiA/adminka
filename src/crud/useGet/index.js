import { useQuery } from "@tanstack/react-query";
import { api, queryBuilder } from "services";

const useGet = ({url, queryKey, params, onSuccess, onError}) => {

    const data = useQuery({
        queryKey:[...queryKey, params],
        queryFn:()=>{
            return api.get(queryBuilder(url, params));
        },
        // onSuccess:(data)=>onSuccess(data),
        // onError:(error)=>onError(error)
    })

    return data
}

export default useGet;