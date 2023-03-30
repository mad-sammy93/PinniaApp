<script>
// import { storeToRefs } from 'pinia';
import { computed,watch } from 'vue';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
import { ref } from 'vue';
// const { user } = storeToRefs( useAuthStore )

export default {
  setup() {
    
    const isModalVisible = ref(false)
    
    const authStore = useAuthStore();
    const handleLogout = () => {
      authStore.logout();
    }
    const refreshToken = () => {
      authStore.refreshToken();
    }
    const isLoggedIn = computed(() => authStore.isAuthenticated);
    // const currentUser = computed(() => authStore.user);

    watch(isLoggedIn, (isLoggedIn) => {
      if (isLoggedIn) {
        console.log('User is logged in.');
      } else {
        console.log('User is logged out.');
      }
    });

    return {
      // users,
      isModalVisible,
      authStore,
      isLoggedIn,
      // currentUser,
      // userState,
      refreshToken,
      handleLogout
    }
  }
}

</script>

<template>
  <the-modal
      :show="isModalVisible"
      @close="closeModal"
    >
    test

    <template v-slot:header>
      This is a new modal header.
    </template>

    <template v-slot:body>
      This is a new modal body.
    </template>

    <!-- <template v-slot:footer>
      This is a new modal footer.
    </template> -->
  </the-modal>
  <main>
    <!-- <pre></pre> -->
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks</h1>
      <!-- <button @click="authStore.hello('refresh')" >refresh</button>

      <button @click="authStore.startRefreshTokenTimer()" >refreshTimer</button> -->
      <!-- <base-button @click="authStore.getState()" >get info</base-button> -->
    </header>
    <status-bar v-if="isLoggedIn">Hello {{ authStore.user.name }}
      <base-button class="logout__button" @click="handleLogout" v-show="isLoggedIn">Logout</base-button>
    </status-bar>
    
    <RouterView />
  </main>
</template>
