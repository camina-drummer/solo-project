import React, { Component } from 'react';

class Database extends Component {
  constructor(props) {
    super(props);
  }

  clearField() {
    document.getElementById('dbField').value = "";
}

  render() {
    return(
      <div>
        <form className="flex-container">
          <label htmlFor="dbField">Show me the saved entries for: </label>
          <input type="text" id="dbField" name="dbField"/>
          <button type="button" className="form-button" id="test" onClick={() => this.props.submitquery()}>Submit Query</button>
          <button type="button" className="form-button" id="clearField" onClick={() => this.clearField()}>Clear</button>
        </form>
        <div className="flex-container"> 
          {JSON.stringify(this.props.dbstories)}
          {/* {this.props.dbimages} */}
        </div>
      </div>
    );
  }
}

export default Database;