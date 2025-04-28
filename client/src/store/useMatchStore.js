import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'

export const useMatchStore = create((set)=> ({
    matches:[],
    isLoadingMyMatches: false,
    isLoadingUserProfiles: false,
    userProfiles: [],
    swipeFeedback: null,


    getMyMatches: async () => {
        try {
           set({isLoadingMyMatches:true})
           const res =  await axiosInstance.get("/matches");
           set({matches: res.data.matches})
           
        } catch (error) {
            set({matches: []})
            const errorMessage = error?.response?.data?.message || "Something went wrong";
            toast.error(errorMessage); 

        } finally{
            set({isLoadingMyMatches:false})
        }
    },


    getUserProfiles: async () => {
        try {
           set({isLoadingUserProfiles:true})
           const res =  await axiosInstance.get("/matches/user-profiles");
           set({userProfiles: res.data.users})
           
        } catch (error) {
            set({userProfiles: []})
            const errorMessage = error?.response?.data?.message || "Something went wrong";
            toast.error(errorMessage); 

        } finally{
            set({isLoadingUserProfiles:false})
        }
    },

    swipeLeft: async (user) => {
        try{
            await axiosInstance.post("/matches/swipe-left/" + user._id);
            set({swipeFeedback:"passed"})
        } catch(error){
            console.log(error);
            toast.error("Failed to swipe left");
        }finally{
            setTimeout(()=>set({swipeFeedback: null}), 1500);
        }
    },

    swipeRight: async (user) => {
        try{
            await axiosInstance.post("/matches/swipe-right/" + user._id);
            set({swipeFeedback:"liked"})
        } catch(error){
            console.log(error);
            toast.error("Failed to swipe right");
        } finally{
            setTimeout(()=>set({swipeFeedback: null}), 1500);
        }
    }



}))