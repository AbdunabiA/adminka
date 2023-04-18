import { useQuery } from "@tanstack/react-query";
import Axios from "crud/axios";
import storage from "services/storage";

const useGet = ({url, queryKey}) => {
    const token = storage.get('token')

    const data = useQuery({
        queryKey,
        queryFn:()=>{
            return Axios.get(`${url}`);
        }
    })

    return data
}

export default useGet;