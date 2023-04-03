<script>
    import { useTaskStore } from '@/stores/Task/TaskStore';

    export default {
        props: ['item','taskId'],
        setup() {
            const taskStore = useTaskStore()

            return {taskStore}
        }
    }
</script>

<template>
    <div class="task-item sub-task">
        <!-- {{ taskId }}
        {{ item.id }} -->
        {{ item.name }}
        <span 
            class="material-icons"
            @click="taskStore.deleteSubTask({item})"
        >delete</span>
    </div>
</template>


<style scoped>
.sub-task{
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    margin: 10px 0;
    background-color: #ffd85941
}
</style>
