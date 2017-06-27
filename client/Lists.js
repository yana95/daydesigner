import React, { Component } from 'react';

class Lists extends React.Component{
	constructor(props,context){
		super(props, context);
		this.state= {
			lists: props.lists
		};
		this.handleAddList = this.handleAddList.bind(this);
		this.handleKeyPress = this.handleKeyPress.bind(this);
	}
	addActiveClass(list){
		if(list.id == this.props.active){
			return "active";
		}
		return "";
	}
	handleAddList(e){
		if(e.key == "Enter"){
			var newList = {
				title: e.target.value
			}
            this.props.addList(newList);
            e.target.value = "";
        }  
	}

	handleOnBlur(e){
		e.target.value = "";
	}

	edit(e){
		var parent = e.target.parentElement.parentElement.parentElement;
		$(parent).find('p').hide();
		$(parent).find('input').show().val(this.title);
	}

	handleKeyPress(list,e){
		if(e.key == "Enter"){
			list.title = e.target.value;
            this.props.handleEditList(list);
            e.target.value = "";
            var parent = e.target.parentElement;
			$(parent).find('input').hide();
			$(parent).find('p').show();
        } 
	}
	

	render(){
		var lists = this.props.lists.map((list) => {
			var icon;
			switch(list.title){
				case 'Inbox': icon=<i className="fa fa-thumb-tack  inbox"  aria-hidden="true"></i>; break;
				case 'Starred': icon= <i className="fa fa-star-o star" aria-hidden="true" ></i>; break;
				case 'Today': icon=<i className="fa fa-calendar-check-o today" aria-hidden="true"></i>; break;	
				case 'Week': icon=<i className="fa fa-calendar week" aria-hidden="true"></i>;break;
				default : icon=<i className="fa fa-list-alt user-list" aria-hidden="true"></i>;break;
			}
			var active = this.addActiveClass(list);
			var editAction;
			if(list.edit){
				editAction = <div className="list__actions">
                    <button onClick={this.edit.bind(list)}><i className="fa fa-pencil" aria-hidden="true"></i></button>
                    <button onClick={this.props.deleteList.bind(null, list)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                </div>
			}
			return(
				<li key={list.id}  className={active} >
					{icon}
					<p onClick={this.props.selectList.bind(null, list)}>{list.title}</p>
					<input type="text" className="editList"  onKeyPress={this.handleKeyPress.bind(null,list)}/>
					{editAction}
				</li>
			);
		});

		return(
			<div className="Menu">
				<div className="logo">
					<h1>Daydesigner</h1>
				</div>
				<ul className="Lists">
					{lists}
				</ul>
				<div className = "add-list">
					<i className="fa fa-plus-square" aria-hidden="true"></i>
					<input
	                    type="text"
	                    placeholder="Add new list..."
	                    onKeyPress = {this.handleAddList}
	                    onBlur = {this.handleOnBlur}
                	/>
				</div>
			</div>
		)
		
	}
}

export default Lists;