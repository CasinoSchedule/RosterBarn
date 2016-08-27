import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';
import { createMonthlyCalendar } from 'api/data';
import CalendarTitleBar from 'ui/calendarTitleBar';
import DaysOfWeekHeader from 'ui/daysOfWeekHeader';


require("assets/styles/sidePanel.scss");
require('font-awesome-webpack');

export default React.createClass({
	getInitialState: function(){
		return {
			monthlyCalendar: []
		}
	},
	componentWillMount: function(){
		this.unsubscribe = store.subscribe(function(){
			var currentStore = store.getState();
			this.setState({
				monthlyCalendar: currentStore.calendarReducer.monthlyCalendar
			})
		}.bind(this));
		
		createMonthlyCalendar(new Date());
	},
	shiftFilter: function(e){
		var val = e.target.id[1];
		var type = e.target.innerHTML;
		console.log('filter', val, type);
		this.props.filterByShift(val, type);
	},
	changeColor: function(e){
		var val = e.target.id;
		console.log(val);
		this.props.setColor(val);
	},
	render: function(){
		return (
			<div className="sidePortal">

				
				<div className="sidePortalFlex">
				
				
				<div className="portalOptions">

			
					<details>
						<summary className="locations"><i className="fa fa-calendar" aria-hidden="true"></i>Calendar</summary>

						<div className="adminCal">

						<CalendarTitleBar 
								previousMonth={this.props.previousMonth}
								nextMonth={this.props.nextMonth} 
								currentDate={this.props.currentDate} />

						<DaysOfWeekHeader />


						<div className="adminCalDate">
							{this.state.monthlyCalendar.map(function(item, i){
								return (
									<div key ={i} className={"adminCalBox " + item.currentClass} id={"box" + i} onClick={this.scheduleJump.bind(this, item)}>
										<p>{item.day}</p>
									</div>
								)
							}.bind(this))} 	
								
						</div>
							
				</div>
					</details>

					

					<details>
						<summary className="locations"><i className="fa fa-tint" aria-hidden="true"></i>Color Code</summary>
							<div className="colorBox">
								<div className="colors" id="station" onClick={this.changeColor}>By Area</div>
								<div className="colors" id="positionClass" onClick={this.changeColor}>By Position</div>
								<div className="colors" id="starting_time" onClick={this.changeColor}>By Start-Time</div>
							</div>
					</details>

					<details>
						<summary className="locations"><i className="fa fa-clock-o" aria-hidden="true"></i>Shifts</summary>
							<div className="shiftBox">
								<div className="shifts" id="a1" onClick={this.shiftFilter}>grave</div>
								<div className="shifts" id="a2" onClick={this.shiftFilter}>day</div>
								<div className="shifts" id="a3" onClick={this.shiftFilter}>swing</div>
								<div className="shifts" id="a" onClick={this.shiftFilter}>all</div>
							</div>
					</details>
				</div>
				
				
				</div>
				
				
				<div className={this.state.publishButton} onClick={this.publish}>
					<button>Publish & Notify</button>
				</div> 
			</div>
		)
	}
})