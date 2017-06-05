import React, {Component} from 'react';
import Card from './Card';

class Board extends Component {
    makeList(status, notes){
        var star =[];
        var nonStar = [];
        for(var i=0; i< notes.length; i++){
            if(notes[i].status == status ){
                if(notes[i].starred){
                    star.push(notes[i]);
                }
                else{
                    nonStar.push(notes[i]);
                }    
            }
        }
        return star.concat(nonStar);
    }

    readyForRender(arr){
        return arr.map((note) => {
                return <Card key={note.id}
                             id={note.id}
                             title={note.title}
                             text={note.text}
                             status={note.status}
                             tasks={note.tasks}
                             starred={note.starred}
                             onCheckNote = {this.props.onCheckNote.bind(null,note)} 
                             onDeleteNote = {this.props.onDeleteNote.bind(null,note)}
                             showBoard = {this.props.showBoard.bind(null,"edit",note)}
                             onSubtaskCheck = {this.props.onSubtaskCheck}
                             />
            });
    }
    showResolve(){
        $(".done").slideToggle( "slow" );
    }

    render() {
    	var cards = [];
        var done = [];
        
    	if(this.props.notes){
            var notes = this.props.notes;
            cards = this.makeList("todo", notes);
            done = this.makeList("done", notes);
            cards = this.readyForRender(cards);
            done = this.readyForRender(done);
        }
        var showResolve;
        if(done.length>0){
            showResolve = <div className="show-resolve">
                    <span onClick={this.showResolve}>Resolved tasks</span>
                </div>         
        }
        return (
            <div>
                <div className="list todo">
                    {cards}
                </div>
                {showResolve}
                <div className="list done ">
                    {done}
                </div>
            </div>

        );
    }
}
export default Board;