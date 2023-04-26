import React, { Component } from 'react';
import Stories from './Stories.jsx';
import Images from './Images.jsx';
import Database from './Database.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [ { message: { content: "Please submit a query." } } ],
      images: [],
      traits: {
        gender: ["male", "female", "trans male", "trans female", "non-binary", "gender neutral"],
        alignment: ["lawful good", "lawful neutral", "lawful evil", "neutral good", "true neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil"],
        race: ["dwarf", "elf", "gnome", "half-orc", "halfling", "human", "tiefling"],
        role: ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"],
        home: ["a big city", "a coastal village", "a rural town", "a cave", "the desert", "the forest", "the jungle", "the mountains"]
      },
      dbstories: [],
      dbimages: [],
      loggedIn: null,
      signupPage: false,
    };
  
    this.handleClickCGPT = this.handleClickCGPT.bind(this);
    this.handleClickSQL = this.handleClickSQL.bind(this);
    this.loginFn = this.loginFn.bind(this);
    this.signupPage = this.signupPage.bind(this);
    this.logoutFn = this.logoutFn.bind(this);
    this.loginReq = this.loginReq.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
  }

  componentDidMount() {
    fetch('/checkloginstatus')
    .then(data => data.json())
    .then(parsed => this.setState(parsed))
    .then(() => {})
    .catch(err => console.log(err));
  }

  handleClickCGPT() {
    fetch('/api/cgpt', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.getElementById('mainField').value
      })
    })
      .then((data) => data.json())
      .then((parsed) => {
        this.setState({ stories: parsed });
        console.log(this.state.stories);
        window.alert("Success!");
      })
      .catch((err) => {
        window.alert("Error!");
        console.log(err);
      });
  }

  handleClickSQL() {
    fetch('/api/sql', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: document.getElementById('dbField').value
      })
    })
      .then((data) => data.json())
      .then((parsed) => {
        this.setState({
          dbstories: parsed
        });
        window.alert("Success!");
      })
      .catch((err) => {
        window.alert("Error!");
        console.log(err);
      });
  }

  // Probably don't need
  loginFn() {
    this.setState({ loggedIn: true });
  }

  loginReq() {
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: document.getElementById('usernameLI').value,
        password: document.getElementById('passwordLI').value
      })
    })
    .then(data => data.json())
    .then(parsed => {
      if (Object.hasOwn(parsed, "loggedIn")) {
        window.alert("Login succesful!");
        this.setState(parsed);
      }
      else {
        window.alert("Error logging in!");
      }
    })
    .catch(err => console.log(err));
  }

  logoutFn() {
    fetch('/logout', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then(data => data.json())
    .then(parsed => {
      const stories = [ { message: { content: "Please submit a query." } } ];
      const dbstories = ["Please submit a query."];
      const newState = Object.assign(parsed, { stories, dbstories });
      this.setState(newState);
    })
    .catch(err => {
      console.log(err);
    });
  }

  guestLogin() {
    fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: "guest",
        password: "guest"
      })
    })
    .then(data => data.json())
    .then(parsed => {
      if (Object.hasOwn(parsed, "loggedIn")) {
        window.alert("Logging in as guest.")
        this.setState(parsed);
      }
      else {
        window.alert("Error logging in as guest.")
      };
    })
    .catch(err => console.log(err));
  }

  signupPage() {
    this.setState({ signupPage: !this.state.signupPage });
  }

  render() {
    if (this.state.signupPage === true) {
      return (
        <div id="signupDiv">
          <Signup loginFn={this.loginFn} signupPage={this.signupPage} />
        </div>
      )
    }

    if (this.state.loggedIn === false) {
      return (
        <div>
          <button onClick={this.guestLogin} className="loginbtn" id="guestBtn" type="button">Guest Mode</button>
          <div id="loginDiv">
            <Login signupPage={this.signupPage} loginReq={this.loginReq} />
          </div>
        </div>
      )
    }

    if (this.state.loggedIn === true) {  
      return (
        <div>
          <button onClick={this.logoutFn} className="loginbtn" id="logoutBtn" type="button">Logout</button>
          {/* <Images />     */}
          <Stories traits={this.state.traits} stories={this.state.stories} submitquery={this.handleClickCGPT} />
          <br></br>
          <br></br>
          <br></br>
          <Database dbstories={this.state.dbstories} dbimages={this.state.dbimages} submitquery={this.handleClickSQL}/>
        </div>
      )
    }
  }
}

export default App;
