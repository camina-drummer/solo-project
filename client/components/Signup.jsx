import React, { Component } from 'react';

class Signup extends Component {
  constructor(props) {
    super(props);
  }

  clearFields(event) {
    event.preventDefault();
    document.getElementById('usernameSU').value = "";
    document.getElementById('passwordSU').value = "";
  }

  

  signupReq(signUpPageToggle, loginPageToggle) {
    const username = document.getElementById('usernameSU').value;
    const password = document.getElementById('passwordSU').value;
    fetch('/signup', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
    .then((data) => data.json())
    .then((parsed) => {
      if (parsed.loggedIn) {
        window.alert("Signup successful!");
        signUpPageToggle(); 
        loginPageToggle(); 
      } else {
        window.alert(`Signup failed: ${parsed}`);
      }
    })
    .catch(err => console.log(err));
  }

  render() {
   
    return (
      <div className="flex-container">
        <form id="signupForm">
          <p className="formHeader">Signup</p>
          <label htmlFor="usernameField">Username: </label>
          <input type="text" className="usernameField" id="usernameSU" name="usernameField"></input>
          <label htmlFor="passwordField">Password: </label>
          <input type="text" className="passwordField" id="passwordSU" name="passwordField"></input>
          <div className="flex-container">
            <button className="loginbtn" type="button" onClick={() => this.signupReq(this.props.signupPage, this.props.loginFn)}>Signup</button>
            <button className="loginbtn" type="button" onClick={this.clearFields}>Clear</button>
          </div>
          <div className="flex-container linkContainer">
            <p className="linkTxt">Have an account?</p>
            <button type="button" className="linkBtn" onClick={this.props.signupPage}>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup;