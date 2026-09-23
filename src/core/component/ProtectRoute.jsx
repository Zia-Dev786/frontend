import React, { useState } from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function ProtectRoute() {
   let [islogin,setIsLogin]=useState(()=>{
    let token=localStorage.getItem('token')
    if(token){
      return true
    }else{
      return false
    }
  })
  if(islogin){
    // route  access
    return <Outlet/>
  }else{
    return <Navigate to={'/login'}/>
  }

}
export default ProtectRoute