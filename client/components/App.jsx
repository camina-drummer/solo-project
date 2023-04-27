import React, { Component } from 'react';
import Stories from './Stories.jsx';
import Database from './Database.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [ { message: { content: "What kind of character do you want a backstory for?" } } ],
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
    this.saveToDb = this.saveToDb.bind(this);
    this.loadFromDb = this.loadFromDb.bind(this);
    this.requestImage = this.requestImage.bind(this);
  }

  componentDidMount() {
    fetch('/checkloginstatus')
    .then(data => data.json())
    .then(parsed => this.setState(parsed))
    .then(() => {})
    .catch(err => console.log(err));
  }

  handleClickCGPT() {
    window.alert("Generating backstory...");
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
        window.alert("Backstory generated!");
      })
      .catch((err) => {
        window.alert("Error!");
        console.log(err);
      });
  }

  saveToDb() {
    // Post request sending current story in request body
    fetch('/api/save', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: document.getElementById('cgptresponsetext').innerText,
      })
    })
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed);
      window.alert("Saved to database!");
    })
    .catch((err) => {
      console.log(err);
      window.alert("Error saving to database!")
    })
  }

  loadFromDb() {
    fetch('/api/load')
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed);
      if (parsed.length && parsed[0].story) {
        window.alert("Loaded from database!");
        this.setState({ dbstories: parsed});
      } else {
        window.alert("No saved stories found in database.")
      }
    })
    .catch((err) => {
      console.log(error);
      window.alert("Error loading from database!")
    })
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
        const newdbstories = parsed.map((obj) => {
          return (
            { story: JSON.stringify(obj) }
          )
        });
        this.setState({
          dbstories: newdbstories
        });
        window.alert("Success!");
      })
      .catch((err) => {
        window.alert("Error!");
        console.log(err);
      });
  }

  // Probably don't need it
  loginFn() {
    this.setState({ loggedIn: true });
  }

  loginReq(event = null) {
    if (event.keyCode) {
      if (event.keyCode === 13) {
        event.preventDefault();
      } else {
        return;
      }
    }
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
      const stories = [ { message: { content: "What kind of character do you want a backstory for?" } } ];
      const dbstories = [];
      const newState = Object.assign(parsed, { stories, dbstories });
      this.setState(newState);
      window.alert("Logging you out.")
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

  requestImage() {
    window.alert("Generating image...");
    fetch('/api/image/load', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: document.getElementById('cgptresponsetext').innerText,
      })
    })
    .then((data) => data.json())
    .then((parsed) => {
      console.log(parsed);
      window.alert("Image generated!");
      this.setState({ images: parsed });
    })
    .catch((err) => {
      console.log(err);
      window.alert("Error generating image!")
    })
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
          <Stories images={this.state.images} requestimage={this.requestImage} savetodb={this.saveToDb} traits={this.state.traits} stories={this.state.stories} submitquery={this.handleClickCGPT} />
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <Database loadfromdb={this.loadFromDb} dbstories={this.state.dbstories} dbimages={this.state.dbimages} submitquery={this.handleClickSQL}/>
        </div>
      )
    }
  }
}

export default App;
