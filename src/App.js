import React, { Component } from "react";
import logo from './logo.svg';
import './App.css';

class App extends Component {


  constructor(props) {
    super(props);
    this.state = { 
      demoApiResponse: "" ,
      dbApiResponse: ""
    };
  }

  callAPI() {
      fetch("http://localhost:9000/demo")
          .then(res => res.json())
          .then(res => this.setState({ demoApiResponse: res.message }));
      fetch('http://localhost:9000/users')
        .then(res => res.json())
        .then(res => this.setState({dbApiResponse: "Username: " + res.data[0].username + " Password: " + res.data[0].password + " Name: " + res.data[0].name + " Role: " + res.data[0].role}));
  }

  componentDidMount() {
      this.callAPI();
  }


  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <p>Some API examples by connecting to http://localhost:9000/ shown below:</p>
          <p>
            This is a demo of a basic connection onto the API : 
          </p>
          <p>{this.state.demoApiResponse}</p>
          <p>
            This is a demo of a basic GET request for the database users table without parameters: 
          </p>
          <p>{this.state.dbApiResponse} </p>
          <p>The express API is under api_promptcoded and examples of API calls from react are under the callAPI method of <code>src/App.js</code></p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
  
}

export default App;
