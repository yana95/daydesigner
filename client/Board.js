import React, {Component} from 'react';
import Card from './Card';

class Board extends Component {
    render() {
    	var cards;
    	if(this.props.notes){
            cards = this.props.notes.map((note) => {
                return <Card key={note.id}
                			 id={note.id}
                             title={note.title}
                             text={note.text}
                             status={note.status}
                             tasks={note.tasks}
                             starred={note.starred}
                             onCheckNote = {this.props.onCheckNote.bind(null,note)} 
                             onDeleteNote = {this.props.onDeleteNote.bind(null,note)}
                             showBoard = {this.props.showBoard.bind(this,"edit",note)}
                             />
            });
        }
        else{

        }
        return (
            <div className="list">
                {cards}
            </div>
        );
    }
}
export default Board;