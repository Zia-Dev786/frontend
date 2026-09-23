// import React, { useEffect, useState } from 'react'
// import { useContext } from 'react'
// import { userContext } from '../../../core/hooks/user'
// import Navbar from '../component/Navbar'
// import { getUserPost } from '../services/post_services'


// function Profile() {
//      let context=useContext(userContext)

//       const [posts, setPosts] = useState([]);
   
     
//       async function getData(){
//        try{
//          let response =await getUserPost()
//          console.log(response)
//          setPosts(response.post)
     
//        }catch(e){
//          toast(`error ${e}`)
//        }
//        }


//        useEffect(()=>{
//         getData()
//        },[])
//   return (
//    <div>
//     <Navbar/>
//      <div className='flex justify-center items-center'>
           
//           <div>
//             <h1> name    :{context.user.name}</h1>
//           <h1> email  :  {context.user.email}</h1>
//           </div>
//         </div>

//          {posts.length === 0 ? (
//             <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
//               No posts yet.
//             </div>
//           ) : (
//             <div className="flex flex-wrap justify-center ">
//               {posts.map((post) => (
//                 <div
//                   key={post.id}
//                   className="overflow-hidden m-2 w-[300px] rounded-xl bg-white shadow-md"
//                 >
//                   <div className="m-2 flex justify-start">
//                     <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 mx-2"></div>
//                     <h1>{post.userId.name}</h1>
//                   </div>
//                   {post.image && (
//                     <img
//                       src={post.image}
//                       alt={post.title}
//                       className="h-60 w-full object-cover"
//                     />
//                   )}

//                   <div className="p-5">
//                     <h3 className="text-xl font-bold text-gray-800">
//                       {post.title}
//                     </h3>

//                     <p className="mt-2 text-gray-600">
//                       {post.description}
//                     </p>
//                     <div className="flex justify-end">
//                      {/* <button onClick={()=>deleteData(post._id)}>
//                        <MdDelete className="text-red-600 mx-4" />
//                      </button>
//                       <MdEdit className="text-green-600 mx-4" onClick={()=>updateData(post)}/> */}

//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}


//    </div>
//   )
// }

// export default Profile


import  { useContext, useEffect, useState } from "react";
import { userContext } from "../../../core/hooks/user";
import Navbar from "../component/Navbar";
import { getUserPost } from "../services/post_services";
import { toast } from "react-toastify";
import { MdEmail, MdArticle } from "react-icons/md";

function Profile() {
  const context = useContext(userContext);

  const [posts, setPosts] = useState([]);

  async function getData() {
    try {
      const response = await getUserPost();
      console.log(response);

      setPosts(response.post || []);
    } catch (e) {
      toast.error(`Error: ${e.message || e}`);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const userName = context?.user?.name || "User";
  const userEmail = context?.user?.email || "";
  const firstLetter = userName.charAt(0).toUpperCase();

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Profile Header */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="mx-auto max-w-5xl px-5 pb-20 pt-12">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left">
              
              {/* Avatar */}
              <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-4 border-white bg-gradient-to-br from-indigo-400 to-purple-700 text-5xl font-bold text-white shadow-xl">
                {firstLetter}
              </div>

              {/* User Information */}
              <div className="mt-5 sm:ml-6 sm:mt-0">
                <h1 className="text-3xl font-extrabold text-white">
                  {userName}
                </h1>

                <div className="mt-2 flex items-center justify-center gap-2 text-indigo-100 sm:justify-start">
                  <MdEmail />
                  <span className="text-sm">{userEmail}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Profile Stats Card */}
        <section className="mx-auto -mt-12 max-w-5xl px-5">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-lg sm:p-6">
            <div className="grid grid-cols-2 divide-x divide-slate-200">
              
              {/* Posts */}
              <div className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 text-indigo-600">
                  <MdArticle className="text-xl" />
                  <span className="text-2xl font-bold">
                    {posts.length}
                  </span>
                </div>

                <p className="mt-1 text-sm text-slate-500">
                  {posts.length === 1 ? "Post" : "Posts"}
                </p>
              </div>

              {/* Account */}
              <div className="flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-purple-600">
                  Active
                </span>

                <p className="mt-1 text-sm text-slate-500">
                  Account Status
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="mx-auto max-w-5xl px-5 py-10">
          <div className="mb-7">
            <h2 className="text-2xl font-bold text-slate-900">
              My Posts
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Posts shared by {userName}
            </p>
          </div>

          {/* Empty State */}
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
                📝
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-800">
                No posts yet
              </h3>

              <p className="mt-2 text-slate-500">
                You haven't created any posts yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id || post.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Post Image */}
                  {post.image ? (
                    <div className="overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                  ) : (
                    <div className="flex h-56 items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}

                  {/* Post Content */}
                  <div className="p-5">
                    <h3 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-indigo-600">
                      {post.title}
                    </h3>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {post.description}
                    </p>

                    {/* Post Footer */}
                    <div className="mt-5 flex items-center border-t border-slate-100 pt-4">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-sm font-bold text-white">
                        {firstLetter}
                      </div>

                      <div className="ml-3">
                        <p className="text-sm font-semibold text-slate-800">
                          {userName}
                        </p>

                        <p className="text-xs text-slate-400">
                          Your post
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Profile;
