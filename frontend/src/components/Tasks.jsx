
import axios from "axios";
import Button from "./Button";



export default function Tasks({tasks}) {
   

    return <div>
        <table className="table-auto min-w-[100%] border-collapse border-black rounded-b-lg my-5">
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
                        <td className="border p-1">
                            <Button title="Delete" onClick={async () => {
                                const response = await axios.delete("http://localhost:3000/api/v1/admin/deleteTask", {
                                    params: {
                                        taskId : task._id
                                    },
                                    headers: {
                                        Authorization: localStorage.getItem("token")
                                    }
                                })
                                alert(response.data.msg);
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