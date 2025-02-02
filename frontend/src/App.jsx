import { useState } from 'react'
import './App.css'
import InputBox from './components/InputBox'
import PageHeading from './components/PageHeading'
import Tasks  from './components/Tasks'
import Signup from './pages/Signup'
import EmployeeSignin from './pages/EmployeeSignin'
import TopSection from './components/TopSection'
import AdminSignin from './pages/AdminSignin'
import AdminDashboard from './pages/AdminDashboard'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import EmployeeDashboard from './pages/EmployeeDashboard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/admin/signin' element={<AdminSignin />} />
        <Route path='/admin/dashboard' element={<AdminDashboard />} />
        <Route path='/employee/signup' element={<Signup />} />
        <Route path='/employee/signin' element={<EmployeeSignin />} />
        <Route path='/employee/dashboard' element={<EmployeeDashboard />} />
      </Routes>      
      </BrowserRouter>
    </>
  )
}

export default App
