import axios from "axios";


let refresh = false;
const accessToken = localStorage.getItem('accessToken');

axios.defaults.baseURL =  '/api';
axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;


axios.interceptors.response.use(resp => resp, async error=> {
    if(error.response.status === 401 && !refresh){
        refresh = true
        const { status, data } = await axios
                                    .post('/auth/refresh',null,{
                                        withCredentials: true, 
                                    });
                                    console.log(data)

        if(status === 200 || status === 201){
            // alert('intercept');
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;

            localStorage.setItem('accessToken',data.accessToken);
            return axios(error.config)
        }
    }
    refresh = false;
    return error;
})



// axios.interceptors.request.use((config) => {
//             // Add the Authorization header with the access token if it exists

//             if (accessToken) {
//                 config.headers.Authorization = `Bearer ${accessToken}`;
//                 alert('intercept request');
//             }
//             return config;
//         },
//             (error) => {
//                 return Promise.reject(error);
//             }
// );