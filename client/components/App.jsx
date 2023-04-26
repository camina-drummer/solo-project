import React, { Component } from 'react';
import Stories from './Stories.jsx';
import Images from './Images.jsx';
import Database from './Database.jsx';


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
    };
    

    this.handleClickCGPT = this.handleClickCGPT.bind(this);
    this.handleClickSQL = this.handleClickSQL.bind(this);
  }

  componentDidMount() {
  }

  handleClickCGPT() {
    // fetch requests not being proxied correctly for non-root /api/* endpoints
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
    // fetch requests not being proxied correctly for non-root /api/* endpoints
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


  render() {

    return (
      <div>
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
