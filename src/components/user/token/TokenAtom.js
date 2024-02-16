import { atom } from "recoil";
import { getToken } from "./TokenManager";

export const userAuth = atom({
    key:`userAuth${new Date().getUTCMilliseconds() * Math.random()}`,
    default: getToken('accessToken')
})