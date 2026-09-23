// import React, { useEffect, useState } from 'react'
// import { createPost, updatePost } from '../services/post_services';
// import { toast } from 'react-toastify';
// import { useNavigate, useLocation } from 'react-router-dom';
// import Navbar from '../component/Navbar';

// function CreatePost() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [image, setImage] = useState("");
//   let navigate = useNavigate()
//   let data = useLocation()



//   const handleSubmit = async (e) => {

//     e.preventDefault();

//     console.log("Title:", title);
//     console.log("Description:", description);
//     console.log("Image:", image);
//     try {
//       // 
//       let data = { title, description, image }
//       console.log(data)
//       let response = await createPost(data)
//       console.log(response)
//       if (response.status = 'success') {
//         navigate('/')
//       } else {
//         toast(response.status)
//       }

//     } catch (e) {

//       toast(`error : ${e}`)
//     }



//     // Console


//     // Clear form


//   };

//   async function updateData1(e){
//       e.preventDefault();
//      try{
          
    
//           let response=await updatePost(data.state._id,{title,description,image})
//           console.log(response)
//           if(response.message=='success'){
            
//           //  navigate('/')
           
    
//           }else{
//             toast(response.message)
//           }
    
//         }catch(e){
//           toast('error:'+e)
//         }
//   }

//   useEffect(() => {
    

//     if (data.state != null) {
//       setTitle(data.state.title)
//       setDescription(data.state.description)
//       setImage(`${data.state.image}`)
//     }
//   }, [])




//   return (

//     <>
//     <Navbar/>
//     <div className="mx-auto max-w-2xl">
      

//       {/* Create Post */}
//       <form
        
//         className="rounded-xl bg-white p-6 shadow-md"
//       >
//         <h1 className="mb-5 text-2xl font-bold text-gray-800">
//          { data.state!=null? "update post": "Create Post"}
//         </h1>

//         <input
//           type="text"
//           placeholder="Title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
//           required
//         />

//         <textarea
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="mb-4 w-full rounded-lg border p-3 outline-none focus:border-blue-500"
//           rows="4"
//           required
//         />
//         <input
//           type="text"
//           value={image}
//           placeholder='Image URL'
//           onChange={(e) => setImage(e.target.value)}
//           className="mb-4 w-full rounded-lg border p-2"
//         />

//         {/* <input
//             type="file"
//             accept="image/*"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="mb-4 w-full rounded-lg border p-2"
//           /> */}
//  {data.state!=null?
//         <button
//           onClick={updateData1}
//           className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
//         >
//           Update
//         </button>:
//         <button
//          onClick={handleSubmit}

//           className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700"
//         >
//           Create
//         </button>}
//       </form>
//     </div></>
//   )
// }

// export default CreatePost





import React, { useEffect, useState } from "react";
import { createPost, updatePost } from "../services/post_services";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../component/Navbar";
import { MdImage, MdArrowBack } from "react-icons/md";

function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const isEditMode = location.state != null;

  // Load post data when editing
  useEffect(() => {
    if (location.state) {
      setTitle(location.state.title || "");
      setDescription(location.state.description || "");
      setImage(location.state.image || "");
    }
  }, [location.state]);

  // Create Post
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const postData = {
        title,
        description,
        image,
      };

      const response = await createPost(postData);

      if (response.status === "success") {
        toast.success("Post created successfully!");
        navigate("/");
      } else {
        toast.error(response.status || "Something went wrong");
      }
    } catch (e) {
      toast.error(`Error: ${e.message || e}`);
    }
  };

  // Update Post
  const updateData1 = async (e) => {
    e.preventDefault();

    try {
      const response = await updatePost(location.state._id, {
        title,
        description,
        image,
      });

      if (response.message === "success") {
        toast.success("Post updated successfully!");
        navigate("/");
      } else {
        toast.error(response.message || "Something went wrong");
      }
    } catch (e) {
      toast.error(`Error: ${e.message || e}`);
    }
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-slate-50">
        {/* Header */}
        <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
          <div className="mx-auto max-w-4xl px-6 py-12 text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {isEditMode ? "Update Your Post" : "Create a New Post"}
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-indigo-100">
              {isEditMode
                ? "Make changes to your post and share it with the community."
                : "Share your thoughts, stories and ideas with the community."}
            </p>
          </div>
        </section>

        {/* Form Container */}
        <section className="mx-auto max-w-3xl px-5 py-10">
          {/* Back Button */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mb-5 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-white hover:text-indigo-600"
          >
            <MdArrowBack className="text-lg" />
            Back to Posts
          </button>

          {/* Form Card */}
          <form
            onSubmit={isEditMode ? updateData1 : handleSubmit}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg"
          >
            {/* Form Header */}
            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                  <MdImage className="text-2xl" />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {isEditMode ? "Edit Post" : "Post Details"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    Fill in the information below
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6 px-6 py-7 sm:px-8">
              {/* Title */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Post Title
                </label>

                <input
                  type="text"
                  placeholder="Enter an interesting title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  placeholder="Write something about your post..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows="7"
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                  required
                />

                <p className="mt-2 text-right text-xs text-slate-400">
                  {description.length} characters
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL
                  <span className="ml-2 font-normal text-slate-400">
                    (Optional)
                  </span>
                </label>

                <input
                  type="text"
                  value={image}
                  placeholder="https://example.com/image.jpg"
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              {/* Image Preview */}
              {image && (
                <div>
                  <p className="mb-2 text-sm font-semibold text-slate-700">
                    Image Preview
                  </p>

                  <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                    <img
                      src={image}
                      alt="Preview"
                      className="h-64 w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end sm:px-8">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 font-semibold text-slate-600 transition hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-7 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg active:translate-y-0"
              >
                {isEditMode ? "Update Post" : "Publish Post"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default CreatePost;

