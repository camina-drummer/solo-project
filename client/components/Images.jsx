import React, { Component } from 'react';

class Images extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let images = [<img className="charimage" src="https://i.imgur.com/ZVoBTJu.png"></img>];
    
    if (this.props.images.length) {
      images = [];
      this.props.images.forEach((obj, index) => {
        images.push(
          <img className="charimage" id={`image${index + 1}`} src={obj.url}></img>
        );
      })
    }

    console.log(images);

    return (
      <div className='flex-container'>
        {images}
      </div>
    );
  }
}

export default Images;