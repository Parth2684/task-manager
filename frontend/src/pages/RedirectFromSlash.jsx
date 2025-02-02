import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RedirectFromSlash () {
    const [isAdmin, setIsAdmin] = useState(null)
    const [isAutenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("token")
        try{
            if(token){
                const decodedToken = JSON.parse(atob(token.split(".")[1]));
                setIsAdmin(decodedToken.isAdmin);
                setIsAuthenticated(true)
            }    
        }catch(err){
            
            setIsAuthenticated(false)
        }
        
    },[]) 

    useEffect(() => {
        if(isAutenticated === false) {
            return navigate("/employee/signin")
        }
        if(isAdmin === false){
            return navigate("/employee/dashboard")
        }
        if(isAdmin === true){
            return navigate("/admin/dashboard")
        }
    },[isAdmin, isAutenticated, navigate])
    return null
}