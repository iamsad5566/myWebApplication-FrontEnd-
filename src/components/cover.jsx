import React from 'react';
import Timer from './timer';

class Cover extends React.Component {
    state = {
        pictureList:[
            {id: 1, url:"1.jpeg"},
            {id: 2, url:"2.jpeg"},
            {id: 3, url:"3.jpeg"},
            {id: 4, url:"4.jpeg"},
            {id: 5, url:"5.jpeg"},
            {id: 6, url:"5.jpeg"},
        ],

        sentences:[
            "Our greatest glory is not in never failing, but in rising up every time we fail.",
            "I cannot remember the books I’ve read any more than the meals I have eaten; even so, they have made me.",
            "The only way to have a friend is to be one.",
            "Don’t be too timid and squeamish about your actions. All life is an experiment. The more experiments you make the better.",
            "Without a rich heart, wealth is an ugly beggar.",
            "Without a rich heart, wealth is an ugly beggar."
        ]
    }

    render() {
        const {pictureList, sentences} = this.state;
        return (
        <React.Fragment>
            <Timer pictureList = {pictureList} sentences = {sentences}/>
        </React.Fragment>);
    }
}

 
export default Cover;