import React, { Component } from 'react';
import CheckList from './CheckList';

class Card extends Component {


    check(){
        if(this.props.status == "done"){
            return true;
        }
        return false;
    }

    shouldComponentUpdate (nextProps) {
	    return nextProps != this.props;
	}

    showDetails(e){
        var el = e.target.parentElement.getElementsByClassName("card__details")[0];
        $(el).slideToggle( "slow" );
    }

    render() {
        var starred;
        if(this.props.starred){
            starred = <img className="starred-card" src="./img/starred.png" />
        }
        var todo = this.check();
        return (
            <div className="card" >
                <input id={this.props.id} className="main-check" type="checkbox" onChange = {this.props.onCheckNote} checked={todo}/>
                <label htmlFor={this.props.id}><i className="fa fa-check" aria-hidden="true"></i></label>
                <div className="card__title" onClick={this.showDetails} >{this.props.title}</div>
                {starred}
                <div className="card__actions">
                    <button onClick={this.props.showBoard}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onClick={this.props.onDeleteNote}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
                <div className="card__details">
                    <p className="description">{this.props.text}</p>
                    <CheckList tasks={this.props.tasks} onCheck={this.props.onSubtaskCheck.bind(this)}/>
                </div>
            </div>
        );
    }
}
export default Card;