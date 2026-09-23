import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Login from '../features/auth/pages/login'
import Register from '../features/auth/pages/register'
import Home from '../features/taskmanager/pages/home'
import CreatePost from '../features/taskmanager/pages/CreatePost'
import ProtectRoute from '../core/component/ProtectRoute'
import AdminHome from '../features/taskmanager/pages/AdminHome'
import Profile from '../features/taskmanager/pages/Profile'

function Routing() {
  return (
    <Routes>
      <Route  path="/login"  element={<Login/>}/>
      <Route  path="/register"  element={<Register/>}/>
    {/* protected */}
     <Route element={<ProtectRoute/>}>
        <Route  path="/"  element={<Home/>}/>
        <Route  path="/adminhome"  element={<AdminHome/>}/>
        <Route  path="/createpost"  element={<CreatePost/>}/>
        <Route  path="/profile"  element={<Profile/>}/>
      </Route>
    </Routes>
  )
}

export default Routing