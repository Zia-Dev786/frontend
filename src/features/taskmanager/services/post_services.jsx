import api from "../../../config/api";

export async function createPost(data) {
let response= await api.post('/admin/post',data)
return response.data
}

export async function getPost(){
let response=await api.get('/admin/post')
return response.data
}  


export async function getUserPost(){
let response=await api.get('/user/user-post')
return response.data
}  


export async function updatePost(id, data ){
let response= await api.put(`/admin/post/${id}`,data)
return response.data
}

export async function deletePost(id){
let response= await api.delete(`/admin/post/${id}`)
return response.data
}