<script>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../../stores/Task/TaskStore';
// import { useAuthStore } from '../../stores/auth/authStore';

import router from '../../router'

import TaskDetail from './TaskDetail.vue'
import TaskForm from './TaskForm.vue';

export default {
  components: {
    TaskDetail,
    TaskForm
  },
  setup() {
    const taskStore = useTaskStore();
    // const authStore = useAuthStore(); 

    // initialState

    //fetch tasks

    const filters = ref('all');
    const isModalVisible = ref(false);

    const showModal = () => {
      console.log('show_MODAL')
      isModalVisible.value = true;
    }
    const closeModal = () => {
      console.log('close_MODAL')
      isModalVisible.value = false;
    }
    onMounted(() => {
            // console.warn("mount")
            const loggedIn = localStorage.getItem('accessToken')

            // console.warn(loggedIn)
            if (!loggedIn) {
                router.push('/login')
            }else{

    taskStore.getTasks();
              // taskStore.getTasks();
            }
        }) 


    return {
      taskStore,
      isModalVisible,
      filters,
      showModal,
      closeModal
    };
  }
}
</script>

<template>
  <!-- new task form  -->
  <the-modal :show="isModalVisible" @close="closeModal">

    <template v-slot:header>
      Add New Task
    </template>

    <template v-slot:body>
      <div class="new-task-form">
        <TaskForm />
      </div>
    </template>

    <!-- <template v-slot:footer>
        This is a new modal footer.
      </template> -->
  </the-modal>
  <!-- filter -->
  <nav class="filter">
    <button type="button" class="btn active" @click="showModal">Add task</button>
    <!-- <button @click="filters = 'all'" :class="{ active: filters === 'all' }">All tasks</button>
    <button @click="filters = 'favs'" :class="{ active: filters === 'favs' }">Fav tasks</button> -->
  </nav>

  <div class="loading" v-if="taskStore.loading">
    Loading Tasks ...
  </div>

      <!-- task list  -->
      <div class="task-list" v-if="filters === 'all'">
        <p>You have {{ taskStore.totalCount }} tasks</p>
        <div class="list-item" v-for="task in taskStore.tasks">
          <TaskDetail :task="task"/>
        </div>

        <div class="empty" v-if="taskStore.totalCount < 1">
          <span>Its pretty lonely here</span>
          <img class="empty-state" src="@/assets/empty-state.webp" alt="">
        </div>
      </div>
      <div class="task-list" v-if="filters === 'favs'">
        <p>You have {{ taskStore.favCount }} Fav Tasks pending</p>
        <div class="list-item" v-for="task in taskStore.isFav">
          {{ task }}
          <TaskDetail :task="task"/>
        </div>
      </div>
</template>