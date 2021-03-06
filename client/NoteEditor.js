import React from 'react';
import CheckList from './CheckList';
import Calendar from 'react-input-calendar';

class NoteEditor extends React.Component{

	constructor(props,context) {
        super(props, context);
        if(props.data){
            this.state = {
            title: props.data.title,
            text: props.data.text,
            tasks: props.data.tasks,
            status: props.data.status,
            starred: props.data.starred,
            id: props.data.id,
            listId: props.selectList,
            date: props.data.date
            }
        }
        else{
            this.state = {
        	title: '',
            text: '',
            tasks: [],
            status: 'todo',
            starred: false,
            listId : props.selectList,
            date: ''
            }
        }
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleNoteSubmit = this.handleNoteSubmit.bind(this);
        this.handleAddSubtask = this.handleAddSubtask.bind(this);
        this.handleStatusChange = this.handleStatusChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleStarred = this.handleStarred.bind(this);
    }

    handleTextChange(event) {
        this.setState({ text: event.target.value });
    }

    handleDateChange(props){
        this.setState({ date: props });
    }

    handleTitleChange(event) {
        this.setState({ title: event.target.value });
    }
    handleStatusChange(event){
        this.setState({ status: event.target.id}) ;
    }
    handleStarred(){
        this.setState({starred: !this.state.starred});
    }
    handleNoteSubmit() {
        const newNote = {
            title: this.state.title,
            text: this.state.text,
            tasks: this.state.tasks,
            status: this.state.status,
            starred: this.state.starred, 
            listId: this.state.listId,
            date: this.state.date
        };
        if(this.state.id){
            newNote.id = this.state.id;
        }
        this.props.onSubmit(newNote);
        
    }
    handleAddSubtask(e){
        if(e.key == "Enter"){
            var id;
            var tasks = this.state.tasks;
            if(tasks.length>0){
                id = tasks[tasks.length-1].id+1;
            }
            else{
                id = 1;
            }
            tasks.push({id: id, title: e.target.value, status:'todo'});
            this.setState({tasks: tasks});
             e.target.value = "";
        }   
    }
    handleDeleteSubtask(task){
        var removeId = task.id;
        var tasks = this.state.tasks;
        var index;
        for (var i=0; i< tasks.length; i++){
            if(tasks[i].id == removeId){
                index = i;
            }
        }
        tasks.splice(index,1);
        this.setState({tasks: tasks});
    }

    render() {
        console.log(this.state);
        var tasks = this.state.tasks;
        tasks = tasks.map((task)=>{
            return (
                <li key={task.id}>
                    <button onClick={this.handleDeleteSubtask.bind(this,task)}><i className="fa fa-times" aria-hidden="true"></i></button>
                    <p>{task.title}</p>
                </li>
            );
        });
        var todo = (this.state.status == "todo")? true : false;
        var progress = (this.state.status == "progress")? true : false;
        var done = (this.state.status == "done")? true : false;
        return (
            <div className="shadow">
                <div className="NoteEditor">
                    <div className="wrapper">
                    	<h2>Add new task</h2>                        
                        <label>Title</label>
                    	<input
                            type='text'
                            className='NoteEditor__title'
                            placeholder='Enter title'
                            value={this.state.title}
                            onChange={this.handleTitleChange}
                        />
                        <Calendar format='DD-MM-YYYY' date={this.state.date} onChange={this.handleDateChange}/>
                        <label>Description</label>
                        <textarea
                            placeholder='Enter note text'
                            rows={3}
                            className='NoteEditor__text'
                            value={this.state.text}
                            onChange={this.handleTextChange}
                        />
                        <label>Add subtask</label>
                        <input
                            placeholder='Enter title of subtask'
                            type="text"
                            onKeyPress = {this.handleAddSubtask}
                            className = "add-subtask"
                        />
                        <ul className="subtasks">{tasks}</ul>
                        <div>
                            <input 
                                type="checkbox"
                                name="starred"
                                id="starred"
                                onClick={this.handleStarred}
                                defaultChecked={this.state.starred}
                            />
                            <label htmlFor="starred"><i className="fa fa-star fa-2x" aria-hidden="true"></i><a>Add to Starred</a></label>
                            
                        </div>
                    </div>
                    <div className="NoteEditor__buttons">
                        <button
                            className='NoteEditor__button cancel'
                            onClick={this.props.onCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className='NoteEditor__button submit'
                            disabled={!this.state.title}
                            onClick={this.handleNoteSubmit}
                        >
                            Submit
                        </button>
                    </div>  
                </div>
            </div>
            )
    }
};

export default NoteEditor;
