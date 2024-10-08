import React from 'react'
import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom";

const DashboardRootLayout = () => {
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser)
  return (
    currentUser ? <Outlet/> : <Navigate to="/auth/sign-in"/>
  )
}

export default DashboardRootLayout