<script>
// import { storeToRefs } from 'pinia';
import { computed,watch } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
import { useTaskStore } from './stores/Task/TaskStore';
// const { user } = storeToRefs( useAuthStore )

export default {
  setup() {
    
    const taskStore = useTaskStore();
    const authStore = useAuthStore();
    // const userState = authStore.user
      // console.log(userState)
    const handleLogout = () => {
      authStore.logout();
    }
    const refreshToken = () => {
      authStore.refreshToken();
    }
    const isLoggedIn = computed(() => authStore.isAuthenticated);
    const currentUser = computed(() => authStore.user);

    watch(isLoggedIn, (isLoggedIn) => {
      if (isLoggedIn) {
        console.log('User is logged in.');
      } else {
        console.log('User is logged out.');
        // refreshToken();
        console.log('token refreshed');
      }
    });

    // watch(pinia.state, 
    //   (state) => {
    //     localStorage.setItem('state', JSON.stringify(state))
    //   }, 
    //   { deep: true }
    // )

    return {
      // users,
      taskStore,
      authStore,
      isLoggedIn,
      currentUser,
      // userState,
      refreshToken,
      handleLogout
    }
  }
}

</script>

<template>
  <main>
    <pre>{{authStore.error}}{{}}</pre>
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks{{ isLoggedIn }} </h1>
      <button @click="authStore.refreshToken()" >refresh</button>

      <button @click="authStore.startRefreshTokenTimer()" >refreshTimer</button>
      <button @click="authStore.getState()" >get info</button>
      <button class="logout__button" @click="handleLogout" v-show="isLoggedIn">Logout</button>
    </header>
    <RouterView />
  </main>
</template>
