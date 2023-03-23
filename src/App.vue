<script>
// import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
// const { user } = storeToRefs( useAuthStore )

export default {
  setup() {
    const authStore = useAuthStore();
    const userState = authStore.user
      console.log(userState)
    const handleLogout = () => {
      authStore.logout();
    }


    return {
      // users,
      authStore,
      userState,
      handleLogout
    }
  }
}

</script>

<template>
  <main>
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks</h1>
      <button @click="authStore.refreshToken()" >refresh</button>
      <button @click="handleLogout" >Logout</button>
    </header>
    <RouterView />
  </main>
</template>
