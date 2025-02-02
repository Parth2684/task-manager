import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function TopSection ({homeNavigate, signOutNavigate, showSignOut}) {
const navigate = useNavigate()

    return <div className="flex flex-row min-w-screen max-w-screen bg-gray-300 text-blue-950 text-center p-1 ">
        <div className="self-center flex-grow text-center text-3xl ml-30">
            <div className="max-w-fit justify-self-center cursor-pointer" onClick={() => {
                navigate(homeNavigate)
            }}>
                Task Manager
            </div>
            
        </div>
        {showSignOut && (
            <div className="self-end justify-self-end mr-2">
            <Button title="Sign Out" onClick={() => {
                localStorage.removeItem("token")
                navigate(signOutNavigate)
            }} />
        </div>
        )}
        
    </div>
}