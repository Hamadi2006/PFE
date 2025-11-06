import React from 'react'
import { useNavigate } from 'react-router-dom';
function PartnerDashboard() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("tokenCompanie");
        localStorage.removeItem("companie");
        navigate("/partner-login");
    }
  return (
    <>
      <h1>Partner Dashboard</h1>
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    </>
    
  )
}

export default PartnerDashboard