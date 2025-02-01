import { useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";
import axios from "axios";



export default function CreateTask() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [employee, setEmployee] = useState([])

    return <div>
            <InputBox title="Title" placeholder="Enter the title of the Task here" type="text" onChange={(e)=>{
                setTitle(e.target.value)
            }} />
            <InputBox title="Description" placeholder="Enter description of your task here" type="text" onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <InputBox title="Employees" placeholder="Emails of the Employee you want to assign your task" type="text" onChange={(e) => {
                setEmployee(e.target.value.split(",").map(email => email.trim()))
            }} />
            <Button title="Submit" onClick={async () => {
                const response = await axios.post("http://localhost:3000/api/v1/admin/createTask", {
                    title,
                    description,
                    assignedTo: employee
                },{
                    headers: {
                        Authorization: localStorage.getItem("token")
                    },
                })
                alert(response.data.msg)
            }} />
    </div>
}