import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {

    const { isLoggedIn } = useSelector((state) => state.user)
    return isLoggedIn ? <Outlet /> : <Navigate to='/' />
}

export default ProtectedRoutes