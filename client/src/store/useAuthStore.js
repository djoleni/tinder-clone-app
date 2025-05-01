import {create} from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'
import { initializeSocket } from '../socket/socket.client'
import { disconnectSocket } from '../socket/socket.client'

export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true, //kada refreshujemo page za trenutak cemo proveriti da li je auth ili ne
    loading: false,

    signup: async(signupData) => {
        try{
            set({loading:true})
            const res = await axiosInstance.post("auth/signup", signupData);
            set({authUser: res.data.user}) //na backendu returnujemo user
            initializeSocket(res.data.user._id)
            toast.success("Account created successfully")
        } catch(error){
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(errorMessage); 
        } finally{
            set({loading:false})
        }


    },

    login: async (loginData) => {
        try{
            set({loading:true})
            const res = await axiosInstance.post("auth/login", loginData);
            set({authUser: res.data.user})
            initializeSocket(res.data.user._id)
            toast.success("Logged in successfully");
        } catch(error){
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(errorMessage); 
        } finally{
            set({loading:false})
        }
    },

    logout: async () => {
        try{
            const res = await axiosInstance.post('/auth/logout');
            disconnectSocket();
            if(res.status === 200) {
                 set({authUser: null})
                 toast.success("Logged out successfully")
                }
        } catch(error){
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(errorMessage); 
        }
    },

    checkAuth: async () => {
        try{
            const res = await axiosInstance.get('/auth/me');
            initializeSocket(res.data.user._id);
            set({authUser: res.data.user});
        } catch(error){
            set({authUser: null});
            console.log(error);
        } finally{
            set({checkingAuth:false})
        }
    },
    
    setAuthUser: (user) => set({authUser: user})
    




}))