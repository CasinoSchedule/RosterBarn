import React from 'react';
import store from 'store';
import { Link, browserHistory } from 'react-router';
import { createMonthlyCalendar } from 'api/data';
import CalendarTitleBar from 'ui/calendarTitleBar';
import DaysOfWeekHeader from 'ui/daysOfWeekHeader';
import PublishButton from 'ui/publishButton'

require("assets/styles/sidePanel.scss");
require('font-awesome-webpack');

export default React.createClass({
	getInitialState: function(){
		return {
			currentDate: new Date(),
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
	scheduleJump: function(date){
		console.log('arguments', date);
		this.props.dateChangefromCalendar(new Date(date.year, date.month, date.day));
	},
	nextMonth: function(days){
		var newDate = this.state.currentDate.addDays(days);
		this.setState({
			currentDate: newDate
		})
		createMonthlyCalendar(newDate);
		// console.log(this.state.currentDate.addDays(days))
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
								previousMonth={this.nextMonth}
								nextMonth={this.nextMonth} 
								currentDate={this.state.currentDate}
								calendarHeader={'adminCalendarHeader'} />

							<DaysOfWeekHeader 
								weekdays={'adminWeekdays'}/>


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
				
				
				<PublishButton 
					publishButton={this.props.publishButton}
					publish={this.props.publish} />
			</div>
		)
	}
})