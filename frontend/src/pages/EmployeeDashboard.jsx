import { useEffect, useState } from "react";
import EmployeeTasks from "../components/EmployeeTasks";
import axios from "axios";
import TopSection from "../components/TopSection";

export default function EmployeeDashboard () {
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTask = async() => {
            try{
                const response = await axios.get("http://localhost:3000/api/v1/employee/tasks", {
                    headers: {
                      Authorization: localStorage.getItem("token")
                    }  
                  })
                  setTasks(response.data?.taskList || [])
              }catch(err){
                console.error(err)
              }
            }
           
        fetchTask()
    },[]) 
    return <div>
        <TopSection showSignOut={true} signOutNavigate={"/employee/signin"}/>
        <h2 className="font-bold text-xl m-5">Assigned Tasks: </h2>
        <EmployeeTasks tasks={tasks} />
    </div>
}