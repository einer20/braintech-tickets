import React, { useEffect, useState } from "react";
import User from "./models/User";


export default function useUser() {
    const [user, setUser] = useState<User>();
     

    useEffect(()=>{
        if(localStorage.getItem("user") != null) {
            setUser(JSON.parse(localStorage.getItem("user")!) as User);
        }
    },[]);

    return {
        user : user,
        setUser: (u : User)=>{
            localStorage.clear();
            localStorage.setItem("user", JSON.stringify(u));
            setUser(u);
        }
    }
}