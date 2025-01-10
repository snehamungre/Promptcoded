import { Outlet, Link } from "react-router-dom";

const Home = () => {

    return (
    <>
    <h1>Welcome. Press "Code Sample" to begin.</h1>
    <li>
        <Link to="/Codesamples">Code Sample</Link>
    </li>
    </>
    );

};
  
  export default Home;