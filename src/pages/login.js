import "./style/appStyle.css";
import React, { useState } from "react";
import { useAuth } from "./hooks/AuthProvider";

const Login = () => {
    const [input, setInput] = useState({
        username: '',
        password: '',
    });

    const auth = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();

        if (input.username !== '' && input.password !== '') {
            auth.loginAction(input);
            return;
        }
        alert("please provide a valid input");
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    return (
        <div className="App">
            <h1>PromptCoded</h1>

            <form onSubmit={handleSubmit}>
                <div class="loginDiv">
                    <h2>User Authentication</h2>
                    <div className="input">
                        <input type="username" placeholder="Enter Username" name="username" onChange={handleInput} required></input>
                        <br></br>
                        <label for="uname">
                            <b>Username</b>
                        </label>
                    </div>
                    <div className="input">
                        <input type="password" placeholder="Enter Password" name="password" onChange={handleInput} required></input>
                        <br></br>
                        <label for="psw">
                            <b>Password</b>
                        </label>
                    </div>
                    <div className="submission">
                        <button type="submit">Login</button>
                    </div>

                    <span class="psw">
                        Don't have an account? Create one <a href="/Registration">here</a>.
                    </span>
                </div>
            </form>
        </div>
    );
}

export default Login;
