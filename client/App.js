import React, { Component } from 'react';
import {render} from 'react-dom';
import Board from './Board';
import NoteEditor from './NoteEditor';
import Lists from './Lists';

import NotesStore from './stores/NotesStore';
import NotesActions from './actions/NotesActions';
import ListsActions from './actions/ListsActions';
import {Router, Route, browserHistory, Link} from 'react-router';

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        notes: NotesStore.getNotes(),
        lists: NotesStore.getLists(),
        showAddBoard: false,
        showEditBoard: false
    };
}


class App extends React.Component {

    constructor(props, context) {
    	super(props, context);
    	this.state = getStateFromFlux();
        this.handleNoteEdit = this.handleNoteEdit.bind(this);
        this.handleSelectList = this.handleSelectList.bind(this);
  	}


    shouldComponentUpdate(nextProps, nextState){
        if(nextState.lists.length>0 && nextState.notes.length >0  ){
            if(!nextState.selectList ){
                nextState.selectList = nextState.lists[0].id;
            } 
            return true;
        }
        return false;
    }

    componentWillMount() {
        ListsActions.loadLists();
        NotesActions.loadNotes();
    }

    componentDidMount() {
        NotesStore.addChangeListener(this._onChange.bind(this));
    }

    componentWillUnmount() {
        NotesStore.removeChangeListener(this._onChange.bind(this));
    }

    _onChange() {
        this.setState(getStateFromFlux());
    }

	handleNoteAdd(noteData) {
       	NotesActions.createNote(noteData);
    }

    handleNoteCheck(note){
        NotesActions.checkNote(note.id);
    }
    handleNoteEdit(note){
        NotesActions.editNote(note.id, note);
        this.setState({editTask: null});
    }
    handleShowBoard(action,note){
        if(action=="add"){
            this.setState({showAddBoard: true});
        }
        if(action=="edit"){
            this.setState({editTask: note});
            this.setState({showEditBoard: true});
        }
    }
    handleHideBoard(action){
        if(action=="add"){
            this.setState({showAddBoard: false});
        }
        if(action=="edit"){
            this.setState({editTask: null});
            this.setState({showEditBoard: false});
        }
    }

    handleNoteDelete(note){
         NotesActions.deleteNote(note.id);
    }

    handleSelectList(list){
        this.setState({selectList: list.id});
    }
    findList(id){
        var list = this.state.lists.find((item) =>{
            if(id == item.id){
                return true;
            }
            return false;
        });
        return list;
    }
    notesFromList(){
        var listId = this.state.selectList;
        var notes;
        var list = this.findList(listId);
        if(list.title === "Starred"){
            notes = this.state.notes.filter((note) => {
                if(note.starred){
                    return true;
                }
                return false;
            });
        }
        else if(list.title === "Inbox"){

            notes = this.state.notes;
        }
        else{
            notes = this.state.notes.filter((note) => {
                if(note.listId === listId){
                    return true;
                }
                return false;
            });
        }
        return notes;
    }

    handleAddList(listData){
        ListsActions.createList(listData);
    }

	render(){
        var editBoard;
        if(this.state.showAddBoard){
            editBoard = <NoteEditor  selectList={this.state.selectList} onSubmit={this.handleNoteAdd} onCancel={this.handleHideBoard.bind(this,"add")}/>
        }
        if(this.state.showEditBoard && this.state.editTask){
            editBoard = <NoteEditor selectList={this.state.selectList} data={this.state.editTask} onSubmit={this.handleNoteEdit} onCancel={this.handleHideBoard.bind(this,"edit")}/>
        }
        var notes;
        var currentListTitle;
        var title;
        if(this.state.selectList){
            notes = this.notesFromList();
            title = this.findList(this.state.selectList).title;
        }
    	return (
            <div className="Application">
                <Lists lists={this.state.lists} selectList={this.handleSelectList} active={this.state.selectList} addList={this.handleAddList}/>
                <div className="Tasks">
                    {editBoard}
                    <div className="header">
                        <h2>{title}</h2>
                        <button className="add-task" onClick={this.handleShowBoard.bind(this,"add")}>+ Add task</button>
                    </div>
                    <Board  notes={notes}
                            onCheckNote = {this.handleNoteCheck}
                            onDeleteNote={this.handleNoteDelete} 
                            showBoard = {this.handleShowBoard.bind(this)}
                    />
                </div>
            </div>
    	);
	}
}

render(<App  />, document.getElementById('root'));
