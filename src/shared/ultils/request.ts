import axios from "axios";

const request = axios.create({
    baseURL: 'https://localhost:7112/api/',
    timeout: 3000000
})

request.interceptors.response.use(
    (response: any) => {
        return response.data
    }  ,
    (error: any) => {
        console.log(error);
    } 
)
// export const get = async (path, option = {}) => {
//     const res = await request.get(path, option)
//     return res.data
// }
// export const post = async (path, option = {}) => {
//     const res = await request.post(path, option)
//     return res.data
// }
export default request