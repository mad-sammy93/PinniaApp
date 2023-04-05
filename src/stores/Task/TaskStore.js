import { defineStore } from "pinia";
import axios from 'axios'


export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading : false,
        // token: '',
        error : null
    }),
    actions: {
        async getTasks (){
            this.loading = true

            const res = axios
            .get('/List')
            .then(response => {
                // console.log(response.data)
                this.tasks = response.data
            })
            .catch(error => {
                console.log(error)
                this.error = error.message || 'Something went wrong'
            })
            .finally(() => this.loading = false)
        },

        //Main tasks
        async addTask(task) {
            // console.log(task)

            const result = await axios
            .post('/List',task)
            .then(response => {
                // console.log(response.data);
                this.tasks.push(response.data)
            })
            .catch(error => {
                console.log(error)
                this.error = error.message || 'Something went wrong'
            })
            .finally(() => this.loading = false)
        },
        async deleteTask(TaskId) {
            this.loading = true
            
            const res = await axios
                .delete('/List/'+ TaskId )
                .then(response => {
                    // console.log(response.data)
                    this.tasks = this.tasks.filter(t => {
                        return t.id !== TaskId
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.error = error.message || 'Something went wrong'
                })
                .finally(() => this.loading = false)
        },
        async loadTaskDetails (taskId){
            this.loading = true

            const res = axios
            .get(`/List/${taskId}`)
            .then(response => {
                // console.log(response.data);
               
                const subTask = this.tasks.find(t => t.id === taskId);
                subTask.list_items = response.data.list_items;         
            })
            .catch(error => {
                console.log(error)
                this.error = error.message || 'Something went wrong'
            })
            .finally(() => this.loading = false)
        },

        // Subtasks
        async addSubTask(TaskId,newSubTask) {
            this.loading = true

            const res = await axios
                .post(`/List/${TaskId}/list-item`, newSubTask )
                .then(response => {
                    console.log(response.data)

                    const subTask = this.tasks.find(t => t.id === TaskId)
                    subTask.list_items = response.data.list_items
                })
                .catch(error => {
                    console.log(error)
                    this.error = error || 'Something went wrong'
                })
                .finally(() => this.loading = false)
        },
        async deleteSubTask(subItem) {
            const taskId = subItem.item.listId
            const subTaskId = subItem.item.id

            this.loading = true
            
            const res = await axios
                .delete(`/List/${taskId}/list-item/${subTaskId}` )
                .then(response => {
                    // console.log(response.data)
                    const task = this.tasks.find((t) => t.id === taskId)
                    task.list_items = task.list_items.filter((item) => item.id !== subTaskId)
                   
                })
                .catch(error => {
                    console.log(error)
                    this.error = error.message || 'Something went wrong'
                })
                .finally(() => this.loading = false)
        },
        async toggleFav(id) {
            // const favTask = this.tasks.find(t => t.id === id)
            // favTask.isFav =!favTask.isFav

            // const res = axios
            //     .post('http://localhost:3000/tasks/'+ id,{isFav: favTask.isFav})
            //     .then(response => {
            //         // console.log(response.data)
            //     })
            //     .catch(error => {
            //         console.log(error)
            //         // this.errored = true
            //     })
            //     .finally(() => this.loading = false)


            console.log(id)
        }
    },
    getters: {
        isFav() {
            return this.tasks.filter(t =>t.isFav)
        },
        favCount() {
            return this.tasks.reduce((p,c)=>{
                return c.isFav? p+1 :p
            },0)
        },
        totalCount: (state) => {
            return state.tasks.length
        }
    },
    mutations: {
        
    }
})