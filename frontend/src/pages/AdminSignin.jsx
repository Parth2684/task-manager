import { useState } from "react";
import PageHeading from "../components/PageHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import TopSection from "../components/TopSection";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export default function AdminSignin () {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    return <div>
        <TopSection /> 
        <div className="flex flex-col h-screen justify-center items-center">
            <div className="border-2 p-10 rounded-2xl">
            <PageHeading title="Admin Signin" />
            <InputBox className="self-center" type="text" title="Email" placeholder="Enter Your email Here" onChange={(e) => setEmail(e.target.value)} />
                <InputBox className="self-center" type="password" title="Password" placeholder="Enter Your Password Here" onChange={(e) => setPassword(e.target.value)} />
                <Button title="Submit" onClick={async () => {
                    const response = await axios.post("http://localhost:3000/api/v1/admin/signin",{
                        email,
                        password
                    })
                    localStorage.setItem("token", response.data.token)
                     navigate("/admin/dashboard")
                }} />
            </div>
       
        </div>
    </div>
}