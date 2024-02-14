// import axios from "axios";
// import { useCookies } from "react-cookie";
// // import { HTTP_ONLY } from './config.json'

// export default function setToken(accessToken,refreshToken) {
//     axios.defaults.headers.Authorization = 'Bearer '+accessToken;
//     const [accesscookie,setAccessCookie] = useCookies(['accessToken'])
//     const expires = new Date()
//     expires.setDate(Date.now() + 1000*60*60*24)
//     setAccessCookie(
//         'accessToken',
//         accessToken,
//         {
//             path:'/',
//             expires,
//             httpOnly: true
//         }
//     )
//     cookie.save(
//         'refreshToken',
//         refreshToken,
//         {
//             path:'/',
//             expires,
//             httpOnly: true
//         }
//     )
// }
