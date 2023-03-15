<script>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth/authStore";
import MainSection from "../../UI/MainSection.vue";
import router from '../../../router'

export default {
  setup() {
    const authStore = useAuthStore();
    const name = ref("");
    const email = ref("");
    const password = ref("");
    // const formIsValid = ref(true)
    // const error = ref(null)
    // const respinseData = ref('')
    // const isLoading = ref(false)
    const submitSignupData = () => {
      // console.log(name)
      if (
        name.value.length > 0 ||
        password.value.length > 0 ||
        email.value.length > 0
      ) {
        authStore.signup({
          name: name.value,
          email: email.value,
          password: password.value,
        });
      }
    };
    return {
      submitSignupData,
      name,
      email,
      password,
    };
  },
  components: { MainSection },
  mounted() {
        console.warn("mount")
        let loggedIn = localStorage.getItem('authToken')
        if(loggedIn) {
                router.push('/')
        }
    }
};
</script>
<template>
  <MainSection>
    <div class="form-wrapper">
      <h3>Sign-Up</h3>
      <form @submit.prevent="submitSignupData">
        <div class="form-control">
          <input
            type="text"
            id="name"
            v-model="name"
            placeholder="Enter Name"
          />
        </div>
        <div class="form-control">
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter Email"
          />
        </div>
        <div class="form-control">
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter Password"
          />
        </div>
        <div class="form-control submit__button">
          <button type="submit">Sign-Up</button>
          <router-link class="link" to="/login">Or else Login</router-link>
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
  /* width: 100%; */
}
.submit__button.form-control{
    display: flex;
    text-align: center;
    align-items: stretch;
    flex-direction: column;
}
a{
    color: black;
    text-decoration: none;
    transition: 300ms color;
    border: 1px solid white;
}
a:hover{
    color: rgb(59, 59, 59);
}
</style>
