import { Routes,Route } from 'react-router-dom'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Home from '../features/taskmanager/pages/Home'
import AdminHome from '../features/taskmanager/pages/AdminHome.jsx'
import CreatePost from '../features/taskmanager/pages/CreatePost'
import Profile from '../features/taskmanager/pages/Profile'
import ProtectRoute from '../core/component/ProtectRoute'

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