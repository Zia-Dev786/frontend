import { createContext, useState } from "react";

export let userContext=createContext()



export function UserProvider({children}){
    let [user,setUser]=useState((prev)=>{
        let data=localStorage.getItem('user')
        return data ? JSON.parse(data) : null;
    })

    return <userContext.Provider value={{user,setUser}}>
   {children}
    </userContext.Provider>
}