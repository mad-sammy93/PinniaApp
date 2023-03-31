import { defineStore } from "pinia";
import axios from 'axios'
import router from '../../router/index'




// const user = localStorage.getItem('user');
// const userState = user ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null };

export const useAuthStore = defineStore('authStore', { 
    id: 'auth',
    state: () => ({
        id: 'auth',
        loading : false,
        accessToken: null,
        isAuthenticated: false,
        // user: null,
        refreshTokenTimeout: null,
        error : null,
        user: null,
        // accessToken: JSON.parse(localStorage.getItem('token')),
        // [
        //     {
        //         "id": 1,
        //         "name": "Sam",
        //         "email": "sam@gmail.com",
        //         "password": "123456",
        //         "status" : { 
        //             loggedIn: false 
        //         }
        //     }
        // ],
    }),

    actions: {
        getState(){
            console.log('refreshTokenTimeout : '+this.refreshTokenTimeout)
            console.log('loading : '+this.loading)
            console.log('isAuthenticated : '+this.isAuthenticated)

            console.log('error : '+this.error)

            console.log('user : '+JSON.stringify(this.user))

            console.log('accessToken : '+this.accessToken)
        },
        // setAccessToken(token) {
        //     this.accessToken = token;
        //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        // },
        // clearAccessToken() {
        //     this.accessToken = null;
        //     delete axios.defaults.headers.common['Authorization'];
        // },
        async login(payload) {
                let result = await axios.post( '/auth/login' ,payload,{ 
                    withCredentials: true,
                }) .then(response => {

                    // console.log(result.status)
                    // this.startRefreshTokenTimer()        
                    const { accessToken } = response.data;

                    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
                    // console.log(axios.defaults.headers.common['Authorization'])
                    // this.user = response
                    this.accessToken = accessToken
                    localStorage.setItem('accessToken', accessToken);
                    // localStorage.setItem('user', JSON.stringify(this.user))
                    this.isAuthenticated = true;
                    // this.user = {name:payload.email};
                    // startRefreshTokenTimer()
                    
                    //Getting info from auth token since we dont have a user endpoint
                    this.getUserInfo()
                    router.push('/')
                })
                .catch(error => {
                    
                    console.warn('Login failed:', error);
                    this.error = error.message || 'Something went wrong'
                })
                .finally(() => this.loading = false)

              
        },
        // startRefreshTokenTimer() {
        //     // parse json object from base64 encoded jwt token
        //     const jwtBase64 = this.user.data.accessToken.split('.')[1];
        //     const jwtToken = JSON.parse(atob(jwtBase64));
        //     console.log(jwtToken)
    
        //     // set a timeout to refresh the token a minute before it expires
        //     const expires = new Date(jwtToken.exp * 1000);
        //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
        //     this.refreshTokenTimeout = setTimeout(this.authToken, timeout);
        // },
        getUserInfo() {
            // parse json object from base64 encoded jwt token
            const jwtBase64 = this.accessToken.split('.')[1];
            const jwtToken = JSON.parse(atob(jwtBase64));
            // console.log(jwtToken)
    
            // set a timeout to refresh the token a minute before it expires
            const expires = new Date(jwtToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (60 * 1000);
            this.refreshTokenTimeout = setTimeout(this.authToken, timeout);

            // console.log(this.refreshTokenTimeout)
            this.user = jwtToken
            localStorage.setItem('user', JSON.stringify(jwtToken));
        },
        async signup(payload) {
            // console.log(payload.name)
            if(payload.email === '' || !payload.email.includes('@') || payload.password.length < 6){
                this.formIsValid = false
            }
            
                let result = await axios.post("/auth/register", payload ,
                )
                .then(response => {
                    // console.log(response.data)
                    // this.tasks = response.data


                    // user.sendEmailVerification(actionCodeSettings);
                })
                .catch(error => {
                    console.log(error)
                    this.error = error.message || 'Somethign went wrong'
                    // this.errored = true
                })
                .finally(() => this.loading = false)

                result
                console.debug(result);
        },
        logout() {
            localStorage.removeItem('accessToken')
            localStorage.removeItem('user')

            // localStorage.removeItem('authSTore')
            // localStorage.removeItem('taskSTore')
            
            //If there was a logout endpoint
            // axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
            this.accessToken = null
            this.isAuthenticated = false
            this.user = null
            router.push('/login')
            this.error = 'Logged Out'
          },

        hello(name){
            console.log(name)
            // refreshToken()
            // return 'hello '+name;
        }
    },
    // // Set up Axios interceptors in the store module
    // created() {
    //     // Add a request interceptor to set the Authorization header with the access token
    //     axios.interceptors.request.use((config) => {
    //         // Add the Authorization header with the access token if it exists
    //         if (this.accessToken) {
    //             config.headers.Authorization = `Bearer ${this.accessToken}`;
    //             alert('intercept');
    //         }
    //         return config;
    //     },
    //         (error) => {
    //             return Promise.reject(error);
    //         }
    //     );

    //     // Add a response interceptor to handle expired access tokens
    //     axios.interceptors.response.use(
    //         (response) => {
    //             return response;
    //         },
    //         async (error) => {
    //             if (error.response.status === 401) {
    //                 if (error.response.data.message === 'Access token has expired') {
    //                     // Call an action to refresh the access token and retry the original request
    //                     await this.refreshToken();
    //                     const retryOriginalRequest = error.config;
    //                     retryOriginalRequest.headers.Authorization = `Bearer ${this.accessToken}`;
    //                     return axios(retryOriginalRequest);
    //                 }
    //             }
    //             return Promise.reject(error);
    //         }
    //     );
    // },
    // methods: {
    //     async refreshToken() {
    //         console.log('refreshing Token')
    //         this.isAuthenticated = false;
    //         let result = await axios
    //             .post('/auth/refresh',null,{
    //                 withCredentials: true, 
    //               })
    //             .then(response => {
    //                 console.log(response)
    //                 console.log('token refreshed')

    //                 const { accessToken } = response.data;
    //                 localStorage.setItem('accessToken', accessToken);
    //                 this.isAuthenticated = true;

    //                 this.setAccessToken(accessToken);
    //                 // localStorage.setItem("user",payload.email );
    //                 // router.push({name:'home'})
    //                 // router.push('/')
    //                 // router.go(-1) 
    //                 // router.back()
    //             })
    //             .catch(error => {
    //                 console.log(error)
    //                 // this.error = true
    //                 this.error = error.message || 'Something went wrong'
    //                 router.push('/login')
    //             })
    //             .finally(() => this.loading = false)
                
    //     },
    // },
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        // currentUser: (state) => state.user,
    },
    mutations:{
        user(state,user){
            state.user = user
        }
    }
    // persist: true

})