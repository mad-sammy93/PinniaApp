<script>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/auth/authStore';

export default{
    setup(){
        const authStore = useAuthStore();

        const name = ref('')
        const email = ref('')
        const password = ref('')
        // const formIsValid = ref(true)
        // const error = ref(null)
        // const respinseData = ref('')
        // const isLoading = ref(false)


        const submitSignupData = () => {
            console.log(name)
            // if(name.value.length >0 || password.value.length >0 || email.value.length >0){
                // console.log('submit signup')
                authStore.hello(name);
                // authStore.addTask({
                //     id:Math.floor(Math.random() * 10000),
                //     name:newTask.value,
                //     isFav:false,
                //     list_items:[]
                // })
            // }

        }

        return { 
                submitSignupData,
                name,
                email,
                password 
            }
    },
    // data() {
    //     return {
    //         name:'',
    //         email: '',
    //         password: '',
    //         formIsValid:true,
    //         // mode: 'login',
    //         // isLoading: false,
    //         error: null,
    //         responseData:''
    //     };
    // },
    mounted() {
        // authStore.hello(authStore);
        console.warn("mount")
        let user = localStorage.getItem('user-info')
        if(user) {
            this.$router.push({name:'home'})
        }
    }
}
</script>
<template>
    <div>
        <h3>Sign-Up</h3>
        <!-- <div class="loading" v-if="authStore.loading">
            Loading Tasks ...
        </div> -->
        <form @submit.prevent="submitSignupData">
            
            <div class="form-control">
                <input type="text" id="name" v-model="name" placeholder="Enter Name">
            </div>
            <div class="form-control">
                <input type="email" id="email" v-model="email" placeholder="Enter Email">
            </div>
            <div class="form-control">
                <input type="password" id="password" v-model="password" placeholder="Enter Password">
            </div>
            <div class="form-control submit__button">
                <button type="submit">Sign-Up</button>
                <router-link to="/login" ><button>Login</button></router-link>
            </div>
        </form>
    </div>
</template>



<style scoped>
.form-control{
    display: block;
    width: 100%;
}
input{
    width:100%;
    height: 40px;border: 1px solid white;
    font-size: 20px;
}
::placeholder{
    font-size: 20px;
}
.submit__button button{

    height: 40px;border: 1px solid white;
    width:100%;
}
.submit__button button:hover{

height: 40px;border: 1px solid white;
width:100%;
}

</style>