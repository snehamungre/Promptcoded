import React from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../hooks/AuthProvider";


const StudentRoute = () => {
    const user = useAuth();
    if (user.userRole !== 'Student') return <Navigate to='/Instructor' />;
    return <Outlet />;
};

export default StudentRoute;