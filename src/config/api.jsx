import axios from 'axios'


const api=axios.create({
    baseURL:"https://backend-js-three.vercel.app/api",
    headers:{
        "Content-Type": "application/json",
    }
})

// interceptors  one time configure
api.interceptors.request.use(
(config)=>{
    let token =localStorage.getItem('token')
    if(token){
        config.headers.Authorization=`${token}`
    }
    return config
},
(error)=>{
    return Promise.reject(error)
}
)



export default api