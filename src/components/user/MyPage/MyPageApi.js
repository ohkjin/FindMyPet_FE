import axios from "axios";

const API_SERVER = process.env.REACT_APP_API_SERVER_HOST;

const prefix = `${API_SERVER}/user/mypage`
//intercept///////////////////////////
export const userLogin = async (email, pwd) => {
    console.log("API_SERVER_HOST",API_SERVER)
    console.log("prefix",prefix)
    try {
        await axios.post(`${prefix}`, {
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