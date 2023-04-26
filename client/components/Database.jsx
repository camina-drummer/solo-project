import React, { Component } from 'react';

class Database extends Component {
  constructor(props) {
    super(props);
  }

  clearField() {
    document.getElementById('dbField').value = "";
  }

  onEnter(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.props.submitquery();
    }
  }

  render() {
    const stories = this.props.dbstories.map((el, index) => {
      return (
        <div>
          <div className="flex-container dbStoryTitle">{`Entry #${index + 1}`}</div>
          <div className="flex-container dbStoryText">{JSON.stringify(el)}</div>
        </div>
      )
    });

    return(
      <div>
        <form className="flex-container">
          <label htmlFor="dbField">Show me the saved entries for: </label>
          <input type="text" id="dbField" name="dbField" onKeyDown={(e) => this.onEnter(e)}/>
          <button type="button" className="form-button" id="test" onClick={() => this.props.submitquery()}>Submit Query</button>
          <button type="button" className="form-button" id="clearField" onClick={() => this.clearField()}>Clear</button>
        </form>
        <div className="flex-container"> 
          <div>
            {stories}
          </div>
          {/* {this.props.dbimages} */}
        </div>
      </div>
    );
  }
}

export default Database;