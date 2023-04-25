import React, { Component } from 'react';
import Stories from './Stories.jsx';
import Images from './Images.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stories: [ { message: { content: "Please submit a query." } } ],
      traits: {
        gender: ["male", "female", "trans male", "trans female", "non-binary", "gender neutral"],
        alignment: ["lawful good", "lawful neutral", "lawful evil", "neutral good", "true neutral", "neutral evil", "chaotic good", "chaotic neutral", "chaotic evil"],
        race: ["dwarf", "elf", "gnome", "half-orc", "halfling", "human", "tiefling"],
        class: ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"],
        home: ["a big city", "a coastal village", "a rural town", "a cave", "the desert", "the forest", "the jungle", "the mountains"]
      }
    };
    

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
  }

  handleClick() {
    fetch('/api', {
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
        window.alert("Success!");
      })
      .catch((err) => window.alert(`Error! ${JSON.stringify(err)}`));
  }

  render() {

    return (
      <div>
        <p>Query Results</p>
        <Images />
        <Stories traits={this.state.traits} submitQuery={this.handleClick} stories={this.state.stories} />
      </div>
    );
  }
}

export default App;
