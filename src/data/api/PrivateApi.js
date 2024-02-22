import axios from "axios";

const instance = axios.create({
    baseURL: `${process.env.REACT_APP_API_SERVER_HOST}/user`,
    timeout:1000
})

instance.interceptors.request.use(
    (config)=>{
        config.headers["Content-Type"] = "application/json; charset=utf-8";
        config.headers["Authorization"] = '';
        return config;
    }
)