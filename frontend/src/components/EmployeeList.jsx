import { useEffect, useState } from "react";
import axios from "axios";

export default function EmployeeList () {
    const [employee, setEmployee] = useState([])
    useEffect(() => {
        const fetchEmployees = async() => {
            const response = await axios.get("http://localhost:3000/api/v1/admin/employees",{
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
            setEmployee(response.data.employeeList)
        }
        fetchEmployees()
    },[])
    return <div className="overflow-auto max-h-[250px] border border-black rounded-lg">
        <table className="table-auto min-w-lg min-h-full border border-collapse border-black rounded-lg text-center overflow-hidden">
            <thead className="text-md sticky top-0">
                <tr>
                    <th className="border">Name</th>
                    <th className="border">Email</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((employee, index) => (
                    <tr key={index}>
                        <td className="border">{employee.name}</td>
                        <td className="border">{employee.email}</td>
                    </tr>
                ))}
            </tbody>
            </table>
    </div>
}