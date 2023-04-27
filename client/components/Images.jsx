import React, { Component } from 'react';

class Images extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let images = [<img className="charimage" src="https://www.publichealthontario.ca/-/media/Images/Profile-Images/2019/02/profile-blank-silhouette-female.png?h=242&iar=0&w=265&rev=5c6311147c59449380e7d40d2b0d9411&sc_lang=en&hash=7EBA9DC8D75C9D0DA1B3087A6DF699CB"></img>];
    if (this.props.images.length) {
      images = [];
      this.props.images.forEach((obj) => {
        images.push(
          <img className="charimage" src={obj.url}></img>
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