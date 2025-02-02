import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function TopSection () {
const navigate = useNavigate()

    return <div className="flex flex-row min-w-[80%] max-w-screen bg-gray-300 text-blue-950 text-center p-1 ">
        <div className="self-center flex-grow text-center text-3xl ml-30">
            <div className="max-w-fit justify-self-center cursor-pointer" onClick={() => {
                navigate("/admin/dashboard")
            }}>
                Task Manager
            </div>
            
        </div>
        <div className="self-end justify-self-end mr-2">
            <Button title="Sign Out" onClick={() => {
                localStorage.removeItem("token")
                navigate("/admin/signin")
            }} />
        </div>
    </div>
}