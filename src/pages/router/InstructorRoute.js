import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";


const InstructorRoute = () => {
    const user = useAuth();
    if (user.userRole !== 'Instructor') return <Navigate to='/' />;
    return <Outlet />;
};

export default InstructorRoute;
