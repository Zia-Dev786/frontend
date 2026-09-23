
import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import { deletePost, getPost } from "../services/post_services";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function AdminHome() {
  const [posts, setPosts] = useState([]);
  let navigate=useNavigate()

 async function getData(){
  try{
    let response =await getPost()
    console.log(response)
    setPosts(response.post)

  }catch(e){
    toast(`error ${e}`)
  }
  }

 async function deleteData(id){
    try{
      console.log(id)
      let response=await deletePost(id)
      console.log(response)
      if(response.message=='success'){
        toast(response.message)
       getData()

      }else{
        toast(response.message)
      }

    }catch(e){
      toast('error:'+e)
    }

  }
  function updateData(data){
    console.log(data)
navigate('/createpost',{state:data})


  }

 useEffect(()=>{
    getData()
  },[])

  return (
   <>
   <Navbar/>
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-2xl">
         {/* Post List */} 
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold text-gray-800">
            Posts
          </h2>

          {posts.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
              No posts yet.
            </div>
          ) : (
            <div className="flex flex-wrap ">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="overflow-hidden m-2 w-[300px] rounded-xl bg-white shadow-md"
                >
                  <div className="m-2 flex justify-start">
                    <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 mx-2"></div>
                    <h1>{post.userId.name}</h1>
                  </div>
                  {post.image && (
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-60 w-full object-cover"
                    />
                  )}

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800">
                      {post.title}
                    </h3>

                    <p className="mt-2 text-gray-600">
                      {post.description}
                    </p>
                    <div className="flex justify-end">
                     <button onClick={()=>deleteData(post._id)}>
                       <MdDelete className="text-red-600 mx-4" />
                     </button>
                      <MdEdit className="text-green-600 mx-4" onClick={()=>updateData(post)}/>

                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
   </>
  );
}

export default AdminHome;

