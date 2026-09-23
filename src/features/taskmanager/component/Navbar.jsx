// import React from 'react'
// import { Link } from 'react-router-dom'
// import { useContext } from 'react'
// import { userContext } from '../../../core/hooks/user'
// import { useNavigate } from 'react-router-dom'

// function Navbar() {
//   let context=useContext(userContext)
//   let navigate=useNavigate()
//   console.log(context)

//   function Logout(){
//     localStorage.clear()
//     navigate('/login')

//   }
//   return (
//     <div className=' bg-gray-400 flex justify-around items-center h-[60px]'>
//         <div><Link to={'/'}>Navbar</Link></div> 
//         <div><Link to={'/createpost'}>Create post</Link></div>

//         <div className='flex items-center' onClick={()=>navigate('/profile')}>
//             <div className="w-[30px] h-[30px] rounded-full bg-yellow-300 mx-2"></div>
//           <div>
//             <h1>{context.user.name}</h1>
//           <h1>{context.user.email}</h1>
//           </div>
//         </div>

//           <button onClick={Logout}>logout</button>

//     </div>
//   )
// }

// export default Navbar



import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../../../core/hooks/user'

function Navbar() {
  const context = useContext(userContext)
  const navigate = useNavigate()

  function Logout() {
    localStorage.clear()
    navigate('/login')
  }

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition"
        >
          MyBlog
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-600 font-medium hover:text-indigo-600 transition"
          >
            Home
          </Link>

          <Link
            to="/createpost"
            className="text-gray-600 font-medium hover:text-indigo-600 transition"
          >
            Create Post
          </Link>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Profile */}
          <div
            onClick={() => navigate('/profile')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              {context?.user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </div>

            {/* User Info */}
            <div className="hidden sm:block">
              <h1 className="text-sm font-semibold text-gray-800 group-hover:text-indigo-600 transition">
                {context?.user?.name || 'User'}
              </h1>

              <p className="text-xs text-gray-500">
                {context?.user?.email || ''}
              </p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={Logout}
            className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 active:scale-95 transition duration-200"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  )
}

export default Navbar
