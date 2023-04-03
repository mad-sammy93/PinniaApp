<script>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/Task/TaskStore';


export default {
    setup () {
           
        const taskStore = useTaskStore();
        const newTask = ref('');
        const newSubTask = ref('')

        const handleSubmit = () => {
            if(newTask.value.length >0) {
                console.log(newTask.value);
                taskStore.addTask({
                    // id:Math.floor(Math.random() * 10000),
                    // id:null,
                    name:newTask.value,
                    // isFav:false,
                    list_items:[{
                        // id:null,
                        name:newSubTask.value
                    }]
                })
            }
            // console.log(taskStore)
            newTask.value = '';
        }
        return { handleSubmit, newTask , newSubTask}
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input 
            type="text"
            placeholder="Add title ..."
            v-model="newTask"
            >
            <input 
            type="text"
            placeholder="I need to..."
            v-model="newSubTask"
            >
            <button type="submit">Add</button>
    </form>
</template>

<style scoped>

form{
    max-width: 400px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;
}
form button {
    background: #ffd859;
    border: 0;
    padding: 10px;
    font-family: "Poppins";
    border-radius: 6px;
    cursor: pointer;
    font-size: 1em;
}
form input {
    border: 0;
    padding: 10px;
    border-radius: 6px;
    color:#444;
    font-size: 1em;
}
</style>