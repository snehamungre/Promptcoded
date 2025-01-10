import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import PageLayout from "./pages/PageLayout";
import StudentHome from './pages/StudentHome';
import InstructorHome from "./pages/InstructorHome";
import Codesamples from "./pages/Codesamples";
import TicketManager from './pages/TicketManager';
import NoPage from "./pages/NoPage";
import Login from "./pages/login";
import Registration from "./pages/Registration"
import Privacy from './pages/PrivacyPolicy';

import AuthProvider from './pages/hooks/AuthProvider';
import PrivateRoute from './pages/router/PrivateRoute';
import InstructorRoute from './pages/router/InstructorRoute';
import StudentRoute from './pages/router/StudentRoute';


// TODO: Update homepage based on user.role and send username to StudentHome element
export default function App() {
  return (
    <div className='App'>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="Login" element={<Login />} />
            <Route path="Registration" element={<Registration />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<PageLayout />}>
                <Route element={<StudentRoute />}>
                  <Route index element={<StudentHome />} />
                  <Route path="Codesamples" element={<Codesamples />} />
                </Route>
                <Route element={<InstructorRoute />}>
                  <Route path="Instructor" element={<InstructorHome />} />
                  <Route path="Instructor/TicketManager" element={<TicketManager />} />
                </Route>
                <Route path="*" element={<NoPage />} />
              </Route>
            </Route>
            <Route path="Privacy" element={<Privacy />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>

  );
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
