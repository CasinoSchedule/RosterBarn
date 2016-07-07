import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';

require("assets/styles/sidePanel.scss");
require('font-awesome-webpack');
// var image = require("assets/images/ariawhite.png"); 


export default React.createClass({
	getInitialState: function(){
		return ({
			collapse: "",
			openClose: "fa fa-minus-circle fa-2x",
			flexbox_size: ""
		})
	},
	collapseSidePanel: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				collapse: ((this.state.collapse === "") ? "collapse" : ""),
				openClose: ((this.state.openClose === "fa fa-plus-circle fa-2x") ? "fa fa-minus-circle fa-2x" : "fa fa-plus-circle fa-2x"),
				flexbox_size: currentStore.calendarReducer.flexbox_size
			})
		}.bind(this))
		
		store.dispatch({
			type: 'ALTER_FLEXBOXSIZE',
			flexbox_size: ((this.state.flexbox_size === "") ? "changeFlexBoxSize" : "")
		})
	},
	render: function(){
		return (
			<div className={"sidePortal " + this.state.collapse}>

				{/* <div className="profile"></div>
				<div className="pic"></div> */}


				<div className="collapseButton">
					<i className={this.state.openClose} aria-hidden="true" onClick={this.collapseSidePanel}></i>
				</div>
				<div className="portalOptions">

				{/*	<div className="homeButton">
						<i className="fa fa-home fa-2x" aria-hidden="true" onClick={this.backToHome}></i> 
					</div> */}
				</div>
			</div>
		)
	}
})