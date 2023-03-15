import { defineStore } from "pinia";
import axios from 'axios'


export const useAuthStore = defineStore('authStore', { 
    state: () => ({
        users: [
            // {
            //     "id": 1,
            //     "name": "Sam",
            //     "email": "sam@gmail.com",
            //     "password": "123456"
            //   }
        ],
        loading : false
    }),

    actions: {

        async signup(name,email,password) {
            // console.log(this.email+' '+ this.name +' '+ this.password)

                let result = await axios.post("https://nextjs-dev.deploy.nl/auth/register",{
                        name: name,
                        email: email,
                        password: password,
                    },
                )
                .then(response => {
                    console.log(response.data)
                    // this.tasks = response.data
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)

                console.debug(result);
                if(result.status == 201){
                    confirm('Signup success');
                    // localStorage.setItem("user-info", JSON.stringify(result.config.data))
                    this.$router.push({name:'login'})

                }else{
                    confirm('failed');
                }
            // }catch(error:any) {
            // //     this.error = err.message || 'Failed to authenticate. Check login data';
            //     console.log(error.message)
            // }


            if(this.email === '' || !this.email.includes('@') || this.password.length < 6){
                this.formIsValid = false
            }

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
        hello(name){
            return 'hello '+name;
        }
    },
    getters:{

    }

})