<script>
    import { useTaskStore } from '@/stores/Task/TaskStore';

    export default {
        props: ['item'],
        setup() {
            const taskStore = useTaskStore()

            return {taskStore}
        }
    }
</script>

<template>
    <div class="task-item">
        <!-- {{ item.id }} -->
        {{ item.name }}
    </div>
</template>


