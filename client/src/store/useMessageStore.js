import {create} from 'zustand'
import {axiosInstance} from '../lib/axios'
import toast from 'react-hot-toast'
import {getSocket} from '../socket/socket.client'
import {useAuthStore} from './useAuthStore'

export const useMessageStore = create((set) => ({
    messages:[],
    loading: true,

    sendMessage: async(receiverId, content) => {
        try{
            //mockup a message and show it immediately
            set(state => ({
                messages: [...state.messages, {_id: Date.now(), sender:useAuthStore.getState().authUser._id, content}]
            }))
            const res = await axiosInstance.post('/messages/send', {receiverId, content})
            console.log('Message sent', res.data);
             
        } catch(error){
            const errorMessage = error?.response?.data?.message || error?.message || "Something went wrong";
            toast.error(errorMessage); 
        }   

    },

    getMessages: async(userId) => {
        try {
            set({loading:true})
            const res = await axiosInstance.get(`/messages/conversation/${userId}`)
            set({messages: res.data.messages, loading: false})
        } catch (error) {
            console.log(error)
            set({messages:[]})
        } finally{
            set({loading:false})   
        }
    },

    subscribeToMessages:() => {
        try{
            const socket = getSocket();

            socket.on('newMessage', ({message}) => {  //ako stavimo newMessage onda moramo dole newMessage.message i onda bi to bio ceo objekat koji sadrzi objekat message, a to nije bas idealno, zato destruktuiramo
                set(state=> ({
                    messages: [...state.messages, message]
                }))
                
            })


        } catch(error){
            console.log(error);
        }

    },

    unsubscribeFromMessages: () => {
        try{
            const socket = getSocket();
            socket.off("newMessage");

        } catch(error){
            console.log(error);
        }

    }


}))