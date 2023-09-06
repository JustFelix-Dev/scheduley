import axios from 'axios';

const axiosInstance = axios.create({
       baseURL : 'https://www.scheduley-server.felixdev.com.ng',
       withCredentials:true
})
export default  axiosInstance;
