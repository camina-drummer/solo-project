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

  render() {
    return (
      <div className="flex-container">
        <form id="signupForm">
          <p className="formHeader">Signup</p>
          <label htmlFor="usernameField">Username: </label>
          <input type="text" class="usernameField" id="usernameSU" name="usernameField"></input>
          <label htmlFor="passwordField">Password: </label>
          <input type="text" class="passwordField" id="passwordSU" name="passwordField"></input>
          <div className="flex-container">
            <button className="loginbtn" type="button" onClick={this.props.signupFn}>Signup</button>
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