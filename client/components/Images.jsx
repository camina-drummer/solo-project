import React, { Component } from 'react';

class Images extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='flex-container'>
        <image src="./client/assets/placeholder.jpg"></image>
        <p>Images will be displayed here.</p>
      </div>
    );
  }
}

export default Images;