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
      traits: {
        gender: ["male", "female", "trans male", "trans female", "non-binary", "gender neutral"],
        alignment: ["lawful good", "lawful neutral", "lawful evil", "neutral good", "true neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil"],
        race: ["dwarf", "elf", "gnome", "half-orc", "halfling", "human", "tiefling"],
        role: ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"],
        home: ["a big city", "a coastal village", "a rural town", "a cave", "the desert", "the forest", "the jungle", "the mountains"]
      },
      dbstories: [],
      dbimages: [],
      loggedIn: false,
      signupPage: false,
    };
    

    this.handleClickCGPT = this.handleClickCGPT.bind(this);
    this.handleClickSQL = this.handleClickSQL.bind(this);
    this.loginFn = this.loginFn.bind(this);
    this.signupPage = this.signupPage.bind(this);
    this.logoutFn = this.logoutFn.bind(this);
  }

  componentDidMount() {
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

  loginFn() {
    this.setState({ loggedIn: true });
  }

  logoutFn() {
    this.setState({ loggedIn: false });
  }

  signupPage() {
    this.setState({ signupPage: !this.state.signupPage });
  }

  render() {
    if (this.state.signupPage) {
      return (
        <div id="signupDiv">
          <Signup loginFn={this.loginFn} signupPage={this.signupPage} />
        </div>
      )
    }

    if (!this.state.loggedIn) {
      return (
        <div>
          <button onClick={this.loginFn} className="loginbtn" id="guestBtn" type="button">Guest Mode</button>
          <div id="loginDiv">
            <Login signupPage={this.signupPage} loginFn={this.loginFn} />
          </div>
        </div>
      )
    }

    return (
      <div>
        <button onClick={this.logoutFn} className="loginbtn" id="logoutBtn" type="button">Logout</button>
        <Images />       
        <Stories traits={this.state.traits} stories={this.state.stories} submitquery={this.handleClickCGPT} />
        <br></br>
        <br></br>
        <br></br>
        <Database dbstories={this.state.dbstories} dbimages={this.state.dbimages} submitquery={this.handleClickSQL}/>
      </div>
    );
  }
}

export default App;
