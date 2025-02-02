
import axios from "axios";
import Button from "./Button";



export default function EmployeeTasks({tasks}) {
   

    return <div>
        <table className="table-auto min-w-[97%] max-w-screen border-collapse border-black rounded-b-lg my-5 mx-5">
            <thead className="text-md border-1">
                <tr>
                    <th className="border">Title</th>
                    <th className="border">Description</th>
                    <th className="border">Assigned By</th>
                    <th className="border">Completed By</th> 
                    <th className="border">Mark Completed</th>  
                </tr>
            </thead>
            <tbody className="text-base text-center border-1">
                {tasks && tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <tr key={index}>
                        <td className="border">{task.title}</td>
                        <td className="border">{task.description}</td>
                        <td className="border">
                            <ul>
                                {task.assignedFromEmail && task.assignedFromEmail.length > 0 ? (
                                    task.assignedFromEmail.map((email, idx) => (
                                        <li key={idx}>{email}</li>
                                    ))
                                ): (
                                    <li>No Tasks Assigned to You yet</li>
                                )}
                            </ul>
                        </td>
                        <td className="border">
                            <ul>
                                {task.completedByEmails && task.completedByEmails.length > 0 ?(
                                    task.completedByEmails.map((email, idx) => (
                                        <li key={idx}>{email}</li>
                                    ))
                                ) : (
                                    <li>No one has completed the tasks yet</li>
                                )
                                }
                            </ul>
                        </td>
                        <td className="border p-1">
                            <Button title="Completed" onClick={async () => {
                                const response = await axios.put("http://localhost:3000/api/v1/employee/completeTask", 
                                    {
                                        taskId : task._id
                                    },{
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                })
                                alert(response.data.msg)
                            }} />
                        </td>
                    </tr>
                )
            )):(
                <tr>
                    <td>
                        No Task Available
                    </td>
                </tr>
            )  }
            
            </tbody>
        </table>
    </div>
}