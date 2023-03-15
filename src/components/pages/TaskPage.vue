<script>
import { ref } from 'vue';


import TaskDetail from '../Tasks/TaskDetail.vue'
import TaskForm from '../Tasks/TaskForm.vue';
import { useTaskStore } from '../../stores/Task/TaskStore';

export default {
    components: {
    TaskDetail,
    TaskForm
  },
  setup(){
    const taskStore = useTaskStore(); 

    //fetch tasks
    taskStore.getTasks();

    const filters = ref('all');

    return {taskStore, filters};
  }
}
</script>

<template>
    <!-- new task form  -->
    <div class="new-task-form">
        <TaskForm/>
      </div>

      <!-- filter -->
      <nav class="filter">
        <button @click="filters = 'all'" :class="{active:filters === 'all'}">All tasks</button>
        <button @click="filters = 'favs'" :class="{active:filters === 'favs'}">Fav tasks</button>
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
      </div>
      <div class="task-list" v-if="filters === 'favs'">
        <p>You have {{ taskStore.favCount }} Fav Tasks pending</p>
        <div class="list-item" v-for="task in taskStore.isFav">
          <TaskDetail :task="task"/>
        </div>
      </div>
</template>