<script>
// import { storeToRefs } from 'pinia';
import { computed,watch } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
// const { user } = storeToRefs( useAuthStore )

export default {
  setup() {
    const authStore = useAuthStore();
    // const userState = authStore.user
      // console.log(userState)
    const handleLogout = () => {
      authStore.logout();
    }
    const isLoggedIn = computed(() => authStore.isAuthenticated);
    const currentUser = computed(() => authStore.currentUser);

    watch(isLoggedIn, (isLoggedIn) => {
      if (isLoggedIn) {
        console.log('User is logged in.');
      } else {
        console.log('User is logged out.');
      }
    });

    return {
      // users,
      authStore,
      isLoggedIn,
      currentUser,
      // userState,
      handleLogout
    }
  }
}

</script>

<template>
  <main>
    <dialog></dialog>
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks</h1>
      <button @click="authStore.refreshToken()" >refresh</button>
      <button class="logout__button" @click="handleLogout"  v-show="isLoggedIn">Logout</button>
    </header>
    <RouterView />
  </main>
</template>
