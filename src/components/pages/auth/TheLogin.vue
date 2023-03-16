<script>
import { ref,onMounted } from "vue";
import { useAuthStore } from "@/stores/auth/authStore";
import MainSection from "../../UI/MainSection.vue";
import router from '../../../router'

export default {
    setup() {
        const authStore = useAuthStore();
        // const name = ref("");
        const email = ref("");
        const password = ref("");
        // const formIsValid = ref(true)
        // const error = ref(null)
        // const respinseData = ref('')
        // const isLoading = ref(false)
        const submitLoginData = () => {
            //   console.log(email)
            if (password.value.length > 0 || email.value.length > 0) {
                authStore.login({
                    email: email.value,
                    password: password.value,
                });
            }
        };
        
        onMounted(() => {
            console.warn("mount")
            const loggedIn = localStorage.getItem('authToken')

            console.warn(loggedIn)
            if (loggedIn) {
                router.push('/')
            }
        }) 

        return {
            submitLoginData,
            email,
            password,
        }
    },
    components: { MainSection },
   
};
</script>

<template>
    <MainSection>
        <div class="form-wrapper">
            <h3>Login</h3>
            <form @submit.prevent="submitLoginData">
                <div class="form-control">
                    <input type="email" id="email" v-model="email" placeholder="Enter Email" />
                </div>
                <div class="form-control">
                    <input type="password" id="password" v-model="password" placeholder="Enter Password" />
                </div>
                <div class="form-control submit__button">
                    <button type="submit">Login</button>
                    <router-link class="link" to="/login">Or else Register</router-link>
                </div>
            </form>
        </div>
    </MainSection>
</template>

<style scoped>
::placeholder {
  font-size: 20px;
}
.form-wrapper {
  background-color: #ffd859;
  padding: 20px;
  margin-top: 20px;
  border-radius: 20px;
}
.form-control {
  display: flex;
  width: 100%;
}
form input {
  width: 100%;
  border: 0;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 6px;
  color: #444;
  font-size: 1em;
  outline: none;
  background: #f5f5f5;
}
form button {
  /* text-align: right; */
  background: #ffd859;
  border: 0;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 14px;
  cursor: pointer;
  font-size: 1em;
  margin-bottom: 10px;
  border: 1px solid white;
}
.link {
  background: #ffd859;
  border: 0;
  padding: 10px;
  font-family: "Poppins";
  border-radius: 14px;
  cursor: pointer;
  font-size: 1em;
  border: 1px solid white;
}
.submit__button button:hover {
  border: 1px solid white;
  background-color: #f7c82e;
  /* width: 100%; */
}
.submit__button.form-control {
  display: flex;
  text-align: center;
  align-items: stretch;
  flex-direction: column;
}
.submit__button.form-control button{
    margin-top: 30px;
    transition: 350ms color;
}

a {
  color: black;
  text-decoration: none;
  transition: 300ms color;
  border: 1px solid white;
}
a:hover {
  color: rgb(59, 59, 59);
}
</style>
