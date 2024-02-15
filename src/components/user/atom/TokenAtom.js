import { atom } from "recoil";
// import { getToken } from "./TokenManager";

export const userAuthentication = atom({
    key:`userAuth${new Date().getUTCMilliseconds() * Math.random()}`,
    // default: getToken('accessToken')
    default:true
})