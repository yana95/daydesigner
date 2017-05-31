import React, { Component } from 'react';

class Lists extends React.Component{
	constructor(props,context){
		super(props, context);
		this.state= {
			lists: props.lists
		};
		this.handleAddList = this.handleAddList.bind(this);
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

	render(){
		var lists = this.props.lists.map((list) => {
			var icon;
			switch(list.title){
				case 'Inbox': icon=<i className="fa fa-thumb-tack  inbox"  aria-hidden="true"></i>; break;
				case 'Starred': icon= <i className="fa fa-star-o star" aria-hidden="true" ></i>; break;
				default : icon=<i className="fa fa-list-alt user-list" aria-hidden="true"></i>;break;
			}
			var active = this.addActiveClass(list);
			return(
				<li key={list.id} onClick={this.props.selectList.bind(null, list)} className={active} >
					{icon}
					<p>{list.title}</p>
				</li>
			);
		});

		return(
			<div className="Menu">
				<div className="logo">
					<img  src="./img/logo2.png"/>
				</div>
				<ul className="Lists">
					{lists}
				</ul>
				<div className = "add-list">
					<input
	                    type="text"
	                    placeholder="Add new list..."
	                    onKeyPress = {this.handleAddList}
                	/>
				</div>
			</div>
		)
		
	}
}

export default Lists;