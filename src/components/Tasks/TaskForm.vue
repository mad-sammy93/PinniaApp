<script>
import { ref } from 'vue';
import { useTaskStore } from '@/stores/Task/TaskStore';
import console from 'console';


export default {
    setup() {

        const taskStore = useTaskStore();
        const newTask = ref('');
        const newSubTask = ref('')
        //Validity
        // const formIsValid = ref(true)
        const taskTitleValidity = ref('pending')
        var subTaskValidity = ref('pendning')

        const handleSubmit = () => {
            if (newTask.value.length > 0 && newSubTask.value.length > 0 ) {
                // console.log(newTask.value);
                taskStore.addTask({
                    // id:Math.floor(Math.random() * 10000),
                    // id:null,
                    name: newTask.value,
                    // isFav:false,
                    list_items: [{
                        // id:null,
                        name: newSubTask.value
                    }]
                })
                newTask.value = '';
                newSubTask.value = '';
            }else{
                console.log('invalid');
            }
            // console.log(taskStore)
            
        }

        const validateInput = () => {
            if(newTask.value === ''){
                taskTitleValidity.value = 'invalid'
            }else{
                taskTitleValidity.value = 'valid'

            }
            if(newSubTask.value === ''){
                subTaskValidity.value = 'invalid'
            }else{
                subTaskValidity.value = 'valid'
            }

            // if(taskTitleValidity.value === 'valid' && subTaskValidity.value === 'valid'){
            //     formIsValid.value = true
            // }else{
            //     formIsValid.value = false
            // }

        }
        return { 
            handleSubmit,
            validateInput, 
            newTask, 
            newSubTask, 
            // formIsValid ,
            taskTitleValidity,
            subTaskValidity }
    }
}
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <div class="form-control" :class="{ invalid: taskTitleValidity === 'invalid'}">
            <input 
            type="text"
            placeholder="Add title ..."
            v-model.trim="newTask"
            @blur="validateInput"
            >
            <p class="invalid" v-if="taskTitleValidity === 'invalid'">Title is invlid</p>
        </div>
        <div class="form-control" :class="{ invalid: taskTitleValidity === 'invalid'}">
            <input 
            type="text"
            placeholder="I need to..."
            v-model.trim="newSubTask"
            >
            <p class="invalid" v-if="subTaskValidity === 'invalid'">Subtask Text is invlid</p>
        </div>
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