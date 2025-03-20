import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Admin from '../../Admin/Admin'
import AdminNavbar from '../../Admin/Components/AdminNavbar'

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/auth" element={<AdminNavbar />} />
        <Route path="/*" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default AdminRouter