import React, { Component } from 'react';
import Card from './Card';

class List extends Component {
    render() {
        var cards;
        console.log(this.props);
        if(this.props.notes){
            cards = this.props.notes.map((note) => {
                return <Card id={note.id}
                             title={note.title}
                             text={note.text}
                             tasks={note.tasks} />
            });
        }
        else{

        }
        return (
            <div className="list" key={this.props.id}>
                <h1>{this.props.title}</h1>
                {cards}
            </div>
        );
    }
}
export default List;