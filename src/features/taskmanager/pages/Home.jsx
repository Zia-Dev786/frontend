
// import React, { useEffect, useState } from "react";
// import Navbar from "../component/Navbar";
// import { toast } from "react-toastify";
// import { deletePost, getPost } from "../services/post_services";
// import { MdDelete } from "react-icons/md";
// import { MdEdit } from "react-icons/md";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const [posts, setPosts] = useState([]);
//   let navigate=useNavigate()

//  async function getData(){
//   try{
//     let response =await getPost()
//     console.log(response)
//     setPosts(response.post)

//   }catch(e){
//     toast(`error ${e}`)
//   }
//   }

//  async function deleteData(id){
//     try{
//       console.log(id)
//       let response=await deletePost(id)
//       console.log(response)
//       if(response.message=='success'){
//         toast(response.message)
//        getData()

//       }else{
//         toast(response.message)
//       }

//     }catch(e){
//       toast('error:'+e)
//     }

//   }
//   function updateData(data){
//     console.log(data)
// navigate('/createpost',{state:data})


//   }

//  useEffect(()=>{
//     getData()
//   },[])

//   return (
//    <>
//    <Navbar/>
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="mx-auto max-w-2xl">
//          {/* Post List */} 
//         <div className="mt-8">
//           <h2 className="mb-4 text-xl font-bold text-gray-800">
//             Posts
//           </h2>

//           {posts.length === 0 ? (
//             <div className="rounded-xl bg-white p-6 text-center text-gray-500 shadow">
//               No posts yet.
//             </div>
//           ) : (
//             <div className="flex flex-wrap ">
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
//         </div>

//       </div>
//     </div>
//    </>
//   );
// }

// export default Home;



import React, { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import { toast } from "react-toastify";
import { deletePost, getPost } from "../services/post_services";
import { MdDelete, MdEdit } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  async function getData() {
    try {
      const response = await getPost();
      setPosts(response.post || []);
    } catch (e) {
      toast.error(`Error: ${e.message || e}`);
    }
  }

  async function deleteData(id) {
    try {
      const response = await deletePost(id);

      if (response.message === "success") {
        toast.success("Post deleted successfully");
        getData();
      } else {
        toast.error(response.message);
      }
    } catch (e) {
      toast.error(`Error: ${e.message || e}`);
    }
  }

  function updateData(data) {
    navigate("/createpost", { state: data });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="mx-auto max-w-7xl px-6 py-14 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
              Discover Amazing Posts
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-indigo-100 sm:text-lg">
              Explore stories, ideas and experiences shared by our community.
            </p>

            <button
              onClick={() => navigate("/createpost")}
              className="mt-7 rounded-full bg-white px-6 py-3 font-semibold text-indigo-600 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >
              + Create New Post
            </button>
          </div>
        </section>

        {/* Posts Section */}
        <section className="mx-auto max-w-7xl px-5 py-10 sm:px-6">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Latest Posts
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                See what people are sharing
              </p>
            </div>

            <span className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600">
              {posts.length} {posts.length === 1 ? "Post" : "Posts"}
            </span>
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
                Be the first person to share something amazing!
              </p>

              <button
                onClick={() => navigate("/createpost")}
                className="mt-6 rounded-lg bg-indigo-600 px-5 py-2.5 font-medium text-white transition hover:bg-indigo-700"
              >
                Create Post
              </button>
            </div>
          ) : (
            /* Post Grid */
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id || post.id}
                  className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Author */}
                  <div className="flex items-center justify-between px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 font-bold text-white shadow-sm">
                        {post.userId?.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">
                          {post.userId?.name || "Unknown User"}
                        </h3>

                        <p className="text-xs text-slate-400">
                          Community member
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  {post.image ? (
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />
                    </div>
                  ) : (
                    <div className="flex h-48 items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100">
                      <span className="text-5xl">📝</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h2 className="line-clamp-2 text-xl font-bold text-slate-900 transition group-hover:text-indigo-600">
                      {post.title}
                    </h2>

                    <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-500">
                      {post.description}
                    </p>

                    {/* Actions */}
                    <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                      <button
                        onClick={() => updateData(post)}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
                      >
                        <MdEdit className="text-lg" />
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          deleteData(post._id || post.id)
                        }
                        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                      >
                        <MdDelete className="text-lg" />
                        Delete
                      </button>
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

export default Home;
