import axios from "axios";

const API_SERVER_HOST = 'http://10.125.121.183:8080'

const prefix = `${API_SERVER_HOST}/user/join`

export const userJoin = async (userDetail) =>{
    const res = axios.post(`${prefix}`, userDetail)
    return res.data
    }