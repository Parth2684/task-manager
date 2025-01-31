
import axios from "axios";
import Button from "./Button";



export default function Tasks({tasks}) {
   

    return <div>
        <table className="table-auto w-3xl border-collapse border-black ">
            <thead className="text-md border-1">
                <tr>
                    <th className="border">Title</th>
                    <th className="border">Description</th>
                    <th className="border">Assigned To</th>
                    <th className="border">Completed By</th> 
                    <th className="border">Delete task</th>  
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
                                {task.assignedToEmail && task.assignedToEmail.length > 0 ? (
                                    task.assignedToEmail.map((email, idx) => (
                                        <li key={idx}>{email}</li>
                                    ))
                                ): (
                                    <li>Not Assigned</li>
                                )}
                            </ul>
                        </td>
                        <td className="border">
                            <ul>
                                {task.completedEmails && task.completedEmails.length > 0 ?(
                                    task.completedEmails.map((email, idx) => (
                                        <li key={idx}>{email}</li>
                                    ))
                                ) : (
                                    <li>No completions</li>
                                )
                                }
                            </ul>
                        </td>
                        <td>
                            <Button title="Delete" onClick={async () => {
                                await axios.delete("http://localhost:3000/api/v1/admin/deleteTask", {
                                    params: {
                                        taskId : task._id
                                    },
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                })
                                onTaskDelete(task._id);
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