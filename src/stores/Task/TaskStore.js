import { defineStore } from "pinia";
import axios from 'axios'


export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading : false
    }),
    actions: {
        async getTasks (){
            this.loading = true
            // const res = await fetch('http://localhost:3000/tasks')
            // const data = await res.json()

            const res = axios
            .get('http://localhost:3000/tasks')
            .then(response => {
                // console.log(response.data)
                this.tasks = response.data
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        },
        async addTask(task) {
            // console.log(task)
            this.tasks.push(task);

            // console.table(task);
            // url = 'http://localhost:3000/tasks';

            const result = await axios.post('http://localhost:3000/tasks', JSON.stringify(task), {
                headers: {
                    'content-type': 'application/json'
                }
            });
            // const res = await fetch('http://localhost:3000/tasks', {
            //     method: 'POST',
            //     headers: {'Content-Type': 'text/json'},
            //     body: JSON.stringify(task)
            // })

            // console.table(result);

            if(result.error){
                console.error(result.error)
            }
        },
        async deleteTask(id) {
            this.loading = true
            this.tasks = this.tasks.filter(t => {
                return t.id !== id
            })
            
            const res = await axios
                .delete('http://localhost:3000/tasks/'+ id)
                .then(response => {
                    // console.log(response.data)
                    // this.tasks = response.data
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)
        },
        async toggleFav(id) {
            const favTask = this.tasks.find(t => t.id === id)
            favTask.isFav =!favTask.isFav

            const res = axios
                .patch('http://localhost:3000/tasks/'+ id,{isFav: favTask.isFav})
                .then(response => {
                    // console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)

        },
        async addSubTask(id,newSubTask) {
            this.loading = true
            const subTask = this.tasks.find(t => t.id === id)
            subTask.list_items.push(newSubTask)
            const subTaskData = subTask.list_items

            const res = await axios
                .patch('http://localhost:3000/tasks/'+ id,{list_items:subTaskData})
                .then(response => {
                    console.log('response:'+JSON.stringify(response.data))
                    // this.tasks = response.data   
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)

                // if(res.error){
                //     console.error(res.error)
                // }
        },
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