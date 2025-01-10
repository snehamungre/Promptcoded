import "./style/appStyle.css";
import React, { useState } from "react";
import { useAuth } from "./hooks/AuthProvider";

const Registration = () => {
    const [input, setInput] = useState({
        name: '',
        username: '',
        password: '',
        confirmPassword: '',
    });

    const handleInput = (event) => {
        const { name, value } = event.target;
        setInput((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const auth = useAuth();
    const handleSubmit = (event) => {
        event.preventDefault();

        if (input.name === '' || input.username === '' || input.password === '' || input.confirmPassword === '') {
            alert("please provide a valid input");
            return;
        }

        if (input.password === input.confirmPassword) {
            // add user to users table & redirect login user
            auth.registerAction(input);
        } else {
            alert("password mismatch - please check that password and password confirmation are the same");
        }
    };

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <div class="container">
                    <h2>Student Account Registration</h2>
                    <div className="input">
                        <input type="name" placeholder="Enter Full Name" name="name" onChange={handleInput} required></input>
                        <br></br>
                        <label for="name">
                            <b>Full Name</b>
                        </label>
                    </div>
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
                    <div className="input">
                        <input type="password" placeholder="Confirm Password" name="confirmPassword" onChange={handleInput} required></input>
                        <br></br>
                        <label for="psw-confirm">
                            <b>Confirm Password</b>
                        </label>
                    </div>
                    <div className="input">
                        <input type="checkbox" name="privacy" value="Consent" required />
                        <label for="privacy"> Check this box if you agree to our <a href="/Privacy" target="_blank">privacy policy</a>. *Required to create an account</label>
                    </div>
                    <div className="submission">
                        <button type="submit">Register</button>
                    </div>

                    <span class="psw">
                        Already have an account? <a href="/Login">Sign in</a>.
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Registration;
