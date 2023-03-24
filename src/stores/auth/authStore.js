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
        

        refreshTokenTimeout: null,
        loading : false,
        authToken: null,
        isAuthenticated: false,
        user: null,
        error : null
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
        // async getUsers(){
        //     const res = axios
        //     .get('http://localhost:3000/users')
        //     .then(response => {
        //         console.log(response.data)
        //         this.users = response.data
        //     })
        //     .catch(error => {
        //         console.log(error)
        //         this.errored = true
        //     })
        //     .finally(() => this.loading = false)
        // },
        async login(payload) {

            // console.log(payload)
            // console.log(payload.password)
            try {
                let response = await axios.post( 'https://nextjs-dev.deploy.nl/auth/login' ,payload)

                    console.log(response)
                    const { accessToken, user } = response.data;
                    localStorage.setItem('authToken', accessToken);
                    this.isAuthenticated = true;
                    this.authToken = accessToken;
                    this.user = {name:payload.email};
                    // startRefreshTokenTimer()
                    router.push('/')
                } catch (error) {
                    console.error('Login failed:', error);
                    this.error = error.message || 'Somethign went wrong'
                }



                    // .then(response => {

                    //     const { token, user } = response.data;

                    //     // console.log(this.user)
                    //     localStorage.setItem('authToken', token);
                    //     this.isAuthenticated = true;
                    //     this.user = user;



                    //     // this.user = JSON.stringify(response)
                    //     // console.log(this.user)
                    //     // console.table(response.headers)
                    //     // this.tasks = response.data
                    //     // localStorage.setItem("authToken", response.data.accessToken);


                    //     // this.user.status = { loggedIn: true }
                    //     // this.user.email = payload.email
                    //     // localStorage.setItem("user",payload.email );
                    //     // router.push({name:'home'})
                    //     router.push('/')
                    // })
                    // .catch(error => {
                        
                    //     console.error('Login failed:', error);
                    //     // this.errored = true
                    // })
                    // .finally(() => this.loading = false)
                

                //   if(result.status == 201) {
                //     alert('Login success')
                //     // console.log(result.data.accessToken)
                //     localStorage.setItem("authToken", JSON.stringify(result.data.accessToken));
                //     this.$router.push({name:'home'})
                //   } else {
                //     confirm('failed')
                //   }
        },
        
        // startRefreshTokenTimer() {
        //     // parse json object from base64 encoded jwt token
        //     const jwtBase64 = this.user.jwtToken.split('.')[1];
        //     const jwtToken = JSON.parse(atob(jwtBase64));
    
        //     // set a timeout to refresh the token a minute before it expires
        //     const expires = new Date(jwtToken.exp * 1000);
        //     const timeout = expires.getTime() - Date.now() - (60 * 1000);
        //     this.refreshTokenTimeout = setTimeout(this.authToken, timeout);
        // },  
        // async refreshTokens() {
        //     try {
        //       const response = await axios.post('https://nextjs-dev.deploy.nl/auth/refresh', null, {
        //         withCredentials: true, // Ensure that the browser sends the HTTP-only refresh token
        //       });
        
        //       // If the token refresh was successful, set the new access token value
        //       const { token } = response.data;
        //       localStorage.setItem('authToken', token);
        //     } catch (error) {
        //       console.error('Token refresh failed:', error);
        //     }
        // },  
        async refreshToken() {
            // const token = localStorage.getItem('authToken');

            // const config = {
            //     headers: { Authorization: `Bearer ${token}` }
            // };

            let result = await axios
                .post('https://nextjs-dev.deploy.nl/auth/refresh',{
                    withCredentials: true,
                  })
                .then(response => {
                    console.log(response)
                    // this.tasks = response.data
                    localStorage.setItem("authToken", response.data.accessToken);
                    // localStorage.setItem("user",payload.email );
                    // router.push({name:'home'})
                    // router.push('/')
                    // router.go(-1) 
                    // router.back()
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)
                
        },
        async signup(payload) {
            console.log(payload.name)
            // if(payload.email === '' || !payload.email.includes('@') || payload.password.length < 6){
            //     this.formIsValid = false
            // }
            
                let result = await axios.post("https://nextjs-dev.deploy.nl/auth/register", payload ,
                )
                .then(response => {
                    console.log(response.data)
                    // this.tasks = response.data


                    // user.sendEmailVerification(actionCodeSettings);
                })
                .catch(error => {
                    console.log(error)
                    this.error = error.message || 'Somethign went wrong'
                    // this.errored = true
                })
                .finally(() => this.loading = false)

                console.debug(result);
                // if(result.status == 201){
                //     alert('Signup success');
                //     // localStorage.setItem("user-info", JSON.stringify(result.config.data))
                    
                //     router.push('/login')

                // }else{
                //     alert('failed');
                // }


            // }catch(error:any) {
            // //     this.error = err.message || 'Failed to authenticate. Check login data';
            //     console.log(error.message)
            // }


            // if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
            //     this.formIsValid = false
            // }

            // const actionPayload = {
            //     name: this.name,
            //     email: this.email,
            //     password: this.password,
            // };

            // try{
            //     // if(this.mode === 'login'){
            //     //     await this.$store.dispatch('login', actionPayload)
            //     // } else {
            //         await this.$store.dispatch('signup', {
            //             email: this.email,
            //             password: this.password,
            //         });
            //     // }
            //     const redirectUrl = '/' + (this.$route.query.redirect || 'coaches')
            //     this.$router.replace(redirectUrl)
            // } catch(err) {
            //     this.error = err.message || 'Failed to authenticate. Check login data';
            // }
        },
        logout() {
            this.authToken = '';
            localStorage.removeItem('authToken')
            
            this.accessToken = null
            this.isAuthenticated = false
            this.user = null
            router.push('/login')
            this.error = 'Logged Out'
          },

        hello(name){
            console.log(name)
            // return 'hello '+name;
        }
    },
    getters: {
        isLoggedIn: (state) => state.isAuthenticated,
        currentUser: (state) => state.user,
    },

})