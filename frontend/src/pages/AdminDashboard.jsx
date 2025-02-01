import { useEffect, useState } from "react";
import axios from "axios";
import Tasks from "../components/Tasks";
import TopSection from "../components/TopSection";
import EmployeeList from "../components/EmployeeList";
import CreateTask from "../components/CreateTask";

export default function AdminDashboard () {
    const [tasks, setTask] = useState([]);
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
        <TopSection />
        <div className="flex">
        <div className=" m-5 border border-b-black rounded-xl p-2 flex flex-col items-center max-w-xl self-start">
                <h2 className="font-bold text-xl">Create Task: </h2>
                <CreateTask />
            </div>
            <div className="m-3">
                <h2 className="font-bold text-xl">Employees: </h2>
                <EmployeeList />
            </div>
            </div>

            <div className="m-3" >
                <h2 className="font-bold text-xl">Tasks: </h2>
                <Tasks tasks={tasks} />
            </div>
            
            
        
            
        
        
        
    </div>
}
