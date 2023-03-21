import { defineStore } from "pinia";
import axios from 'axios'


export const useTaskStore = defineStore('taskStore', {
    state: () => ({
        tasks: [],
        loading : false,
        token: ''
    }),
    actions: {
        async getTasks (){
            this.loading = true
            // const res = await fetch('http://localhost:3000/tasks')
            // const data = await res.json()
            const token = localStorage.getItem('authToken');

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = axios
            .get('https://nextjs-dev.deploy.nl/List',config)
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
        async loadTaskDetails (taskId){
            this.loading = true
            // const res = await fetch('http://localhost:3000/tasks')
            // const data = await res.json()
            
            const token = localStorage.getItem('authToken');

            const config = {
                headers: { Authorization: `Bearer ${token}` }
            };

            const res = axios
            .get(`https://nextjs-dev.deploy.nl/List/${taskId}`,config)
            .then(response => {
                console.log(response.data);
               
                const subTask = this.tasks.find(t => t.id === taskId);
                subTask.list_items = response.data.list_items;         
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
        },
        async addTask(task) {
            // console.log(task)

            const token = localStorage.getItem('authToken');

            const config = {
                headers: { 'content-type': 'application/json',
                            Authorization: `Bearer ${token}` 
                        }
            };
            // console.table(task);
            // url = 'http://localhost:3000/tasks';

            const result = await axios
            .post('https://nextjs-dev.deploy.nl/List',task, config)
            .then(response => {
                console.log(response.data)

                const newTask = this.tasks.find(t => t.id === task.id);
                newTask = response.data;         

                // this.tasks.push(task);
                // this.tasks = this.tasks.filter(t => {
                //     return t.id !== id
                // })
                console.log(this.tasks) 
            })
            .catch(error => {
                console.log(error)
                this.errored = true
            })
            .finally(() => this.loading = false)
          
            console.table(result);

            if(result.error){
                console.error(result.error)
            }
        },
        async addSubTask(TaskId,newSubTask) {
            console.log(newSubTask);
            this.loading = true
            // const subTask = this.tasks.find(t => t.id === id)
            // subTask.list_items.push(newSubTask)
            // const subTaskData = subTask.list_items


            const token = localStorage.getItem('authToken');
            const config = {
                headers: { 'content-type': 'application/json',
                            Authorization: `Bearer ${token}` 
                        }
            };

            const res = await axios
                .post(`https://nextjs-dev.deploy.nl/List/${TaskId}/list-item`, newSubTask, config )
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
        async deleteTask(TaskId) {
            this.loading = true

            const token = localStorage.getItem('authToken');
            const config = {
                headers: { 'content-type': 'application/json',
                            Authorization: `Bearer ${token}` 
                        }
            };
            
            const res = await axios
                .delete('https://nextjs-dev.deploy.nl/List/'+ TaskId, config )
                .then(response => {
                    console.log(response.data)
                    // this.tasks = response.data
                    this.tasks = this.tasks.filter(t => {
                        return t.id !== TaskId
                    })
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
        },
        async toggleFav(id) {
            const favTask = this.tasks.find(t => t.id === id)
            favTask.isFav =!favTask.isFav

            const res = axios
                .post('http://localhost:3000/tasks/'+ id,{isFav: favTask.isFav})
                .then(response => {
                    // console.log(response.data)
                })
                .catch(error => {
                    console.log(error)
                    // this.errored = true
                })
                .finally(() => this.loading = false)

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