<script>
import { useTaskStore } from '@/stores/Task/TaskStore';
import TaskItem from '@/components/Tasks/TaskItem.vue'

import TaskModal from '@/components/Tasks/TaskModal.vue'
// import TaskForm from '../components/TaskForm.vue';
import { reactive, ref } from 'vue';

    export default {
        props: ['task'],
        components: {
            TaskItem,
            TaskModal
        },
        setup() {

            const newSubTask = ref('')
            const taskStore = useTaskStore()
            const displayTaskModal = ref(false)
            const data = reactive('')

            // const handleSubTaskSubmit = () => {
            //     if(newSubTask.value.length >0) {
            //         // console.log(newSubTask.value);
            //         taskStore.addSubTask({
            //             id: task.id.value,
            //             list_items:[{
            //                 id:Math.floor(Math.random() * 10000),
            //                 name:newSubTask.value
            //             }]
            //         })
            //     }
            // // console.log(newSubTask.value)
            // newSubTask.value = '';
            // }
            const showTaskDetail = (task) =>{
                taskStore.loadTaskDetails(task.id)
                displayTaskModal.value = true
                // data = task
                console.log(data)
                // return displayTask
            }

            const closeTaskModal = () => {
                displayTaskModal.value = false
            }
           
            return {  
                newSubTask ,
                taskStore,
                displayTaskModal,
                closeTaskModal,
                showTaskDetail
                // handleSubTaskSubmit
            }
                

        }

    }
</script>

<template>
    <task-modal  :show="displayTaskModal"  @close="closeTaskModal" :data="task">
        <template v-slot:header :title="test">
            {{ task.name }}
        </template>
        <template v-slot:subTask>
            <div  class="ind-item" v-for="item in task.list_items">
                <TaskItem :item="item" :taskId="task.id"/>
            </div>
        </template>
        <template v-slot:actions>
            <div class="subtask_form">
                <form @submit.prevent="handleSubTaskSubmit">
                    <input 
                        type="text"
                        placeholder="add task..."
                        v-model="newSubTask"
                    >
                    <button 
                        type="submit" 
                        @click="{
                            taskStore.addSubTask(task.id,{
                                name:newSubTask
                            });
                            newSubTask = '';
                            taskStore.getTasks();
                        }" >
                        <span  class="material-icons" >add</span>
                    </button>
                </form>
                <!-- <span 
                    class="material-icons"
                    @click="{taskStore.addSubTask(task.id,{
                                    id:Math.floor(Math.random() * 10000),
                                    name:newSubTask
                                });
                newSubTask = '';}"
                >add</span> -->
            </div>
      </template>
    </task-modal>
    <div class="task_wrapper">
        <div class="task">
            <!-- <span>{{ task.id }}</span> -->
            <h3>{{ task.name }}</h3>
            <div class="icons">
                <span 
                    class="material-icons view"
                    @click="showTaskDetail(task)"
                >visibility</span>
                <span 
                    class="material-icons delete"
                    @click="taskStore.deleteTask(task.id)"
                >delete</span>
                <span 
                    class="material-icons fav"
                    :class= "{active: task.isFav}"
                    @click="taskStore.toggleFav(task.id)"
                >favorite</span>
            </div>
        </div>
        <div  class="ind-item" v-for="item in task.list_items">
            <TaskItem :item="item" :taskId="task.id"/>
        </div>
        
    </div>
</template>

<style scoped>
.task{
    max-width: 500px;
}

.subtask_form form{
    /* max-width: 400px; */
    margin: 0 auto;
    display: grid;
    grid-template-columns: 8fr 1fr;
    gap: 10px;
}

.subtask_form input{
    min-width: 100%;
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color: #444;
    font-size: 1em;
    outline: none;
    background: #f5f5f5;
}
.subtask_form button {
    /* text-align: right; */
    background: #ffd859;
    border: 0;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 14px;
    cursor: pointer;
    font-size: 1em;
    line-height: 0;

}
.subtask_form form{
    width: 100%;
}
</style>