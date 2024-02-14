import axios from "axios";

const API_SERVER_HOST = process.env.API_KEY

const prefix = `${API_SERVER_HOST}/user/join`

export const userJoin = async (userDetail) =>{
    const res = axios.post(`${prefix}`, userDetail)
    return res.data
    }