<script>
import { ref, onMounted } from 'vue';
import { useTaskStore } from '../../stores/Task/TaskStore';
// import { useAuthStore } from '../../stores/auth/authStore';

import router from '../../router'

import TaskDetail from '../Tasks/TaskDetail.vue'
import TaskForm from '../Tasks/TaskForm.vue';

export default {
    components: {
    TaskDetail,
    TaskForm
  },
  setup(){
    const taskStore = useTaskStore(); 
    // const authStore = useAuthStore(); 
    
    // initialState

    //fetch tasks
    taskStore.getTasks();

    const filters = ref('all');

    onMounted(() => {
            console.warn("mount")
            const loggedIn = localStorage.getItem('authToken')

            console.warn(loggedIn)
            if (!loggedIn) {
                router.push('/login')
            }else{
              // taskStore.getTasks();
            }
        }) 


    return {
      taskStore,
      filters
    };
  }
}
</script>

<template>
    <!-- new task form  -->
    <div class="new-task-form">
        <TaskForm/>
      </div>

      <!-- filter -->
      <!-- <nav class="filter">
        <button @click="filters = 'all'" :class="{active:filters === 'all'}">All tasks</button>
        <button @click="filters = 'favs'" :class="{active:filters === 'favs'}">Fav tasks</button>
      </nav> -->

      <div class="loading" v-if="taskStore.loading">
        Loading Tasks ...
      </div>

      <!-- task list  -->
      <div class="task-list" v-if="filters === 'all'">
        <p>You have {{ taskStore.totalCount }} tasks</p>
        <div class="list-item" v-for="task in taskStore.tasks">
          <TaskDetail :task="task"/>
        </div>
      </div>
      <!-- <div class="task-list" v-if="filters === 'favs'">
        <p>You have {{ taskStore.favCount }} Fav Tasks pending</p>
        <div class="list-item" v-for="task in taskStore.isFav">
          {{ task }}
          <TaskDetail :task="task"/>
        </div>
      </div> -->
</template>