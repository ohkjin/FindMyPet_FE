import axios from "axios"

export const API_SERVER_HOST = 'http://localhost:8080'

const prefix = `${API_SERVER_HOSt}/api/todo`

export const getUser = async (uid) => {
    try{
        const res = await axios.get(`${prefix}/${uid}`)
        return res.data
    }catch(e){
        console.log(e)
        alert('Error')
    }
    
}
