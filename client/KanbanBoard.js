import React, {Component} from 'react';
import List from './List';

class KanbanBoard extends Component {
    render() {
        return (
            <div className="app">
                <List id='todo' title="To Do" id="1" notes={this.props.notes.filter((note) => note.status === "todo")}/>
                <List id='in-progress' title="In Progress" id="2" cards={this.props.notes.filter((note) => note.status === "in-progress")}/>
                <List id='done' title='Done' id="3" cards={this.props.notes.filter((note) => note.status === "done")}/>
            </div>
        );
    }
}
export default KanbanBoard;