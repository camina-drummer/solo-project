import React, { Component } from 'react';
import Images from './Images.jsx';

class Stories extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
    }

    minMax(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
    }

    randomizeStory() {
        // gender alignment race class home
        const traits = this.props.traits;
        const gender = traits.gender[this.minMax(0, traits.gender.length - 1)]
        const alignment = traits.alignment[this.minMax(0, traits.alignment.length - 1)]
        const race = traits.race[this.minMax(0, traits.race.length - 1)]
        const role = traits.role[this.minMax(0, traits.role.length - 1)]
        const home = traits.home[this.minMax(0, traits.home.length - 1)]
        const randomStory = `${gender} ${alignment} ${race} ${role} who lives in ${home}.`
        document.getElementById('mainField').value = randomStory;
    }

    onEnter(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            this.props.submitquery();
        }
    }

    clearField() {
        document.getElementById('mainField').value = "";
    }
    
    render() {
        // Create stories string array from query response object
        const stories = this.props.stories.map((el) => {
            return (
                <div className="story-container flex-container"><p id="cgptresponsetext">{el.message.content}</p></div>
            );
          });

        const optionalbuttons = [];
        if (this.props.stories[0].message.content !== "What kind of character do you want a backstory for?")
        {
            optionalbuttons.push(<button type="button" className="form-button" id="saveStoryMain" onClick={() => this.props.savetodb()}>Save Story</button>);
            optionalbuttons.push(<button type="button" className="form-button" id="requestimagebutton" onClick={() => this.props.requestimage()}>Create Image</button>);
        }
       
        // Save image button
        // if (this.props.images.length) {
        //     if (this.props.images[0].url) {
        //         optionalbuttons.push(<button type="button" className="form-button" id="saveimagebutton" onClick={() => this.props.saveimage()}>Save Image</button>);
        //     }
        // } 
        

        // Create closure function for story selector
        function storySelector() {
            // Cache the various button inputs
            const cache = {
                gender: "",
                alignment: "",
                race : "",
                role : "",
                home : ""
            };
            // Define function with closure to update text field value
            function closure(event) {
                const trait = event.target.attributes.btnparent.value;
                const content = event.target.innerText;
                cache[trait] = content;
                const selectedStory = `${cache.gender} ${cache.alignment} ${cache.race} ${cache.role} who lives in ${cache.home}.`
                document.getElementById('mainField').value = selectedStory;
            }
            // Return function with closure
            return closure;
        }

        const dropdownFn = storySelector();
            
        const dropdowns = [];
        let trait;

        for (const key in this.props.traits) {
            trait = [];
            this.props.traits[key].forEach((el) => {
                trait.push(
                    <button type="button" btnparent={key} onClick={dropdownFn} className="dropdown-option">{el}</button>
                );
            })
            dropdowns.push(
                <div className="dropdown">
                    <button className="dropbtn">{key}</button>
                    <div className="dropdown-content">
                        {trait}
                    </div>
                </div>
            );
        }
          
        return (
            <div>
                <Images images={this.props.images} />
                <div className="flex-container">
                    {stories}
                </div>
                <div className="flex-container">
                    {optionalbuttons}
                </div>
                <form className="flex-container">
                    <label htmlFor="mainField">Make me a back story for a: </label>
                    <input type="text" id="mainField" name="mainField" onKeyDown={(e) => this.onEnter(e)}/>
                    <button type="button" className="form-button" id="submitMain" onClick={() => this.props.submitquery()}>Submit Query</button>
                    <button type="button" className="form-button" id="randomizeMain" onClick={() => this.randomizeStory()}>Randomize</button>
                    <button type="button" className="form-button" id="clearFieldMain" onClick={() => this.clearField()}>Clear</button>
                </form>
                <div className="flex-container">
                    {dropdowns}
                </div>
            </div>
        );
    }
}

export default Stories;