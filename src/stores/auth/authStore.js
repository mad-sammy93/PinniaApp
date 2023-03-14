import { defineStore } from "pinia";
import axios from 'axios'


export const useAuthStore = defineStore('authStore', { 
    state: () => ({
        users: [],
        loading : false
    }),

    actions: {
        hello(){
            return 'hello';
        }
    }

})