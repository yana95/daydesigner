import React, { Component } from 'react';
import {render} from 'react-dom';
import Board from './Board';
import NoteEditor from './NoteEditor';
import Lists from './Lists';

import NotesStore from './stores/NotesStore';
import NotesActions from './actions/NotesActions';
import ListsActions from './actions/ListsActions';

function getStateFromFlux() {
    return {
        isLoading: NotesStore.isLoading(),
        lists: NotesStore.getLists(),
        notes: NotesStore.getNotes(),
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
        if(nextState.lists.length>0   ){
            if(!nextState.selectList ){
                nextState.selectList = nextState.lists[0].id;
            } 
            var isSelectListDelete = true;
            for(var i=0; i < nextState.lists.length; i++){
                if(nextState.selectList == nextState.lists[i].id){
                    isSelectListDelete = false;
                }
            }
            if(isSelectListDelete){
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

    handleSubtaskCheck(subtaskId){
        NotesActions.checkSubtask(this.props.id, subtaskId);
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
        switch(list.title){
            case "Starred": notes = this.state.notes.filter((note) => {
                            if(note.starred){
                                return true;
                            }
                             return false;
                        }); 
                        break;
            case "Inbox": notes = this.state.notes;
                        break;
            case "Today": var today = new Date();
                          today.setHours(0,0,0,0);
                          today = Date.parse(today);
                          notes = this.state.notes.filter((note) => {
                            var date = new Date(note.date);
                            date = Date.parse(date);
                            if(date === today){
                                
                                return true;
                            }
                             return false;
                        }); 
                        break;  
            case "Week": var today = new Date();
                         var dayOfWeek = today.getDay();
                         if(dayOfWeek == 0){
                            dayOfWeek = 7;
                         }
                         var weekStart = new Date(today);
                         weekStart.setDate(today.getDate() - dayOfWeek+1);
                         var weekEnd = new Date(today);
                         weekEnd.setDate(today.getDate() + 7 - dayOfWeek);
                         notes = this.state.notes.filter((note) => {
                            var date = new Date(note.date);
                            if(date.getDate()>=weekStart.getDate() && date.getDate()<=weekEnd.getDate()  ){
                                return true;
                            }
                             return false;
                        }); 
                         break;
            default: notes = this.state.notes.filter((note) => {
                        if(note.listId === listId){
                            return true;
                        }
                        return false;
                    });
                    break;
        }
        return notes;
    }

    handleAddList(listData){
        ListsActions.createList(listData);
    }

    handleDeleteList(listData){
        ListsActions.deleteList(listData);
        NotesActions.deleteNotes(listData);
    }

    handleEditList(listData){
        ListsActions.editList(listData);
    }


	render(){
        var editBoard;
        if(this.state.showAddBoard){
            editBoard = <NoteEditor  selectList={this.state.selectList}
                                    onSubmit={this.handleNoteAdd}
                                    onCancel={this.handleHideBoard.bind(this,"add")}/>
        }
        if(this.state.showEditBoard && this.state.editTask){
            editBoard = <NoteEditor selectList={this.state.selectList}
                                     data={this.state.editTask}
                                     onSubmit={this.handleNoteEdit}
                                     onCancel={this.handleHideBoard.bind(this,"edit")}/>
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
                <Lists lists={this.state.lists}
                        selectList={this.handleSelectList}
                        active={this.state.selectList}
                        deleteList={this.handleDeleteList}
                        editList={this.handleEditList}
                        handleEditList = {this.handleEditList}
                        addList={this.handleAddList}/>
                <div className="Tasks">
                    <div className="header">
                        <h2>{title}</h2>
                        <button className="add-task" onClick={this.handleShowBoard.bind(this,"add")}>
                            <i className="fa fa-plus-square" aria-hidden="true"></i> Add task
                        </button>
                    </div>
                    <Board  notes={notes}
                            onCheckNote = {this.handleNoteCheck}
                            onDeleteNote={this.handleNoteDelete} 
                            showBoard = {this.handleShowBoard.bind(this)}
                            onSubtaskCheck = {this.handleSubtaskCheck}
                    />
                </div>
                {editBoard}
            </div>
    	);
	}
}

render(<App  />, document.getElementById('root'));
