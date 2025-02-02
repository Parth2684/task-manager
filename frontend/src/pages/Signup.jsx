import { useState } from "react";
import InputBox from "../components/InputBox";
import PageHeading from "../components/PageHeading";
import Button from "../components/Button";
import axios from "axios";
import TopSection from "../components/TopSection";
import { useNavigate } from "react-router-dom";

export default function Signup () {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    return <div>
        <TopSection />
         <div className="flex flex-col h-screen justify-center items-center">
            <div className="border-2 p-10 rounded-2xl">
            <PageHeading title="Employee Signup" /> 
        <InputBox className="self-center" type="text" title="Name" placeholder="Enter Your Name Here" onChange={(e)=> setName(e.target.value)} />
        <InputBox className="self-center" type="text" title="Email" placeholder="Enter Your email Here" onChange={(e) => setEmail(e.target.value)} />
        <InputBox className="self-center" type="password" title="Password" placeholder="Enter Your Password Here" onChange={(e) => setPassword(e.target.value)} />
        <Button title="Sign Up" onClick={async () => {
            const response = await axios.post("http://localhost:3000/api/v1/employee/signup",{
                name,
                email,
                password
            })
            if(response.data.token) {
                localStorage.setItem("token", response.data.token)
                navigate("/employee/dashboard")
            }
                    else {alert(response.data.msg)}
        }} />
            </div>
        
    </div>
    </div>
}