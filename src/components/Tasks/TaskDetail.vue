<script>
import { useTaskStore } from '@/stores/Task/TaskStore';
import TaskItem from '@/components/Tasks/TaskItem.vue'
// import TaskForm from '../components/TaskForm.vue';
import { ref } from 'vue';

    export default {
        props: ['task'],
        components: {
            TaskItem,
        },
        setup() {

            const newSubTask = ref('')
            const taskStore = useTaskStore()

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
           
            return {  
                newSubTask ,
                taskStore,
                // handleSubTaskSubmit
            }
                

        }

    }
</script>

<template>
    <div class="task_wrapper">
        <div class="task">
            <span>{{ task.id }}</span>
            <h3>{{ task.name }}</h3>
            <div class="icons">
                <span 
                    class="material-icons"
                    @click="taskStore.deleteTask(task.id)"
                >delete</span>
                <!-- <span 
                    class="material-icons"
                    :class= "{active: task.isFav}"
                    @click="taskStore.toggleFav(task.id)"
                >favorite</span> -->
            </div>
        </div>
        <button @click="taskStore.loadTaskDetails(task.id)">Show details</button>
        <div  class="ind-item" v-for="item in task.list_items">
            <TaskItem :item="item" :taskId="task.id"/>
        </div>
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
                    // if(newSubTask.value.length >0) {
                        taskStore.addSubTask(task.id,{
                                // id:Math.floor(Math.random() * 10000),
                                name:newSubTask
                        });
                        newSubTask = '';
                        taskStore.getTasks();
                    // }
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