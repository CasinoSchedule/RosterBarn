import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';
import { calendar } from 'api/data';

require("assets/styles/sidePanel.scss");
require('font-awesome-webpack');
var $ = require('jquery');
// var image = require("assets/images/ariawhite.png"); 

var month = new Date().getMonth(), 
	year = new Date().getFullYear(), 
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] 


export default React.createClass({
	getInitialState: function(){
		return ({
			collapse: "",
			openClose: "fa fa-minus-circle fa-2x",
			flexbox_size: "",
			collection: [],
			month: months[new Date().getMonth()],
			year: year
		})
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				weeklyCalendar: currentStore.calendarReducer.weeklyCalendar,
				flexbox_size: currentStore.calendarReducer.flexbox_size,
				collection: currentStore.calendarReducer.collection,
				month: currentStore.calendarReducer.month,
				year: currentStore.calendarReducer.year
			})
		}.bind(this));
	},
	componentDidMount: function(){
		calendar(months[month], year, month+1, false);
	},
	createCalendar: function(){
		setTimeout(function(){
			var x = $('.month-year').text().trim().split(" ");
			var shootmonth = months.indexOf(x[0]) + 1;
			calendar(x[0], x[1], shootmonth, false);
		}, 50);
	},
	nextMonth: function(e){
		e.preventDefault();
		// $('.box').removeClass('highlight');
		console.log('Hit');
		if(e.target.id === "previous") {
			
			store.dispatch({
				type: 'GET_CALENDAR',
				month: ((this.state.month === 0) ? this.state.month + 11 : this.state.month - 1),
				year: ((this.state.month === 0) ? this.state.year - 1 : this.state.year)
			})
			this.createCalendar()
			
		} else {
			store.dispatch({
				type: 'GET_CALENDAR',
				year: ((this.state.month === 11) ? this.state.year + 1 : this.state.year),
				month: ((this.state.month === 11) ? this.state.month = 0 : this.state.month + 1)
			})
			this.createCalendar();
		}
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
				<div className="publish">
					<button>Publish</button>
				</div>
				<div className="adminCal">

						<div className="adminCalHeader">
							<div className="previous" id="previous" onClick={this.nextMonth}>&lang;</div>
							<div className="month-year">{months[this.state.month]} {this.state.year}</div>
							<div className="next" id="next" onClick={this.nextMonth}>&rang;</div>
						</div>

						<div className="adminCalDays">
							<div>SUN</div>
							<div>MON</div>
							<div>TUE</div>
							<div>WED</div>
							<div>THUR</div>
							<div>FRI</div>
							<div>SAT</div>
						</div>

						<div className="adminCalDate">
							{this.state.collection.map(function(item, i){
								return (
									<div key ={i} className={"adminCalBox " + item.currentClass} id={"box" + i}>
										<p>{item.day}</p>
									</div>
								)
							}.bind(this))} 	
								
						</div>
							
				</div>
			</div>
		)
	}
})