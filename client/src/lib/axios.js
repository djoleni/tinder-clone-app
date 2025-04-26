import axios from 'axios';

//TODO AZURIRATI BASE URL TAKO DA RADI I U DEPLOYMENT
export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, //send req.cookies with every request
})