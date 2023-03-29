<script>
// import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
import { ref } from 'vue';
// const { user } = storeToRefs( useAuthStore )

export default {
  setup() {
    const isModalVisible = ref(false)
    const authStore = useAuthStore();
    const userState = authStore.user
      console.log(userState)
    const handleLogout = () => {
      authStore.logout();
    }


    const showModal = () => {
      console.log('show_MODAL')
        isModalVisible.value = true;
      }
    const closeModal = () => {
      console.log('close_MODAL')
        isModalVisible.value = false;
      }
    return {
      // users,
      isModalVisible,
      authStore,
      userState,
      showModal,
      closeModal,
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
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Modal!
    </button>

    
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks{{ isModalVisible }}</h1>
      <button @click="authStore.refreshToken()" >refresh</button>
      <button @click="handleLogout" v-show="userState">Logout</button>
    </header>
    <RouterView />
  </main>
  
</template>
