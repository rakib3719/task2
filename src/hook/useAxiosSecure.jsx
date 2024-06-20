import axios from "axios";

import { useNavigate } from "react-router-dom";
// /
const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',

    withCredentials: true
  })
const useAxiosSecure = () => {



const navigate = useNavigate()

    axiosSecure.interceptors.response.use(
        res => {
          return res
        },
        async error => {
      
          if (error.response.status === 401 || error.response.status === 403) {
            // await logOut()
            navigate('/login')
          }
          return error.response;
        }
      )
    return axiosSecure;
};

export default useAxiosSecure;