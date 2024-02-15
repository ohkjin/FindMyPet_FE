import { atom } from "recoil";
import { getToken } from "./TokenManager";

const userAtom = atom({
    key:'auth',
    default: getToken('accessToken')
})