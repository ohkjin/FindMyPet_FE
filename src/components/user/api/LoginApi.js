import axios from "axios";

const API_SERVER = 'http://10.125.121.183:8080'

const prefix = `${API_SERVER}/user/login`

export const userLogin = async (email, pwd) => {
    console.log("API_SERVER_HOST",API_SERVER)
    console.log("prefix",prefix)
    try {
        const res = axios.post(`${prefix}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            userId: email,
            password: pwd
        })
        return res.data
    } catch (e) {
        return null
    }
}