<script>
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';

export default {
  setup() {

    const authStore = useAuthStore();


    const handleLogout = () => {
      authStore.logout();
    }


    return {
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
      <button @click="handleLogout" >Logout</button>
    </header>
    <RouterView />
  </main>
</template>
