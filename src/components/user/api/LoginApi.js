import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:3000'

const prefix = `${API_SERVER_HOST}/user/login`

export const userLogin = async (email, pwd) => {
    try {
        const res = axios.get(`${prefix}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            params: {
                email: email,
                password: pwd
            }
        })
        return res.data
    } catch (e) {
        return null
    }
}