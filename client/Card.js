import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {

    handleCheckSubtask(e){
        //alert(e.target);
    }

    check(){
        if(this.props.status == "done"){
            return true;
        }
        return false;
    }

    shouldComponentUpdate (nextProps) {
	    return nextProps !== this.props;
	}

    render() {
        var starred;
        if(this.props.starred){
            starred = "starred";
        }
        var todo = this.check();

        return (
            <div className="card" >
                <input type="checkbox" onChange = {this.props.onCheckNote} checked={todo}/>
                <div className="card__title">{this.props.title}</div>
                <div className="card__actions">
                    <button onClick={this.props.showBoard}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onClick={this.props.onDeleteNote}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div className="card__details">
                    <CheckList tasks={this.props.tasks} onCheck={this.handleCheckSubtask.bind(this.props.tasks)}/>
                </div>
                {starred}
            </div>
        );
    }
}
export default Card;