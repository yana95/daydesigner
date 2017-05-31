import React, {Component} from 'react';
class CheckList extends Component {
    render() {
        let tasks = this.props.tasks.map((task) => {
            var status = (task.status == "done")? true : false;
            return (
                <li className="checklist__task" key={task.id}>
                    <input type="checkbox" onChange={this.props.onCheck.bind(null, task)} defaultChecked={status} />
                    <span>{task.title}</span>
                </li> );
        });
        return (
            <div className="checklist">
                <ul>{tasks}</ul>
            </div>
        );
    }
}
export default CheckList;