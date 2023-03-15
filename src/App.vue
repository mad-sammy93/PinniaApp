<script>
import { RouterView } from 'vue-router'

setup() {
  handleLogout(){

  }
}

</script>

<template>
  <main>
    <header>
      <img src="@/assets/logo.svg" alt="">
      <h1>Pinia Tasks</h1>
      <button @click="handleLogout">Logout</button>
    </header>

    <RouterView />
      
  </main>
</template>
