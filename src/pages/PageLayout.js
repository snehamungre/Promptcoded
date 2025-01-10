import { Outlet, Link } from "react-router-dom";
import NavBar from './NavBar';

const PageLayout = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  )
};

export default PageLayout;