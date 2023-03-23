<script>
// import { storeToRefs } from 'pinia';
import { RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth/authStore';
import Modal from './components/UI/TheModal.vue'
import { ref } from 'vue';
// const { user } = storeToRefs( useAuthStore )

export default {
  components:{ 
    Modal 
  },
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
  
  <main>
    <button
      type="button"
      class="btn"
      @click="showModal"
    >
      Open Modal!
    </button>

  <Modal
    v-show="isModalVisible"
    @close="closeModal"
  >
    <template v-slot:header>
      This is a new modal header.
    </template>

    <template v-slot:body>
      This is a new modal body.
    </template>

    <template v-slot:footer>
      This is a new modal footer.
    </template>
  </Modal>
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks{{ isModalVisible }}</h1>
      <button @click="authStore.refreshToken()" >refresh</button>
      <button @click="handleLogout" v-show="userState">Logout</button>
    </header>
    <RouterView />
  </main>
  
</template>
