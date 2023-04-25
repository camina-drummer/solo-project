import React, { Component } from 'react';

class Stories extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        const stories = this.props.stories.map((el) => {
            return el.message.content;
          });

        function dropdownFn(e) {
            e.preventDefault();
            window.alert(e.target.innerText);
        }
            
        const dropdowns = [];
        let trait;

        for (const key in this.props.traits) {
            trait = [];
            this.props.traits[key].forEach((el) => {
                trait.push(
                    <button type="button" onClick={dropdownFn} className="dropdown-option">{el}</button>
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
                {dropdowns}
                <p>{stories}</p>
                <form>
                    <label htmlFor="mainField">CGPT Query:</label>
                    <input type="text" id="mainField" name="mainField"/>
                    <button type="button" id="test" onClick={() => this.props.submitQuery()}>Submit Query</button>
                </form>
            </div>
        );
    }
}

export default Stories;