import authStore from './auth/authStore'
import taskStore from './Task/TaskStore'

const store = createStore({
    modules:{
        taskStore,        
        authStore
    },
});

export default store
