import axios from "axios";
import storage from "services/storage";

const token = storage.get('token')
const Axios = axios.create({
  baseURL: "http://api.test.uz/api/v1/admin/",
  headers: {
    Authorization: "Bearer " + token,
  },
});

export default Axios;