import React from 'react';
import { Link } from "react-router-dom";
import "./style/appStyle.css";
import { useAuth } from './hooks/AuthProvider';
import { Button, Typography } from 'antd';
import { HomeFilled, BookFilled, CodeFilled } from '@ant-design/icons';

const { Text } = Typography;
const NavBar = () => {
    const auth = useAuth();
    const isInstructor = auth.userRole === "Instructor";

    return (
        <nav className="navbar">
            <div className="nav-left">
                <Link to="/" style={{ display: "inline-block" }}>
                    <Button type='text' className='navButton' icon={<HomeFilled />}>Home</Button>
                </Link>
                <Link to="Instructor/TicketManager" style={{ display: "inline-block" }}>
                    {isInstructor ? <Button type='text' className='navButton' icon={<BookFilled />}>Ticket Manager</Button> : <></>}
                </Link>
                <Link to="/Codesamples" style={{ display: "inline-block" }}>
                    {!isInstructor ? <Button type='text' className='navButton' icon={<CodeFilled />}>Continue Questions</Button> : <></>}
                </Link>
            </div>
            <div className="nav-center">
                <h1>PromptCoded</h1>
            </div>
            <div className="nav-right">
                <Text type="secondary">{auth.userRole} - {auth.user}</Text>
                <Button type='text' className='navButton' onClick={() => auth.logOutAction()}>Sign Out</Button>
            </div>
        </nav>
    );
};

export default NavBar;