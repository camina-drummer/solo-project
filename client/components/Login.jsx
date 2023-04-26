import React, { Component } from 'react';

class Login extends Component {
  constructor(props) {
    super(props);
  }

  clearFields(event) {
    event.preventDefault();
    document.getElementById('usernameLI').value = "";
    document.getElementById('passwordLI').value = "";
  }

  loginReq() {
    fetch('/login')
    .then(data => data.json())
    .then(parsed => {
      console.log(parsed);
    })
    .catch(err => console.log(err));
  }

  render() {
  
    return (
      <div className="flex-container">
        <form id="loginForm">
          <p className="formHeader">Login</p>
          <label htmlFor="usernameField">Username: </label>
          <input type="text" class="usernameField" id="usernameLI" name="usernameField"></input>
          <label htmlFor="passwordField">Password: </label>
          <input type="text" class="passwordField" id="passwordLI" name="passwordField"></input>
          <div className="flex-container">
            <button className="loginbtn" type="button" onClick={this.loginReq}>Login</button>
            <button className="loginbtn" type="button" onClick={this.clearFields}>Clear</button>
          </div>
          <div className="flex-container linkContainer">
            <p className="linkTxt">Don't have an account?</p>
            <button type="button" className="linkBtn" onClick={this.props.signupPage}>Signup</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login;