import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:3000'

const prefix = `${API_SERVER_HOST}/user/join`

export const userJoin = async (userDetail) =>{
    const res = axios.post(`${prefix}`, userDetail)
    return res.data
    }