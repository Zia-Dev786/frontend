import api from '../../../config/api'


export async function register(userdata){  
 let response=await api.post('/auth/register',userdata)
 return response.data
}


export async function login(userdata){
 let response= await api.post('/auth/login',userdata)
 return response.data
}

export async function logout(){
  localStorage.removeItem('token')
}

