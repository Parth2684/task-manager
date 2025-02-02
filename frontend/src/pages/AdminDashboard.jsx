import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "../components/Tasks";
import TopSection from "../components/TopSection";
import EmployeeList from "../components/EmployeeList";
import CreateTask from "../components/CreateTask";

export default function AdminDashboard () {
    const [task, setTask] = useState([]);
    useEffect(()=> {
        const fetchTask = async () => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/admin/tasks", {
                    headers: {
                        Authorization : localStorage.getItem("token")
                    } 
                })
                setTask(response.data?.taskList || [])
            }catch(err){
                console.error(err)
            }
        }
        fetchTask()
    },[])
    return <div>
        <TopSection homeNavigate="/admin/dashboard" signOutNavigate="/admin/signin" showSignOut={true} />
        <div className="flex justify-around">
        <div className=" my-10 border border-b-black rounded-xl p-2 flex flex-col items-center min-w-lg self-start">
                <h2 className="font-bold text-xl m-1">Create Task </h2>
                <CreateTask />
            </div>
            <div className="m-5">
                <h2 className="font-bold text-xl my-4">Employees: </h2>
                <EmployeeList />
            </div>
            </div>

            <div className="mx-10" >
                <h2 className="font-bold text-xl my-4">Tasks: </h2>
                <Tasks tasks={task} />
            </div>
            
            
        
            
        
        
        
    </div>
}
